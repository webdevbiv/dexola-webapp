import { useWindowWidth } from "../../Hooks/";
import { LARGE_WIDTH, MEDIUM_WIDTH } from "../../constants/constants";
import { Tooltip } from "../Tooltip/Tooltip";
import statsData from "./statsData";
import s from "./StakingStats.module.scss";
import { useStakingStatsData } from "../../Hooks/useStakingStatsData";

export const StakingStats = () => {
  const windowWidth = useWindowWidth();
  const { userStakedBalanceOfStarRunner, APR, daysRemaining, userRewards } =
    useStakingStatsData();

  const data = statsData(
    userStakedBalanceOfStarRunner,
    APR,
    daysRemaining,
    userRewards,
    windowWidth,
    MEDIUM_WIDTH
  );

  return (
    <div className={s.container}>
      <h1 className={s.title}>StarRunner Token staking</h1>
      <div>
        <ul className={s.listStats}>
          {data.map((stat, index) => (
            <li
              key={index}
              className={s.item}
            >
              <div className={s.valueWrapper}>
                <span className={s.value}>{stat.value}</span>
                {stat.suffix && <span className={s.suffix}>{stat.suffix}</span>}
                {stat.showInfoIcon && windowWidth < LARGE_WIDTH && (
                  <>
                    <Tooltip
                      text={stat.text}
                      id={stat.id}
                    />
                  </>
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
