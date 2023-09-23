import { formatEther } from "viem";

export function roundToDecimalPlaces(formatted, decimalPlaces) {
  return parseFloat(formatted).toFixed(decimalPlaces);
}

// Calculate APR
export function calculateAPR(getRewardForDuration, totalSupply) {
  const formattedRewardForPeriod = formatEther(getRewardForDuration);
  const formattedTotalSupply = formatEther(totalSupply);
  const aprValue = (formattedRewardForPeriod / formattedTotalSupply) * 100;
  const result = aprValue.toFixed(0);
  return result;
}

// Calculate days remaining
export function calculateDaysRemaining(periodFinish) {
  const currentTimestamp = Math.ceil(Date.now() / 1000);
  const secondsRemaining = Number(periodFinish) - currentTimestamp;
  const result = Math.ceil(secondsRemaining / (60 * 60 * 24));
  return result;
}

//Sanitize input value
export const sanitizeInputValue = (value) => {
  // Remove leading zeros
  value = value.replace(/^0+/, "");

  // Remove any negative signs
  value = value.replace("-", "");

  // Remove any decimal points
  value = value.split(".")[0];

  // Convert the string to a number for range checks
  let numValue = Number(value);

  // Ensure the value is within the range [0]
  if (numValue < 0) numValue = 0;

  return String(numValue);
};

export const calculateRewardRateForUser = (
  inputValue,
  userStakedBalanceOfStarRunner,
  periodFinish,
  rewardRate,
  totalSupply
) => {
  const SECONDS_IN_A_WEEK = 7 * 24 * 60 * 60;

  // Convert input values to numbers
  const inputValueFormatted = Number(inputValue);
  const userStakedBalanceOfStarRunnerFormatted = Number(
    formatEther(userStakedBalanceOfStarRunner)
  );
  const periodFinishFormatted = Number(periodFinish);
  const rewardRateFormatted = Number(formatEther(rewardRate));
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

  // Calculate reward rate per week and format as an integer
  const rewardRateForUserPerWeek = Math.floor(
    rewardRateForUser / weeksRemaining
  );

  return rewardRateForUserPerWeek;
};
