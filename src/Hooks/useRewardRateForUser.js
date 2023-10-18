import { useContractRead } from "./useContractRead";
import { formatEther } from "viem";

export const useRewardRateForUser = (
  inputValue,
  userStakedBalanceOfStarRunner
) => {
  const inputValueFormatted = Number(inputValue);

  const userStakedBalanceOfStarRunnerFormatted = Number(
    formatEther(userStakedBalanceOfStarRunner)
  );

  const SECONDS_IN_A_WEEK = 7 * 24 * 60 * 60;
  const { data: periodFinish } = useContractRead({
    functionName: "periodFinish",
  });
  const periodFinishFormatted = Number(periodFinish);

  const { data: rewardRate } = useContractRead({ functionName: "rewardRate" });
  const rewardRateFormatted = Number(formatEther(rewardRate));

  const { data: totalSupply } = useContractRead({
    functionName: "totalSupply",
  });
  const totalSupplyFormatted = Number(formatEther(totalSupply));

  // Calculate total available rewards
  const currentTimestamp = Math.floor(Date.now() / 1000);
  const remaining = periodFinishFormatted - currentTimestamp;
  const weeksRemaining = Math.ceil(remaining / SECONDS_IN_A_WEEK);
  const totalAvailableRewards = remaining * rewardRateFormatted;

  // Calculate reward rate using the formula
  const rewardRateForUser =
    (userStakedBalanceOfStarRunnerFormatted * totalAvailableRewards) /
      totalSupplyFormatted +
    inputValueFormatted;

  // Calculate reward rate per week
  const rewardRateForUserPerWeek = Math.floor(
    rewardRateForUser / weeksRemaining
  ).toFixed(0);

  const result = rewardRateForUserPerWeek;

  return result;
};
