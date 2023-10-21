import {
  useWaitForTransaction,
  useContractWrite,
  useContractRead,
  useAccount,
} from "wagmi";
import {
  CONTRACT,
  CONTRACT_ABI,
  TOKEN,
  TOKEN_ABI,
} from "../constants/constants";
import { useState } from "react";

/**
 * A custom hook to handle the approval and staking process in a smart contract.
 *
 * @param {number} amountToApprove - The amount to be approved for staking.
 * @return {object} - Returns an object containing functions and states for managing the approval and staking process.
 */

export const useApproveAndStake = (amountToApprove) => {
  const { address: userWalletAddress, isConnected } = useAccount();
  const [toastType, setToastType] = useState("");

  // Fetching the current allowance for the user to interact with the contract.
  const { data: currentAllowance } = useContractRead({
    address: TOKEN,
    abi: TOKEN_ABI,
    functionName: "allowance",
    args: [userWalletAddress, CONTRACT],
    watch: isConnected,
    enabled: isConnected,
  });

  // Hook to call the 'approve' function on the TOKEN contract, to set allowance.
  const {
    data: approveData,
    isLoading: approveIsLoading,
    writeAsync: approveWrite,
  } = useContractWrite({
    address: TOKEN,
    abi: TOKEN_ABI,
    functionName: "approve",
    token: true,
    onError() {
      setToastType("error");
    },
  });

  // Hook to wait for the approval transaction to be confirmed, then proceed to staking.
  const { isLoading: waitForApproveIsLoading } = useWaitForTransaction({
    hash: approveData?.hash,
    onSettled() {
      stakeWrite({ args: [amountToApprove] });
    },
    onError() {
      setToastType("error");
    },
  });

  // Hook to call the 'stake' function on the CONTRACT.
  const {
    data: stakeData,
    isSuccess: stakeIsSuccess,
    isLoading: stakeIsLoading,
    writeAsync: stakeWrite,
  } = useContractWrite({
    address: CONTRACT,
    abi: CONTRACT_ABI,
    functionName: "stake",
    onError() {
      setToastType("error");
    },
  });

  // Hook to wait for the stake transaction to be confirmed.
  const { isLoading: waitForStakeIsLoading } = useWaitForTransaction({
    hash: stakeData?.hash,
    onSettled() {
      setToastType("success");
    },
    onError() {
      setToastType("error");
    },
  });

  const handleWrite = () => {
    setToastType("pending"); // Set the toast type to "pending" as the transaction process begins.

    // Check if there's an existing allowance and if the amount to approve is within that allowance.
    if (currentAllowance !== null && amountToApprove <= currentAllowance) {
      stakeWrite({ args: [amountToApprove] }); // If so, proceed directly to staking.
    } else {
      approveWrite({
        // If not, initiate an approval transaction first.
        args: [CONTRACT, amountToApprove],
      });
    }
  };

  const isAnyLoading =
    approveIsLoading ||
    stakeIsLoading ||
    waitForApproveIsLoading ||
    waitForStakeIsLoading;

  return {
    approveWrite,
    toastType,
    stakeIsLoading,
    stakeIsSuccess,
    isAnyLoading,
    handleWrite,
  };
};
