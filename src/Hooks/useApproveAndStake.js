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

export const useApproveAndStake = ({
  amountToApprove,
  setInputValue,
  setToastType,
}) => {
  const { address: userWalletAddress, isConnected } = useAccount();

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
      setInputValue("");
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
      setInputValue("");
    },
  });

  // Hook to call the 'stake' function on the CONTRACT.
  const {
    data: stakeData,
    isLoading: stakeIsLoading,
    writeAsync: stakeWrite,
  } = useContractWrite({
    address: CONTRACT,
    abi: CONTRACT_ABI,
    functionName: "stake",
    onError() {
      setToastType("error");
      setInputValue("");
    },
  });

  // Hook to wait for the stake transaction to be confirmed.
  const { isLoading: waitForStakeIsLoading } = useWaitForTransaction({
    hash: stakeData?.hash,
    onSettled() {
      setToastType("success");
      setInputValue("");
    },
    onError() {
      setToastType("error");
      setInputValue("");
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
    isAnyLoading,
    handleWrite,
  };
};
