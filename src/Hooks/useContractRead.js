import {
  CONTRACT,
  CONTRACT_ABI,
  TOKEN,
  TOKEN_ABI,
} from "../constants/constants";

import { useContractRead as useContractReadWagmi } from "wagmi";

export const useContractRead = ({
  functionName,
  token = false,
  successMessage = false,
  errorMessage = false,
  watch = false,
  args = undefined,
}) => {
  const config = {
    address: token ? TOKEN : CONTRACT,
    abi: token ? TOKEN_ABI : CONTRACT_ABI,
    functionName,
    watch,
    ...(args && { args }),
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

  return useContractReadWagmi(config);
};
