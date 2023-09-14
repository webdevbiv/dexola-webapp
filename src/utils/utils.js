export function roundToDecimalPlaces(formatted, decimalPlaces) {
  return parseFloat(formatted).toFixed(decimalPlaces);
}

export function calculateAPR(rewardForPeriod, totalSupply) {
  const aprValue = (rewardForPeriod / totalSupply) * BigInt(100);
  return Number(aprValue);
}

export function calculateDaysRemaining(periodFinish) {
  const currentTimestamp = Math.ceil(Date.now() / 1000); // Convert current time to seconds
  const secondsRemaining = Number(periodFinish) - currentTimestamp;
  return Math.ceil(secondsRemaining / (60 * 60 * 24)); // Convert seconds to days
}
