import s from "./StakingStats.module.scss";
import infoImg from "../../assets/images/icons/info.svg";
import { calculateAPR, calculateDaysRemaining } from "../../utils/utils";
import { useContractRead } from "../../Hooks/useContractRead";
import { useAccount } from "wagmi";
import { formatEther } from "viem";

const StatItem = ({ value, label, suffix, showInfoIcon }) => (
  <li>
    <div>
      <span className={s.value}>{value}</span>
      {suffix && <span className={s.suffix}>{suffix}</span>}
      {showInfoIcon && (
        <img
          src={infoImg}
          alt='info'
          className={s.infoIcon}
        />
      )}
    </div>
    <div>
      <span className={s.label}>{label}</span>
    </div>
  </li>
);

export const StakingStats = () => {
  const { address: userWalletAddress, isConnected } = useAccount();

  const { data: userStakedBalanceOfStarRunner } = useContractRead({
    functionName: "balanceOf",
    args: [userWalletAddress],
    watch: true,
    enabled: isConnected,
  });

  const { data: userRewards } = useContractRead({
    functionName: "rewards",
    args: [userWalletAddress],
    watch: true,
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

  const APR = calculateAPR(getRewardForDuration, totalSupply);
  const days = calculateDaysRemaining(periodFinish);

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
      value: days ? days : "0",
      label: "Days",
    },
    {
      value: userRewards ? Number(formatEther(userRewards)).toFixed(2) : "0.00",
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
            <StatItem
              key={index}
              {...stat}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};
