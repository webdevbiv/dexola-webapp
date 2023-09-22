import { useContractRead } from "./useContractRead";
import { formatEther } from "viem";

export const useUserStakedBalance = (userWalletAddress) => {
  const { data: userStakedBalance } = useContractRead({
    functionName: "balanceOf",
    watch: true,
    args: [userWalletAddress],
  });

  const result = formatEther(userStakedBalance);

  return result;
};
