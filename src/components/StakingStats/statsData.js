import { formatEther } from "viem";
import { roundToDecimalPlaces } from "../../utils/utils";

const statsData = (
  userStakedBalanceOfStarRunner,
  APR,
  daysRemaining,
  userRewards,
  windowWidth,
  MEDIUM_WIDTH
) => [
  {
    value: userStakedBalanceOfStarRunner
      ? windowWidth < MEDIUM_WIDTH
        ? roundToDecimalPlaces(formatEther(userStakedBalanceOfStarRunner), 1)
        : roundToDecimalPlaces(formatEther(userStakedBalanceOfStarRunner), 4)
      : "0",
    label: "Staked balance",
    id: "stakedBalance",
    suffix: "stru",
    showInfoIcon: true,
    text: "Staking rewards get allocated on this sum",
  },
  {
    value: APR ? `≈${APR}%` : "≈0%",
    id: "apr",
    label: "APR",
    showInfoIcon: true,
    text: "Displays the average for APR. Interest rate is calculated for each amount of tokens.",
  },
  {
    value: daysRemaining && daysRemaining > 0 ? daysRemaining : "0",
    label: "Days",
  },
  {
    value: userRewards
      ? windowWidth < MEDIUM_WIDTH
        ? roundToDecimalPlaces(formatEther(userRewards), 1)
        : roundToDecimalPlaces(formatEther(userRewards), 4)
      : "0",
    label: "Rewards",
    id: "rewards",
    suffix: "stru",
    showInfoIcon: true,
    text: "Rewards get allocated every second",
  },
];

export default statsData;
