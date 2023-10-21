import { MainContainer } from "../MainContainer/MainContainer";
import { MainForm } from "../MainForm/MainForm";
import { MainTitle } from "../MainTitle/MainTitle";
import { formatEther } from "viem";
import { useEffect, useState } from "react";
import { Toast } from "../Toast/Toast";
import { useStakingStatsData, useClaimRewards } from "../../Hooks";

function MainClaimRewards() {
  const [balanceToDisplay, setBalanceToDisplay] = useState("0.00");
  const [toastType, setToastType] = useState("");
  const [toastValue, setToastValue] = useState(0);

  const { userRewards } = useStakingStatsData();

  useEffect(() => {
    setBalanceToDisplay(formatEther(userRewards));
  }, [userRewards]);

  const { handleClaimRewards, isAnyLoading } = useClaimRewards({
    setToastType,
    setBalanceToDisplay,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setToastType("pending");
    setToastValue(balanceToDisplay);
    handleClaimRewards();
  };

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
