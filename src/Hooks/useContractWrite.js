import {
  CONTRACT,
  CONTRACT_ABI,
  TOKEN,
  TOKEN_ABI,
} from "../constants/constants";
import { useContractWrite as useContractWriteWagmi } from "wagmi";

export const useContractWrite = (
  functionName,
  token = false,
  onSuccessCallback = null,
  onErrorCallback = null
) => {
  let config = {};

  if (token) {
    config = {
      address: TOKEN,
      abi: TOKEN_ABI,
      functionName,
    };
  } else {
    config = {
      address: CONTRACT,
      abi: CONTRACT_ABI,
      functionName,
    };
  }

  if (onSuccessCallback && typeof onSuccessCallback === "function") {
    config.onSuccess = onSuccessCallback;
  } else {
    config.onSuccess = (data) => {
      console.log(`Success ${functionName}`, data);
    };
  }

  if (onErrorCallback && typeof onErrorCallback === "function") {
    config.onError = onErrorCallback;
  } else {
    config.onError = (error) => {
      console.log(`Error ${functionName}`, error);
    };
  }

  return useContractWriteWagmi(config);
};
