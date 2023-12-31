import { formatEther } from "viem";

// Round to decimal places
export function roundToDecimalPlaces(formatted, decimalPlaces) {
  if (!formatted || !decimalPlaces) return;
  const factor = Math.pow(10, decimalPlaces);
  return Math.floor(parseFloat(formatted) * factor) / factor;
}

// Calculate APR
export function calculateAPR(getRewardForDuration, totalSupply) {
  if (!getRewardForDuration || !totalSupply) return;
  const formattedRewardForPeriod = formatEther(getRewardForDuration);
  const formattedTotalSupply = formatEther(totalSupply);
  const aprValue = (formattedRewardForPeriod / formattedTotalSupply) * 100;
  const result = aprValue.toFixed(0);
  return result;
}

// Calculate days remaining
export function calculateDaysRemaining(periodFinish) {
  if (!periodFinish) return;
  const currentTimestamp = Math.ceil(Date.now() / 1000);
  const secondsRemaining = Number(periodFinish) - currentTimestamp;
  const result = Math.ceil(secondsRemaining / (60 * 60 * 24));
  return result;
}

// Sanitize input value
export const sanitizeInputValue = (value) => {
  // Ensure the input is a string
  const stringValue = String(value);

  // Remove any non-numeric characters except the decimal point
  const sanitizedValue = stringValue.replace(/[^\d.]/g, "");

  // Limit the number of characters after the decimal point to 18
  const decimalIndex = sanitizedValue.indexOf(".");
  if (decimalIndex !== -1) {
    const integerPart = sanitizedValue.slice(0, decimalIndex);
    const decimalPart = sanitizedValue.slice(
      decimalIndex + 1,
      decimalIndex + 19
    ); // Allow only 18 characters after "."
    return `${integerPart}.${decimalPart}`;
  }

  // Limit the sanitized value to 21 characters
  const limitedValue = sanitizedValue.slice(0, 21);

  return limitedValue;
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
  const rewardRateForUserPerWeek = rewardRateForUser / weeksRemaining;

  return rewardRateForUserPerWeek;
};

// Sanitize to display
export const sanitizeToDisplay = (value) => {
  const formattedValue = formatEther(value);
  const number = parseFloat(formattedValue);
  const truncatedNumber = Math.floor(number * 10000) / 10000;
  return truncatedNumber.toFixed(4);
};
