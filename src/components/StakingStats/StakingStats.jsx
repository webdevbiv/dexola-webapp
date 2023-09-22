import s from "./StakingStats.module.scss";
import infoImg from "../../assets/images/icons/info.svg";
import { calculateAPR, calculateDaysRemaining } from "../../utils/utils";
import { useContractRead } from "../../Hooks/useContractRead";
import { useAccount } from "wagmi";
import { formatEther } from "viem";
import { CONTRACT_ABI, TOKEN_ABI } from "../../constants/constants";
console.log(TOKEN_ABI, CONTRACT_ABI);

export const StakingStats = () => {
  const { address: userWalletAddress, isConnected } = useAccount();

  const { data: userStakedBalanceOfStarRunner } = useContractRead({
    functionName: "balanceOf",
    args: [userWalletAddress],
    watch: isConnected,
    enabled: isConnected,
  });

  const { data: userRewards } = useContractRead({
    functionName: "rewards",
    args: [userWalletAddress],
    watch: isConnected,
    enabled: isConnected,
  });

  const { data: totalSupply } = useContractRead({
    functionName: "totalSupply",
    watch: true,
  });

  const { data: getRewardForDuration } = useContractRead({
    functionName: "getRewardForDuration",
    watch: true,
  });

  const { data: periodFinish } = useContractRead({
    functionName: "periodFinish",
    watch: true,
  });
  // console.log(
  //   `getRewardForDuration`,
  //   getRewardForDuration,
  //   `totalSupply`,
  //   totalSupply
  // );

  const APR = calculateAPR(getRewardForDuration, totalSupply);
  console.log(APR);
  const daysRemaining = calculateDaysRemaining(periodFinish);

  const statsData = [
    {
      value: isConnected ? formatEther(userStakedBalanceOfStarRunner) : "0",
      label: "Staked balance",
      suffix: "stru",
      showInfoIcon: true,
    },
    {
      value: APR ? `≈${APR}%` : "≈0%",
      label: "APR",
      showInfoIcon: true,
    },
    {
      value: daysRemaining ? daysRemaining : "0",
      label: "Days",
    },
    {
      value: isConnected ? Number(formatEther(userRewards)).toFixed(2) : "0.00",
      label: "Rewards",
      suffix: "stru",
      showInfoIcon: true,
    },
  ];

  return (
    <div className={s.container}>
      <h1 className={s.title}>StarRunner Token staking</h1>
      <div>
        <ul className={s.listStats}>
          {statsData.map((stat, index) => (
            <li key={index}>
              <div>
                <span className={s.value}>{stat.value}</span>
                {stat.suffix && <span className={s.suffix}>{stat.suffix}</span>}
                {stat.showInfoIcon && (
                  <img
                    src={infoImg}
                    alt='info'
                    className={s.infoIcon}
                  />
                )}
              </div>
              <div>
                <span className={s.label}>{stat.label}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
