import PropTypes from "prop-types";
import s from "./MainTitle.module.scss";

export const MainTitle = ({ pageName, rewardRate }) => {
  return (
    <div className={s.titleWrapper}>
      <h2 className={s.title}>{pageName}</h2>
      {pageName === "Stake" && (
        <div>
          <span className={s.label}>Reward rate:</span>
          <span className={s.labelValue}>{rewardRate}</span>
          <span className={s.labelUnit}>stru/week</span>
        </div>
      )}
    </div>
  );
};

MainTitle.propTypes = {
  pageName: PropTypes.string,
  rewardRate: PropTypes.string,
};
