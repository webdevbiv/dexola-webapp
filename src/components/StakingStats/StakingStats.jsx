import s from "./StakingStats.module.scss";
import infoImg from "../../assets/images/icons/info.svg";
import { useContractRead } from "wagmi";
import { TOKEN_ADDRESS, TOKEN_ABI } from "../../constants/constants";
import { useEffect } from "react";

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
  const сontractRead = useContractRead({
    address: TOKEN_ADDRESS,
    abi: TOKEN_ABI,
    functionName: "totalSupply",
    watch: true,
    onSuccess(data) {
      console.log("Success", data);
    },
    onError(error) {
      console.log("Error", error);
    },
  });

  const statsData = [
    {
      value: "0.00",
      label: "Staked balance",
      suffix: "stru",
      showInfoIcon: true,
    },
    {
      value: "8%",
      label: "APY",
      showInfoIcon: true,
    },
    {
      value: "0",
      label: "Days",
    },
    {
      value: "0.00",
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
