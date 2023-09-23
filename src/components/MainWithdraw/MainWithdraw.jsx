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
// import { CONTRACT_ABI, TOKEN_ABI } from "../../constants/constants";

// console.log(CONTRACT_ABI, TOKEN_ABI);

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

  const handleChange = (e) => {
    const sanitizedValue = sanitizeInputValue(e.target.value);
    setInputValue(sanitizedValue);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputValue, balanceToDisplay);
    if (Number(inputValue) > Number(balanceToDisplay)) {
      console.log("Insufficient balance");
      return;
    }
    console.log("withdraw");
    withdrawWrite({
      args: [amountToWithdraw],
    });
  };

  const isAnyLoading = withdrawIsLoading || waitForWithdrawIsLoading;
  return (
    <MainContainer>
      <MainTitle pageName='Withdraw' />
      <MainForm
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        inputValue={inputValue}
        isAnyLoading={isAnyLoading}
        balanceToDisplay={balanceToDisplay ? balanceToDisplay : "0"}
        buttonText={"Withdraw"}
      />
    </MainContainer>
  );
};
