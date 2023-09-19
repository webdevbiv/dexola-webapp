import { useContractRead } from "./useContractRead";

export const useRewardRateForUser = (userBalanceOfStarRunner) => {
  const struStakedBalance = userBalanceOfStarRunner;
  const SECONDS_IN_A_WEEK = 7 * 24 * 60 * 60;
  const { data: periodFinish } = useContractRead("periodFinish");
  const { data: rewardRate } = useContractRead("rewardRate");
  const { data: totalSupply } = useContractRead("totalSupply");

  // Calculate total available rewards
  const currentTimestamp = Math.floor(Date.now() / 1000); // Current timestamp in seconds
  const remaining = Number(periodFinish) - currentTimestamp;
  const weeksRemaining = Math.floor(remaining / SECONDS_IN_A_WEEK);
  const totalAvailableRewards = remaining * Number(rewardRate);

  // Calculate reward rate using the formula
  const rewardRateForUser =
    (Number(struStakedBalance) * totalAvailableRewards) / Number(totalSupply) +
    Number(struStakedBalance);
  const rewardRateForUserPerWeek = rewardRateForUser / weeksRemaining;

  return rewardRateForUserPerWeek.toFixed(0);
};
