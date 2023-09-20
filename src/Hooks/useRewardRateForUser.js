import { useContractRead } from "./useContractRead";

export const useRewardRateForUser = (userBalanceOfStarRunner) => {
  const struStakedBalance = userBalanceOfStarRunner;
  const SECONDS_IN_A_WEEK = 7 * 24 * 60 * 60;
  const { data: periodFinish } = useContractRead({
    functionName: "periodFinish",
  });
  const { data: rewardRate } = useContractRead({ functionName: "rewardRate" });
  const { data: totalSupply } = useContractRead({
    functionName: "totalSupply",
  });

  // Calculate total available rewards
  const currentTimestamp = Math.floor(Date.now() / 1000);
  const remaining = Number(periodFinish) - currentTimestamp;
  const weeksRemaining = Math.ceil(remaining / SECONDS_IN_A_WEEK);
  const totalAvailableRewards = remaining * Number(rewardRate);

  // Calculate reward rate using the formula
  const rewardRateForUser =
    (Number(struStakedBalance) * totalAvailableRewards) / Number(totalSupply) +
    Number(struStakedBalance);
  const rewardRateForUserPerWeek = rewardRateForUser / weeksRemaining;

  const result = rewardRateForUserPerWeek.toFixed(0);

  return result;
};
