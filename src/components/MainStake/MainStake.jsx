import { useState } from "react";
import { useAccount, useWaitForTransaction } from "wagmi";
import { parseEther } from "viem";
import useUserBalanceOfStarRunner from "../../Hooks/useUserBalanceOfStarRunner";
import { useRewardRateForUser } from "../../Hooks/useRewardRateForUser";
import { useContractWrite } from "../../Hooks/useContractWrite";
import { useContractRead } from "../../Hooks/useContractRead";

import { CONTRACT } from "../../constants/constants";
import dataC from "../../data/contractABI.json";
import dataT from "../../data/tokenABI.json";
import s from "./MainStake.module.scss";

console.log(dataC, dataT);

export const MainStake = () => {
  const [inputValue, setInputValue] = useState("");
  const { address: userWalletAddress } = useAccount();
  const userBalanceOfStarRunner = useUserBalanceOfStarRunner(userWalletAddress);
  const rewardRate = useRewardRateForUser(inputValue);
  const amountApprove = parseEther(inputValue.toString());

  // const { data: allowance } = useContractRead({
  //   functionName: "allowance",
  //   token: true,
  //   watch: true,
  //   args: [userWalletAddress, CONTRACT],
  // });
  // console.log(allowance);

  const {
    data: approveData,
    isLoading: approveIsLoading,
    isSuccess: approveIsSuccess,
    write: approveWrite,
  } = useContractWrite({
    functionName: "approve",
    token: true,
  });

  const {
    data: waitForApprove,
    isError: waitForApproveIsError,
    isLoading: waitForApproveIsLoading,
  } = useWaitForTransaction({
    hash: approveData?.hash,
    onSettled(data, error) {
      console.log("Settled waitForApprove", { data, error });
      stakeWrite({ args: [amountApprove] });
    },
  });

  const {
    data: stakeData,
    isLoading: stakeIsLoading,
    isSuccess: stakeIsSuccess,
    write: stakeWrite,
  } = useContractWrite({ functionName: "stake" });

  const {
    data: waitForStake,
    isError: waitForStakeIsError,
    isLoading: waitForStakeIsLoading,
  } = useWaitForTransaction({
    hash: stakeData?.hash,
    onSettled(data, error) {
      console.log("Settled waitForStake", { data, error });
      setInputValue("");
    },
  });

  const handleChange = (e) => {
    let value = e.target.value;
    // Remove leading zeros
    value = value.replace(/^0+/, "");

    // Prevent negative values by checking if the first character is a "-"
    if (value.charAt(0) === "-") {
      value = value.substring(1);
    }

    // Remove any decimal points
    if (value.includes(".")) {
      value = value.split(".")[1];
    }
    if (value < 0) value = 0;
    if (value > 10000) value = 10000;

    setInputValue(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await approveWrite({
      args: [CONTRACT, amountApprove],
    });
  };

  const isAnyLoading =
    approveIsLoading ||
    stakeIsLoading ||
    waitForApproveIsLoading ||
    waitForStakeIsLoading;

  return (
    <div className={`mainContainer ${s.container}`}>
      <div className={s.wrapper}>
        <div className={s.titleWrapper}>
          <h2 className={s.title}>Stake</h2>
          <div>
            <span className={s.label}>Reward rate:</span>
            <span className={s.labelValue}>{rewardRate}</span>
            <span className={s.labelUnit}>stru/week</span>
          </div>
        </div>
        <form
          onSubmit={handleSubmit}
          className={s.form}
        >
          <div className={s.inputWrapper}>
            <input
              type='number'
              placeholder='Enter stake amount'
              name='amount'
              value={inputValue}
              onChange={handleChange}
              min='1'
              max='10000'
              step='1'
              className={s.input}
            />
            <div className={s.balance}>
              <span className={s.label}>Available:</span>
              <span className={s.balanceValue}>
                {userBalanceOfStarRunner.formatted}
              </span>
              <span className={s.balanceUnit}>STRU</span>
            </div>
          </div>
          <div className={s.buttonWrapper}>
            <button
              disabled={isAnyLoading}
              type='submit'
              className={`${s.button} ${isAnyLoading ? s.buttonDisabled : ""}`}
            >
              stake
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
