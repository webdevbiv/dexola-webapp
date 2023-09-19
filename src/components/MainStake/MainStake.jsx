import { useState } from "react";
import { useAccount } from "wagmi";
import useUserBalanceOfStarRunner from "../../Hooks/useUserBalanceOfStarRunner";
import s from "./MainStake.module.scss";
import { useRewardRateForUser } from "../../Hooks/useRewardRateForUser";
import { useContractWrite } from "../../Hooks/useContractWrite";
import data from "../../data/contractABI.json";
console.log(data);

export const MainStake = () => {
  const [inputValue, setInputValue] = useState("");
  const { address: userWalletAddress } = useAccount();
  const userBalanceOfStarRunner = useUserBalanceOfStarRunner(userWalletAddress);

  const handleChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
  };

  const rewardRate = useRewardRateForUser(inputValue);

  const {
    isLoading: approveIsLoading,
    isSuccess: approveIsSuccess,
    write: approveWrite,
  } = useContractWrite("approve", true, (data) => {
    stakeWrite({ args: [inputValue] });
  });

  const {
    data: stakeData,
    isLoading: stakeIsLoading,
    isSuccess: stakeIsSuccess,
    write: stakeWrite,
  } = useContractWrite("stake");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const amount = inputValue;
    console.log(inputValue);
    await approveWrite({
      args: [userWalletAddress, inputValue * 1000000000000000000],
    });
  };

  return (
    <div className={`mainContainer ${s.container}`}>
      <div className={s.wrapper}>
        <form onSubmit={handleSubmit}>
          <div>
            <h2>stake</h2>
            <div>
              <span>Reward rate:</span>
              <span>{rewardRate}</span>
              <span>stru/week</span>
            </div>
          </div>
          <div>
            <input
              type='number'
              placeholder='Enter stake amount'
              name='amount'
              value={inputValue}
              onChange={handleChange}
            />
            <div>
              <span>Available:</span>
              <span>{userBalanceOfStarRunner.formatted}</span>
              <span>STRU</span>
            </div>
          </div>
          <button type='submit'>stake</button>
        </form>
      </div>
    </div>
  );
};
