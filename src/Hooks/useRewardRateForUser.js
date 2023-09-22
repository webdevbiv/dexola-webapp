import { useContractRead } from "./useContractRead";
import { formatEther } from "viem";

export const useRewardRateForUser = (
  inputValue,
  userStakedBalanceOfStarRunner
) => {
  const SECONDS_IN_A_WEEK = 7 * 24 * 60 * 60;

  // Formatting input values
  const inputValueFormatted = Number(inputValue);
  const userStakedBalanceFormatted = Number(
    formatEther(userStakedBalanceOfStarRunner)
  );

  // Fetching contract data
  const { data: periodFinish } = useContractRead({
    functionName: "periodFinish",
  });
  const { data: rewardRate } = useContractRead({ functionName: "rewardRate" });
  const { data: totalSupply } = useContractRead({
    functionName: "totalSupply",
  });

  // Formatting contract data
  const periodFinishFormatted = Number(periodFinish);
  const rewardRateFormatted = Number(formatEther(rewardRate));
  const totalSupplyFormatted = Number(formatEther(totalSupply));

  // Calculations
  const currentTimestamp = Math.floor(Date.now() / 1000);
  const remainingSeconds = periodFinishFormatted - currentTimestamp;
  const weeksRemaining = Math.ceil(remainingSeconds / SECONDS_IN_A_WEEK);
  const totalAvailableRewards = remainingSeconds * rewardRateFormatted;

  const rewardRateForUser =
    (userStakedBalanceFormatted * totalAvailableRewards) /
      totalSupplyFormatted +
    inputValueFormatted;
  const rewardRateForUserPerWeek = Math.floor(
    rewardRateForUser / weeksRemaining
  ).toFixed(0);

  return rewardRateForUserPerWeek;
};
