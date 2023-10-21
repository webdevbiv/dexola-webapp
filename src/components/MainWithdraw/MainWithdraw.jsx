import { useState } from "react";
import { MainContainer } from "../MainContainer/MainContainer";
import { MainForm } from "../MainForm/MainForm";
import { MainTitle } from "../MainTitle/MainTitle";
import { parseEther } from "viem";
import { sanitizeInputValue } from "../../utils/utils";
import { Toast } from "../Toast/Toast";
import { useWithdrawUserData, useWithdrawOperations } from "../../Hooks";

function MainWithdraw() {
  const [inputValue, setInputValue] = useState("");
  const [toastValue, setToastValue] = useState(0);
  const { balanceToDisplay, userRewards } = useWithdrawUserData();
  const amountToWithdraw = parseEther(inputValue.toString());

  const { toastType, isAnyLoading, handleWithdrawAll, handleWithdraw } =
    useWithdrawOperations({ amountToWithdraw, setInputValue });

  // Handle Actions
  const handleChange = (e) => {
    const sanitizedValue = sanitizeInputValue(e.target.value);
    setInputValue(sanitizedValue);
  };

  const handleSubmit = () => {
    if (inputValue === "") return;
    if (Number(inputValue) > Number(balanceToDisplay)) {
      return;
    }
    setToastValue(inputValue);
    handleWithdraw();
  };

  const handleWithdrawAllClaimRewardsClick = (e) => {
    e.preventDefault();
    userRewards &&
      setToastValue(Number(balanceToDisplay) + Number(userRewards));
    handleWithdrawAll();
  };

  return (
    <MainContainer>
      <MainTitle pageName='Withdraw' />
      <MainForm
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        onWithdrawAllClaimRewardsClick={handleWithdrawAllClaimRewardsClick}
        inputValue={inputValue}
        isAnyLoading={isAnyLoading}
        balanceToDisplay={balanceToDisplay ? balanceToDisplay : "0"}
        buttonText={"Withdraw"}
      />
      <Toast
        toastType={toastType}
        value={toastValue}
        pageName='withdraw'
      />
    </MainContainer>
  );
}

export default MainWithdraw;
