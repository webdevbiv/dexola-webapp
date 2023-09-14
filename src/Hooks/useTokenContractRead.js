import { TOKEN_ABI, TOKEN_ADDRESS } from "../constants/constants";
import { useContractRead } from "wagmi";

export const useTokenContractRead = (
  functionName,
  successMessage = false,
  errorMessage = false,
  watch = false
) => {
  const config = {
    address: TOKEN_ADDRESS,
    abi: TOKEN_ABI,
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
