import { CONTRACT, CONTRACT_ABI } from "../constants/constants";
import { useContractRead } from "wagmi";

export const useTokenContractRead = (
  functionName,
  successMessage = false,
  errorMessage = false,
  watch = false
) => {
  const config = {
    address: CONTRACT,
    abi: CONTRACT_ABI,
    functionName,
    watch,
  };

  if (successMessage) {
    config.onSuccess = (data) => {
      console.log(`Success ${functionName}`, data);
    };
  }

  if (errorMessage) {
    config.onError = (error) => {
      console.log(`Error ${functionName}`, error);
    };
  }

  return useContractRead(config);
};
