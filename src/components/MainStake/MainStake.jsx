import { useEffect, useState } from "react";
import {
  useAccount,
  useBalance,
  useWaitForTransaction,
  useContractWrite,
} from "wagmi";
import { parseEther } from "viem";
import { useContractRead } from "../../Hooks";

import {
  CONTRACT,
  CONTRACT_ABI,
  TOKEN,
  TOKEN_ABI,
} from "../../constants/constants";
import { MainTitle } from "../MainTitle/MainTitle";
import { MainContainer } from "../MainContainer/MainContainer";
import { MainForm } from "../MainForm/MainForm";
import {
  sanitizeInputValue,
  calculateRewardRateForUser,
  roundToDecimalPlaces,
} from "../../utils/utils";
import { Toast } from "../Toast/Toast";

export const MainStake = () => {
  const [inputValue, setInputValue] = useState("");
  const [userRewardRate, setUserRewardRate] = useState(0);
  const [balanceToDisplay, setBalanceToDisplay] = useState(0);
  const [toastType, setToastType] = useState("");
  const [toastValue, setToastValue] = useState(0);

  const { address: userWalletAddress } = useAccount();

  const { data: userBalanceOfStarRunner } = useBalance({
    address: userWalletAddress,
    token: TOKEN,
    watch: true,
    onSuccess: (data) => {
      if (data)
        setBalanceToDisplay(
          Math.floor(roundToDecimalPlaces(data?.formatted, 2))
        );
    },
  });

  const amountToApprove = parseEther(inputValue.toString());

  const {
    data: userStakedBalanceOfStarRunner,
    isSuccess: userStakedBalanceOfStarRunnerIsSuccess,
  } = useContractRead({
    functionName: "balanceOf",
    args: [userWalletAddress],
    watch: true,
  });

  const { data: periodFinish } = useContractRead({
    functionName: "periodFinish",
  });

  const { data: rewardRate, isSuccess: rewardRateIsSuccess } = useContractRead({
    functionName: "rewardRate",
  });

  const { data: totalSupply } = useContractRead({
    functionName: "totalSupply",
  });

  const {
    data: approveData,
    isLoading: approveIsLoading,
    isSuccess: approveIsSuccess,
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

  const {
    data: waitForApprove,
    isError: waitForApproveIsError,
    isLoading: waitForApproveIsLoading,
  } = useWaitForTransaction({
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
    isLoading: stakeIsLoading,
    isSuccess: stakeIsSuccess,
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

  const {
    data: waitForStake,
    isError: waitForStakeIsError,
    isLoading: waitForStakeIsLoading,
  } = useWaitForTransaction({
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

  useEffect(() => {
    console.log(Boolean(rewardRate));
    if (!userStakedBalanceOfStarRunnerIsSuccess || !rewardRateIsSuccess) return;
    setUserRewardRate(
      calculateRewardRateForUser(
        inputValue,
        userStakedBalanceOfStarRunner,
        periodFinish,
        rewardRate,
        totalSupply
      )
    );
  }, [
    inputValue,
    userStakedBalanceOfStarRunner,
    periodFinish,
    rewardRate,
    totalSupply,
    userStakedBalanceOfStarRunnerIsSuccess,
    rewardRateIsSuccess,
  ]);

  const handleChange = (e) => {
    const sanitizedValue = sanitizeInputValue(e.target.value);
    setInputValue(sanitizedValue);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue === "") return console.log("Please enter a value");
    if (Number(inputValue) > Number(balanceToDisplay))
      return console.log("Insufficient balance");
    setToastValue(inputValue);
    setToastType("pending");
    approveWrite({
      args: [CONTRACT, amountToApprove],
    });
  };

  // const isAnyLoading =
  //   approveIsLoading ||
  //   stakeIsLoading ||
  //   waitForApproveIsLoading ||
  //   waitForStakeIsLoading;
  console.log(inputValue);
  return (
    <MainContainer>
      <MainTitle
        pageName='Stake'
        rewardRate={userRewardRate !== undefined ? userRewardRate : "0"}
      />
      <MainForm
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        inputValue={inputValue}
        // isAnyLoading={isAnyLoading}
        balanceToDisplay={
          balanceToDisplay && userBalanceOfStarRunner
            ? balanceToDisplay
            : "0.00"
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
};
