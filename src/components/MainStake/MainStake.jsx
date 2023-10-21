import { useState } from "react";
import { parseEther } from "viem";
import { useApproveAndStake, useRewardRateForUser } from "../../Hooks";
import { MainTitle } from "../MainTitle/MainTitle";
import { MainContainer } from "../MainContainer/MainContainer";
import { MainForm } from "../MainForm/MainForm";
import { sanitizeInputValue } from "../../utils/utils";
import { Toast } from "../Toast/Toast";

function MainStake() {
  const [inputValue, setInputValue] = useState("");
  const [toastValue, setToastValue] = useState(0);
  const amountToApprove = parseEther(inputValue.toString());

  const { userRewardRate, balanceToDisplay, userBalanceOfStarRunner } =
    useRewardRateForUser(inputValue);

  const { isAnyLoading, toastType, handleWrite } =
    useApproveAndStake(amountToApprove);

  const handleChange = (e) => {
    const sanitizedValue = sanitizeInputValue(e.target.value);
    setInputValue(sanitizedValue);
  };

  const handleSubmit = () => {
    setToastValue(inputValue);
    handleWrite();
  };

  return (
    <MainContainer>
      <MainTitle
        pageName='Stake'
        rewardRate={userRewardRate ? userRewardRate : 0}
      />
      <MainForm
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        inputValue={inputValue}
        isAnyLoading={isAnyLoading}
        balanceToDisplay={
          balanceToDisplay && userBalanceOfStarRunner ? balanceToDisplay : "0"
        }
        buttonText={"Stake"}
      />
      <Toast
        toastType={toastType}
        value={toastValue}
        pageName='stake'
      />
    </MainContainer>
  );
}

export default MainStake;
