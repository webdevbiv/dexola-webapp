import {
  CONTRACT,
  CONTRACT_ABI,
  TOKEN,
  TOKEN_ABI,
} from "../constants/constants";
import { useContractWrite as useContractWriteWagmi } from "wagmi";

export const useContractWrite = ({
  functionName,
  token = false,
  onSuccessCallback = null,
  onErrorCallback = null,
  onSettledCallback = null,
}) => {
  const defaultSuccessCallback = (data) => {
    console.log(`Success ${functionName}`, data);
  };

  const defaultErrorCallback = (error) => {
    console.log(`Error ${functionName}`, error);
  };

  const defaultSettledCallback = (data) => {
    console.log(`Settled ${functionName}`, data);
  };

  const config = {
    address: token ? TOKEN : CONTRACT,
    abi: token ? TOKEN_ABI : CONTRACT_ABI,
    functionName,
    onSuccess:
      typeof onSuccessCallback === "function"
        ? onSuccessCallback
        : defaultSuccessCallback,
    onError:
      typeof onErrorCallback === "function"
        ? onErrorCallback
        : defaultErrorCallback,
    onSettled:
      typeof onSettledCallback === "function"
        ? onSettledCallback
        : defaultSettledCallback,
  };

  return useContractWriteWagmi(config);
};
