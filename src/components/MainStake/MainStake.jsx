import { useState } from "react";
import { useWaitForTransaction, useContractWrite } from "wagmi";
import { parseEther } from "viem";
import { useRewardRateForUser } from "../../Hooks";

import {
  CONTRACT,
  CONTRACT_ABI,
  TOKEN,
  TOKEN_ABI,
} from "../../constants/constants";
import { MainTitle } from "../MainTitle/MainTitle";
import { MainContainer } from "../MainContainer/MainContainer";
import { MainForm } from "../MainForm/MainForm";
import { sanitizeInputValue } from "../../utils/utils";
import { Toast } from "../Toast/Toast";

function MainStake() {
  const [inputValue, setInputValue] = useState("");
  const [toastType, setToastType] = useState("");
  const [toastValue, setToastValue] = useState(0);
  const amountToApprove = parseEther(inputValue.toString());
  const { userRewardRate, balanceToDisplay, userBalanceOfStarRunner } =
    useRewardRateForUser(inputValue);
  console.log(
    `userRewardRate: ${userRewardRate}, balanceToDisplay: ${balanceToDisplay}, userBalanceOfStarRunner: ${userBalanceOfStarRunner}`
  );

  const {
    data: approveData,
    isLoading: approveIsLoading,
    write: approveWrite,
  } = useContractWrite({
    address: TOKEN,
    abi: TOKEN_ABI,
    functionName: "approve",
    token: true,
    onError() {
      setToastType("error");
      setInputValue("");
    },
  });

  const { isLoading: waitForApproveIsLoading } = useWaitForTransaction({
    hash: approveData?.hash,
    onSettled() {
      stakeWrite({ args: [amountToApprove] });
    },
    onError() {
      setToastType("error");
      setInputValue("");
    },
  });

  const {
    data: stakeData,
    isSuccess: stakeIsSuccess,
    isLoading: stakeIsLoading,
    write: stakeWrite,
  } = useContractWrite({
    address: CONTRACT,
    abi: CONTRACT_ABI,
    functionName: "stake",
    onError() {
      setToastType("error");
      setInputValue("");
    },
  });

  const { isLoading: waitForStakeIsLoading } = useWaitForTransaction({
    hash: stakeData?.hash,
    onSettled() {
      setToastType("success");
      setInputValue("");
    },
    onError() {
      setToastType("error");
      setInputValue("");
    },
  });

  const handleChange = (e) => {
    const sanitizedValue = sanitizeInputValue(e.target.value);
    setInputValue(sanitizedValue);
  };

  const handleSubmit = () => {
    if (inputValue === "") return;
    if (Number(inputValue) > Number(balanceToDisplay))
      setToastValue(inputValue);
    setToastType("pending");
    approveWrite({
      args: [CONTRACT, amountToApprove],
    });
  };

  const isAnyLoading =
    approveIsLoading ||
    stakeIsLoading ||
    waitForApproveIsLoading ||
    waitForStakeIsLoading;

  return (
    <MainContainer>
      <MainTitle
        pageName='Stake'
        rewardRate={userRewardRate ? userRewardRate : 0}
      />
      <MainForm
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        inputValue={inputValue}
        isAnyLoading={isAnyLoading}
        balanceToDisplay={
          balanceToDisplay && userBalanceOfStarRunner ? balanceToDisplay : "0"
        }
        buttonText={"Stake"}
      />
      <Toast
        toastType={toastType}
        value={toastValue}
        pageName='stake'
      />
    </MainContainer>
  );
}

export default MainStake;
