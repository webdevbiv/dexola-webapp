import { useState } from "react";
import { MainContainer } from "../MainContainer/MainContainer";
import { MainForm } from "../MainForm/MainForm";
import { MainTitle } from "../MainTitle/MainTitle";
import {
  useAccount,
  useContractRead,
  useWaitForTransaction,
  useContractWrite,
} from "wagmi";
import { formatEther, parseEther } from "viem";
import { roundToDecimalPlaces, sanitizeInputValue } from "../../utils/utils";
import { CONTRACT, CONTRACT_ABI } from "../../constants/constants";
import { Toast } from "../Toast/Toast";

export const MainWithdraw = () => {
  const [inputValue, setInputValue] = useState("");
  const [balanceToDisplay, setBalanceToDisplay] = useState(0);
  const [toastType, setToastType] = useState("");
  const [toastValue, setToastValue] = useState(0);
  const amountToWithdraw = parseEther(inputValue.toString());

  const { address: userWalletAddress } = useAccount();

  const { data: userStakedBalanceOfStarRunner } = useContractRead({
    address: CONTRACT,
    abi: CONTRACT_ABI,
    functionName: "balanceOf",
    args: [userWalletAddress],
    watch: true,
    onSuccess: (data) => {
      setBalanceToDisplay(formatEther(data));
    },
  });

  const {
    data: withdrawData,
    isLoading: withdrawIsLoading,
    isSuccess: withdrawIsSuccess,
    write: withdrawWrite,
  } = useContractWrite({
    address: CONTRACT,
    abi: CONTRACT_ABI,
    functionName: "withdraw",
    onError() {
      setToastType("error");
      setInputValue("");
    },
  });

  const {
    data: waitForWithdraw,
    isError: waitForWithdrawIsError,
    isLoading: waitForWithdrawIsLoading,
  } = useWaitForTransaction({
    hash: withdrawData?.hash,
    onSettled(data, error) {
      console.log("Settled waitForWithdraw", { data, error });
      setToastType("success");
      setInputValue("");
    },
    onError() {
      setToastType("error");
      setInputValue("");
    },
  });

  // Withdraw All & Claim Rewards
  const {
    data: withdrawAllClaimRewardsData,
    isLoading: withdrawAllClaimRewardsIsLoading,
    isSuccess: withdrawAllClaimRewardsIsSuccess,
    write: withdrawAllClaimRewardsWrite,
  } = useContractWrite({
    address: CONTRACT,
    abi: CONTRACT_ABI,
    functionName: "exit",
  });

  const {
    data: waitForWithdrawAllClaimRewards,
    isError: waitForWithdrawAllClaimRewardsIsError,
    isLoading: waitForWithdrawAllClaimRewardsIsLoading,
  } = useWaitForTransaction({
    hash: withdrawAllClaimRewardsData?.hash,
    onSettled(data, error) {
      console.log("Settled waitForWithdrawAllClaimRewards", { data, error });
      setInputValue("");
    },
  });

  // Handle Actions
  const handleChange = (e) => {
    const sanitizedValue = sanitizeInputValue(e.target.value);
    setInputValue(sanitizedValue);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (inputValue === "") return console.log("Please enter a value");
    if (Number(inputValue) > Number(balanceToDisplay)) {
      console.log("Insufficient balance");
      return;
    }
    setToastValue(inputValue);
    setToastType("pending");
    withdrawWrite({
      args: [amountToWithdraw],
    });
  };

  const handleWithdrawAllClaimRewardsClick = (e) => {
    e.preventDefault();
    console.log("withdrawAllClaimRewards");
    withdrawAllClaimRewardsWrite();
  };

  const isAnyLoading = withdrawIsLoading || waitForWithdrawIsLoading;
  return (
    <MainContainer>
      <MainTitle pageName='Withdraw' />
      <MainForm
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        onWithdrawAllClaimRewardsClick={handleWithdrawAllClaimRewardsClick}
        inputValue={inputValue}
        isAnyLoading={isAnyLoading}
        balanceToDisplay={
          balanceToDisplay && userStakedBalanceOfStarRunner
            ? balanceToDisplay
            : "0"
        }
        buttonText={"Withdraw"}
      />
      <Toast
        toastType={toastType}
        value={toastValue}
        pageName='withdraw'
      />
    </MainContainer>
  );
};
