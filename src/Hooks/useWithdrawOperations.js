import { useContractWrite, useWaitForTransaction } from "wagmi";
import { CONTRACT, CONTRACT_ABI } from "../constants/constants";

export const useWithdrawOperations = ({
  amountToWithdraw,
  setInputValue,
  setToastType,
}) => {
  const {
    data: withdrawData,
    isLoading: withdrawIsLoading,
    write: withdrawWrite,
  } = useContractWrite({
    address: CONTRACT,
    abi: CONTRACT_ABI,
    functionName: "withdraw",
    onError() {
      setToastType("error");
      setInputValue("");
    },
  });

  const { isLoading: waitForWithdrawIsLoading } = useWaitForTransaction({
    hash: withdrawData?.hash,
    onSettled() {
      setToastType("success");
      setInputValue("");
    },
    onError() {
      setToastType("error");
      setInputValue("");
    },
  });

  const handleWithdraw = () => {
    setToastType("pending");
    withdrawWrite({
      args: [amountToWithdraw],
    });
  };

  // Withdraw All & Claim Rewards
  const {
    data: withdrawAllClaimRewardsData,
    write: withdrawAllClaimRewardsWrite,
  } = useContractWrite({
    address: CONTRACT,
    abi: CONTRACT_ABI,
    functionName: "exit",
    onError() {
      setToastType("error");
      setInputValue("");
    },
  });

  const { isLoading: waitForWithdrawAllClaimRewardsIsLoading } =
    useWaitForTransaction({
      hash: withdrawAllClaimRewardsData?.hash,
      onSettled() {
        setToastType("success");
        setInputValue("");
      },
    });

  const handleWithdrawAll = () => {
    setToastType("pending");
    withdrawAllClaimRewardsWrite();
  };

  const isAnyLoading =
    withdrawIsLoading ||
    waitForWithdrawIsLoading ||
    waitForWithdrawAllClaimRewardsIsLoading;

  return {
    isAnyLoading,
    handleWithdrawAll,
    handleWithdraw,
  };
};
