import { useWaitForTransaction } from "wagmi";
import { useContractWrite } from "./useContractWrite";

export const useApproveAndStake = (amountApprove) => {
  const {
    data: approveData,
    isLoading: approveIsLoading,
    isSuccess: approveIsSuccess,
    isError: approveIsError,
    write: approveWrite,
  } = useContractWrite({
    functionName: "approve",
    token: true,
  });

  const {
    data: stakeData,
    isLoading: stakeIsLoading,
    isSuccess: stakeIsSuccess,
    isError: stakeIsError,
    write: stakeWrite,
  } = useContractWrite({ functionName: "stake" });

  const {
    data: waitForApprove,
    isError: waitForApproveIsError,
    isLoading: waitForApproveIsLoading,
  } = useWaitForTransaction({
    hash: approveData?.hash,
    onSettled(data, error) {
      console.log("Settled waitForApprove", { data, error });
      stakeWrite({ args: [amountApprove] });
    },
  });

  const {
    data: waitForStake,
    isError: waitForStakeIsError,
    isLoading: waitForStakeIsLoading,
  } = useWaitForTransaction({
    hash: stakeData?.hash,
    onSettled(data, error) {
      console.log("Settled waitForStake", { data, error });
    },
  });

  return {
    approveWrite,
    approveIsLoading,
    approveIsSuccess,
    approveIsError,
    stakeIsLoading,
    stakeIsSuccess,
    stakeIsError,
    waitForApprove,
    waitForApproveIsError,
    waitForApproveIsLoading,
    waitForStake,
    waitForStakeIsError,
    waitForStakeIsLoading,
  };
};
