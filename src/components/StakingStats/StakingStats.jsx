import s from "./StakingStats.module.scss";
import infoImg from "../../assets/images/icons/info.svg";
import {
  calculateAPR,
  calculateDaysRemaining,
  sanitizeToDisplay,
} from "../../utils/utils";
import { useWindowWidth } from "../../Hooks/";
import { useContractRead } from "wagmi";
import { useAccount } from "wagmi";
import { formatEther } from "viem";
import { useEffect, useState } from "react";
import { CONTRACT, CONTRACT_ABI, LARGE_WIDTH } from "../../constants/constants";
import { Tooltip } from "../Tooltip/Tooltip";

export const StakingStats = () => {
  const windowWidth = useWindowWidth();
  const { address: userWalletAddress, isConnected } = useAccount();
  const [APR, setAPR] = useState(null);
  const [daysRemaining, setDaysRemaining] = useState(null);

  const { data: userStakedBalanceOfStarRunner } = useContractRead({
    address: CONTRACT,
    abi: CONTRACT_ABI,
    functionName: "balanceOf",
    args: [userWalletAddress],
    watch: isConnected,
    enabled: isConnected,
  });

  const { data: userRewards } = useContractRead({
    address: CONTRACT,
    abi: CONTRACT_ABI,
    functionName: "earned",
    args: [userWalletAddress],
    watch: isConnected,
    enabled: isConnected,
  });

  const { data: totalSupply } = useContractRead({
    address: CONTRACT,
    abi: CONTRACT_ABI,
    functionName: "totalSupply",
    watch: true,
  });

  const { data: getRewardForDuration } = useContractRead({
    address: CONTRACT,
    abi: CONTRACT_ABI,
    functionName: "getRewardForDuration",
    watch: true,
  });

  const { data: periodFinish } = useContractRead({
    address: CONTRACT,
    abi: CONTRACT_ABI,
    functionName: "periodFinish",
    watch: true,
  });

  useEffect(() => {
    if (periodFinish) {
      setDaysRemaining(calculateDaysRemaining(periodFinish));
    }

    if (getRewardForDuration && totalSupply) {
      setAPR(calculateAPR(getRewardForDuration, totalSupply));
    }
  }, [getRewardForDuration, totalSupply, periodFinish]);

  const statsData = [
    {
      value: userStakedBalanceOfStarRunner
        ? // ? formatEther(userStakedBalanceOfStarRunner)
          sanitizeToDisplay(userStakedBalanceOfStarRunner)
        : "0",
      label: "Staked balance",
      id: "stakedBalance",
      suffix: "stru",
      showInfoIcon: true,
      text: "Staking rewards get allocated on this sum",
    },
    {
      value: APR ? `≈${APR}%` : "≈0%",
      id: "apr",
      label: "APR",
      showInfoIcon: true,
      text: "Displays the average for APR. Interest rate is calculated for each amount of tokens.",
    },
    {
      value: daysRemaining ? daysRemaining : "0",
      label: "Days",
    },
    {
      value: userRewards ? sanitizeToDisplay(userRewards) : "0",
      label: "Rewards",
      id: "rewards",
      suffix: "stru",
      showInfoIcon: true,
      text: "Rewards get allocated every second",
    },
  ];

  return (
    <div className={s.container}>
      <h1 className={s.title}>StarRunner Token staking</h1>
      <div>
        <ul className={s.listStats}>
          {statsData.map((stat, index) => (
            <li
              key={index}
              className={s.item}
            >
              <div className={s.valueWrapper}>
                <span className={s.value}>{stat.value}</span>
                {stat.suffix && <span className={s.suffix}>{stat.suffix}</span>}
                {stat.showInfoIcon && windowWidth < LARGE_WIDTH && (
                  <Tooltip
                    text={stat.text}
                    id={stat.id}
                  />
                )}
              </div>
              <div className={s.labelWrapper}>
                <span className={s.label}>{stat.label}</span>
                {stat.showInfoIcon && windowWidth >= LARGE_WIDTH && (
                  <>
                    <Tooltip
                      text={stat.text}
                      id={stat.id}
                    />
                  </>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
