import { formatUnits } from "viem";

export function roundToDecimalPlaces(formatted, decimalPlaces) {
  return parseFloat(formatted).toFixed(decimalPlaces);
}

export function calculateAPR(rewardForPeriod, totalSupply) {
  // Format values
  const formattedRewardForPeriod = formatUnits(rewardForPeriod);
  const formattedTotalSupply = formatUnits(totalSupply);
  // Calculate APR
  const aprValue = (formattedRewardForPeriod / formattedTotalSupply) * 100;
  const result = aprValue.toFixed(0);
  return result;
}

export function calculateDaysRemaining(periodFinish) {
  const currentTimestamp = Math.ceil(Date.now() / 1000);
  const secondsRemaining = Number(periodFinish) - currentTimestamp;
  const result = Math.ceil(secondsRemaining / (60 * 60 * 24));
  return result;
}
