import { useContractWrite, useWaitForTransaction } from "wagmi";
import { CONTRACT, CONTRACT_ABI } from "../constants/constants";

export const useClaimRewards = ({ setToastType, setBalanceToDisplay }) => {
  const {
    data: claimRewardsData,
    isLoading: claimRewardsIsLoading,
    write: claimRewardsWrite,
  } = useContractWrite({
    address: CONTRACT,
    abi: CONTRACT_ABI,
    functionName: "claimReward",
    onError() {
      setToastType("error");
    },
  });

  const { isLoading: waitClaimRewardsIsLoading } = useWaitForTransaction({
    hash: claimRewardsData?.hash,
    onSettled() {
      setToastType("success");
      setBalanceToDisplay("0.00");
    },
    onError() {
      setToastType("error");
    },
  });

  const handleClaimRewards = () => {
    claimRewardsWrite();
  };

  const isAnyLoading = claimRewardsIsLoading || waitClaimRewardsIsLoading;

  return {
    handleClaimRewards,
    isAnyLoading,
  };
};
