import { useState } from "react";
import { useAccount, useContractRead } from "wagmi";
import { CONTRACT, CONTRACT_ABI } from "../constants/constants";
import { formatEther } from "viem";

export const useWithdrawUserData = () => {
  const { address: userWalletAddress } = useAccount();
  const [balanceToDisplay, setBalanceToDisplay] = useState(0);
  const [userRewards, setUserRewards] = useState(0);

  useContractRead({
    address: CONTRACT,
    abi: CONTRACT_ABI,
    functionName: "balanceOf",
    args: [userWalletAddress],
    watch: true,
    onSuccess: (data) => {
      setBalanceToDisplay(formatEther(data));
    },
  });

  useContractRead({
    address: CONTRACT,
    abi: CONTRACT_ABI,
    functionName: "earned",
    args: [userWalletAddress],
    watch: true,
    onSuccess: (data) => {
      if (data) setUserRewards(Number(formatEther(data)).toFixed(2));
    },
  });

  return { balanceToDisplay, userRewards };
};
