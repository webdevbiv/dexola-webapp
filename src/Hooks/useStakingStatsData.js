import { useEffect, useState } from "react";
import { useAccount, useContractRead } from "wagmi";
import { calculateAPR, calculateDaysRemaining } from "../utils/utils";
import { CONTRACT, CONTRACT_ABI } from "../constants/constants";

/**
 * Returns an object containing staking statistics data.
 *
 * @return {Object} An object with the following properties:
 *   - userStakedBalanceOfStarRunner: The staked balance of the user's Star Runner
 *   - APR: The Annual Percentage Rate for staking rewards
 *   - daysRemaining: The number of days remaining for the staking period
 *   - userRewards: The amount of rewards earned by the user
 */

export const useStakingStatsData = () => {
  const { address: userWalletAddress, isConnected } = useAccount();
  const [APR, setAPR] = useState(null);
  const [daysRemaining, setDaysRemaining] = useState(null);

  const { data: userStakedBalanceOfStarRunner } = useContractRead({
    address: CONTRACT,
    abi: CONTRACT_ABI,
    functionName: "balanceOf",
    args: [userWalletAddress],
    watch: isConnected,
    enabled: isConnected,
  });

  const { data: userRewards } = useContractRead({
    address: CONTRACT,
    abi: CONTRACT_ABI,
    functionName: "earned",
    args: [userWalletAddress],
    watch: isConnected,
    enabled: isConnected,
  });

  const { data: totalSupply } = useContractRead({
    address: CONTRACT,
    abi: CONTRACT_ABI,
    functionName: "totalSupply",
    watch: true,
  });

  const { data: getRewardForDuration } = useContractRead({
    address: CONTRACT,
    abi: CONTRACT_ABI,
    functionName: "getRewardForDuration",
    watch: true,
  });

  const { data: periodFinish } = useContractRead({
    address: CONTRACT,
    abi: CONTRACT_ABI,
    functionName: "periodFinish",
    watch: true,
  });

  useEffect(() => {
    if (periodFinish) {
      setDaysRemaining(calculateDaysRemaining(periodFinish));
    }

    if (getRewardForDuration && totalSupply) {
      setAPR(calculateAPR(getRewardForDuration, totalSupply));
    }
  }, [getRewardForDuration, totalSupply, periodFinish]);

  return {
    userStakedBalanceOfStarRunner,
    APR,
    daysRemaining,
    userRewards,
  };
};
