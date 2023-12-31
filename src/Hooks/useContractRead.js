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
  enabled = true,
  args = undefined,
}) => {
  const config = {
    address: token ? TOKEN : CONTRACT,
    abi: token ? TOKEN_ABI : CONTRACT_ABI,
    functionName,
    watch,
    enabled,
    ...(args && { args }),
  };

  if (successMessage) {
    config.onSuccess = () => {};
  }

  if (errorMessage) {
    config.onError = () => {};
  }

  return useContractReadWagmi(config);
};
