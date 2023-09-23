import { useEffect, useState } from "react";
import { useAccount, useWaitForTransaction } from "wagmi";
import { parseEther } from "viem";
import {
  useUserBalanceOfStarRunner,
  useContractWrite,
  useContractRead,
} from "../../Hooks";

import { CONTRACT } from "../../constants/constants";
import { MainTitle } from "../MainTitle/MainTitle";
import { MainContainer } from "../MainContainer/MainContainer";
import { MainForm } from "../MainForm/MainForm";
import {
  sanitizeInputValue,
  calculateRewardRateForUser,
} from "../../utils/utils";

export const MainStake = () => {
  const [inputValue, setInputValue] = useState("");
  const [userRewardRate, setUserRewardRate] = useState(0);
  const { address: userWalletAddress } = useAccount();
  const balanceToDisplay = useUserBalanceOfStarRunner({
    userWalletAddress,
    formatted: true,
  });

  const amountToApprove = parseEther(inputValue.toString());

  const { data: userStakedBalanceOfStarRunner } = useContractRead({
    functionName: "balanceOf",
    args: [userWalletAddress],
    watch: true,
  });

  const { data: periodFinish } = useContractRead({
    functionName: "periodFinish",
  });

  const { data: rewardRate } = useContractRead({ functionName: "rewardRate" });

  const { data: totalSupply } = useContractRead({
    functionName: "totalSupply",
  });

  const {
    data: approveData,
    isLoading: approveIsLoading,
    isSuccess: approveIsSuccess,
    write: approveWrite,
  } = useContractWrite({
    functionName: "approve",
    token: true,
  });

  const {
    data: waitForApprove,
    isError: waitForApproveIsError,
    isLoading: waitForApproveIsLoading,
  } = useWaitForTransaction({
    hash: approveData?.hash,
    onSettled(data, error) {
      console.log("Settled waitForApprove", { data, error });
      stakeWrite({ args: [amountToApprove] });
    },
  });

  const {
    data: stakeData,
    isLoading: stakeIsLoading,
    isSuccess: stakeIsSuccess,
    write: stakeWrite,
  } = useContractWrite({ functionName: "stake" });

  const {
    data: waitForStake,
    isError: waitForStakeIsError,
    isLoading: waitForStakeIsLoading,
  } = useWaitForTransaction({
    hash: stakeData?.hash,
    onSettled(data, error) {
      console.log("Settled waitForStake", { data, error });
      setInputValue("");
    },
  });

  useEffect(() => {
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
    userRewardRate,
    inputValue,
    userStakedBalanceOfStarRunner,
    periodFinish,
    rewardRate,
    totalSupply,
  ]);

  const handleChange = (e) => {
    const sanitizedValue = sanitizeInputValue(e.target.value);
    setInputValue(sanitizedValue);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue > balanceToDisplay)
      return console.log("Insufficient balance");
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
        rewardRate={userRewardRate}
      />
      <MainForm
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        inputValue={inputValue}
        isAnyLoading={isAnyLoading}
        balanceToDisplay={balanceToDisplay}
        buttonText={"Stake"}
      />
    </MainContainer>
  );
};
