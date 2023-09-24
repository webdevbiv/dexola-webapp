import { useAccount, useContractRead, useWaitForTransaction } from "wagmi";
import { MainContainer } from "../MainContainer/MainContainer";
import { MainForm } from "../MainForm/MainForm";
import { MainTitle } from "../MainTitle/MainTitle";
import { useContractWrite } from "../../Hooks";
import { formatEther } from "viem";
import { useState } from "react";
import { CONTRACT, CONTRACT_ABI } from "../../constants/constants";

export const MainClaimRewards = () => {
  const { address: userWalletAddress } = useAccount();
  const [balanceToDisplay, setBalanceToDisplay] = useState("0.00");

  const userRewards = useContractRead({
    address: CONTRACT,
    abi: CONTRACT_ABI,
    functionName: "earned",
    args: [userWalletAddress],
    watch: true,
    onSuccess: (data) => {
      if (data) setBalanceToDisplay(Number(formatEther(data)).toFixed(2));
    },
  });

  const {
    data: claimRewardsData,
    isLoading: claimRewardsIsLoading,
    isSuccess: claimRewardsIsSuccess,
    write: claimRewardsWrite,
  } = useContractWrite({
    functionName: "claimReward",
  });

  const {
    data: waitClaimRewards,
    isError: waitClaimRewardsIsError,
    isLoading: waitClaimRewardsIsLoading,
  } = useWaitForTransaction({
    hash: claimRewardsData?.hash,
    onSettled(data, error) {
      console.log("Settled waitClaimRewards", { data, error });
      setBalanceToDisplay("0.00");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    claimRewardsWrite();
  };

  const isAnyLoading = claimRewardsIsLoading || waitClaimRewardsIsLoading;

  return (
    <MainContainer>
      <MainTitle pageName='Claim rewards' />
      <MainForm
        handleSubmit={handleSubmit}
        isInputDisplayed={false}
        isAnyLoading={isAnyLoading}
        balanceToDisplay={
          balanceToDisplay && userRewards ? balanceToDisplay : "0.00"
        }
        buttonText={"Claim rewards"}
      />
    </MainContainer>
  );
};
