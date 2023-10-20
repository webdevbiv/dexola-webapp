import { useEffect, useState } from "react";
import { useAccount, useContractRead } from "wagmi";
import { calculateAPR, calculateDaysRemaining } from "../utils/utils";
import { CONTRACT, CONTRACT_ABI } from "../constants/constants";

export const useStakingStatsData = () => {
  const { data: userWalletAddress, isConnected } = useAccount();
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
