import { useState } from "react";
import { MainContainer } from "../MainContainer/MainContainer";
import { MainForm } from "../MainForm/MainForm";
import { MainTitle } from "../MainTitle/MainTitle";
import { useAccount, useWaitForTransaction } from "wagmi";
import { useContractWrite, useUserStakedBalance } from "../../Hooks";
import { parseEther } from "viem";
import { sanitizeInputValue } from "../../utils/utils";
// import { CONTRACT_ABI, TOKEN_ABI } from "../../constants/constants";

// console.log(CONTRACT_ABI, TOKEN_ABI);

export const MainWithdraw = () => {
  const [inputValue, setInputValue] = useState("");
  const { address: userWalletAddress } = useAccount();
  const amountToWithdraw = parseEther(inputValue.toString());
  const balanceToDisplay = useUserStakedBalance(userWalletAddress);

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
        balanceToDisplay={balanceToDisplay}
        buttonText={"Withdraw"}
      />
    </MainContainer>
  );
};
