import s from "./StakingStats.module.scss";
export const StakingStats = () => {
  return (
    <div className={s.container}>
      <h1 className={s.title}>StarRunner Token staking</h1>
      <div>
        <ul className={s.listStats}>
          <li>
            <div>
              <span>0.00</span>
              <span>stru</span>
              <img />
            </div>
            <div>
              <span>Staked balance</span>
            </div>
          </li>
          <li>
            <div>
              <span></span>
              <span>8</span>
              <span>%</span>
              <img />
            </div>
            <div>
              <span>APY</span>
            </div>
          </li>
          <li>
            <div>
              <span>0</span>
              <img />
            </div>
            <div>
              <span>Days</span>
            </div>
          </li>
          <li>
            <div>
              <span>0.00</span>
              <span>stru</span>
              <img />
            </div>
            <div>
              <span>Rewards</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};
