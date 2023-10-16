import {
  useAccount,
  useContractRead,
  useWaitForTransaction,
  useContractWrite,
} from "wagmi";
import { MainContainer } from "../MainContainer/MainContainer";
import { MainForm } from "../MainForm/MainForm";
import { MainTitle } from "../MainTitle/MainTitle";
import { formatEther } from "viem";
import { useState } from "react";
import { CONTRACT, CONTRACT_ABI } from "../../constants/constants";
import { Toast } from "../Toast/Toast";

function MainClaimRewards() {
  const { address: userWalletAddress } = useAccount();
  const [balanceToDisplay, setBalanceToDisplay] = useState("0.00");
  const [toastType, setToastType] = useState("");
  const [toastValue, setToastValue] = useState(0);

  const userRewards = useContractRead({
    address: CONTRACT,
    abi: CONTRACT_ABI,
    functionName: "earned",
    args: [userWalletAddress],
    watch: true,
    onSuccess: (data) => {
      if (data) setBalanceToDisplay(formatEther(data));
    },
  });

  const {
    data: claimRewardsData,
    isLoading: claimRewardsIsLoading,
    write: claimRewardsWrite,
  } = useContractWrite({
    address: CONTRACT,
    abi: CONTRACT_ABI,
    functionName: "claimReward",
    onError() {
      setToastType("error");
    },
  });

  const { data: waitClaimRewards, isLoading: waitClaimRewardsIsLoading } =
    useWaitForTransaction({
      hash: claimRewardsData?.hash,
      onSettled() {
        setToastType("success");
        setBalanceToDisplay("0.00");
      },
      onError() {
        setToastType("error");
      },
    });

  const handleSubmit = (e) => {
    e.preventDefault();
    setToastType("pending");
    setToastValue(balanceToDisplay);
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
      <Toast
        toastType={toastType}
        value={toastValue}
        pageName='claimRewards'
      />
    </MainContainer>
  );
}

export default MainClaimRewards;
