import { useEffect, useState } from "react";
import { useContractRead } from "wagmi";
import { calculateAPR, calculateDaysRemaining } from "../utils/utils";
import { CONTRACT, CONTRACT_ABI } from "../constants/constants";
import { useUserWalletStatus } from "./useUserWalletStatus";

export const useStakingStatsData = () => {
  const { userWalletAddress, userWalletIsConnected } = useUserWalletStatus();
  const [APR, setAPR] = useState(null);
  const [daysRemaining, setDaysRemaining] = useState(null);

  const { data: userStakedBalanceOfStarRunner } = useContractRead({
    address: CONTRACT,
    abi: CONTRACT_ABI,
    functionName: "balanceOf",
    args: [userWalletAddress],
    watch: userWalletIsConnected,
    enabled: userWalletIsConnected,
  });

  const { data: userRewards } = useContractRead({
    address: CONTRACT,
    abi: CONTRACT_ABI,
    functionName: "earned",
    args: [userWalletAddress],
    watch: userWalletIsConnected,
    enabled: userWalletIsConnected,
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
