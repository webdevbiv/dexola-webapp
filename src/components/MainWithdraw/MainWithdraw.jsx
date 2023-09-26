import { useState } from "react";
import { MainContainer } from "../MainContainer/MainContainer";
import { MainForm } from "../MainForm/MainForm";
import { MainTitle } from "../MainTitle/MainTitle";
import {
  useAccount,
  useBalance,
  useContractRead,
  useWaitForTransaction,
} from "wagmi";
import { useContractWrite } from "../../Hooks";
import { formatEther, parseEther } from "viem";
import { roundToDecimalPlaces, sanitizeInputValue } from "../../utils/utils";
import { CONTRACT, CONTRACT_ABI } from "../../constants/constants";

export const MainWithdraw = () => {
  const [inputValue, setInputValue] = useState("");
  const { address: userWalletAddress } = useAccount();
  const [balanceToDisplay, setBalanceToDisplay] = useState(0);
  const amountToWithdraw = parseEther(inputValue.toString());
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
    functionName: "withdraw",
  });

  const {
    data: waitForWithdraw,
    isError: waitForWithdrawIsError,
    isLoading: waitForWithdrawIsLoading,
  } = useWaitForTransaction({
    hash: withdrawData?.hash,
    onSettled(data, error) {
      console.log("Settled waitForWithdraw", { data, error });
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
    console.log("withdraw payment");
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
    </MainContainer>
  );
};
