import { useContractRead } from "./useContractRead";
import { formatEther } from "viem";

export const useRewardRateForUser = (
  inputValue,
  userStakedBalanceOfStarRunner
) => {
  const inputValueFormatted = Number(inputValue);
  // console.log(`inputValueFormatted`, inputValueFormatted);

  const userStakedBalanceOfStarRunnerFormatted = Number(
    formatEther(userStakedBalanceOfStarRunner)
  );

  // console.log(
  //   `userStakedBalanceOfStarRunnerFormatted`,
  //   userStakedBalanceOfStarRunnerFormatted
  // );
  const SECONDS_IN_A_WEEK = 7 * 24 * 60 * 60;
  const { data: periodFinish } = useContractRead({
    functionName: "periodFinish",
  });
  const periodFinishFormatted = Number(periodFinish);
  // console.log(`periodFinishFormatted`, periodFinishFormatted);

  const { data: rewardRate } = useContractRead({ functionName: "rewardRate" });
  const rewardRateFormatted = Number(formatEther(rewardRate));
  // console.log(`rewardRateFormatted`, rewardRateFormatted);

  const { data: totalSupply } = useContractRead({
    functionName: "totalSupply",
  });
  const totalSupplyFormatted = Number(formatEther(totalSupply));
  // console.log(`totalSupplyFormatted`, totalSupplyFormatted);

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

  // console.log(`rewardRateForUser`, rewardRateForUser);

  // Calculate reward rate per week
  const rewardRateForUserPerWeek = Math.floor(
    rewardRateForUser / weeksRemaining
  ).toFixed(0);

  const result = rewardRateForUserPerWeek;

  return result;
};
