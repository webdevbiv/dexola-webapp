import { useEffect, useState } from "react";
import { useAccount, useBalance } from "wagmi";
import { TOKEN } from "../constants/constants";
import { calculateRewardRateForUser } from "../utils/utils";
import { useContractRead } from "./useContractRead";

/**
 * Calculates the reward rate for a user.
 *
 * @param inputValue - The input value.
 * @return An object containing the user reward rate, balance to display, and user balance of Star Runner.
 */

export const useRewardRateForUser = (inputValue) => {
  const [userRewardRate, setUserRewardRate] = useState(0);
  const [balanceToDisplay, setBalanceToDisplay] = useState(0);

  const { address: userWalletAddress } = useAccount();

  const { data: userBalanceOfStarRunner } = useBalance({
    address: userWalletAddress,
    token: TOKEN,
    watch: true,
    onSuccess: (data) => {
      if (data) setBalanceToDisplay(data?.formatted);
    },
  });

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

  useEffect(() => {
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

  return {
    userRewardRate,
    balanceToDisplay,
    userBalanceOfStarRunner,
  };
};
