import PropTypes from "prop-types";
import s from "./MainTitle.module.scss";
import { roundToDecimalPlaces } from "../../utils/utils";

export const MainTitle = ({ pageName, rewardRate = 0 }) => {
  return (
    <div className={s.titleWrapper}>
      <h2 className={s.title}>{pageName}</h2>
      {pageName === "Stake" && (
        <div>
          <span className={s.label}>Reward rate:</span>
          <span className={s.labelValue}>
            {roundToDecimalPlaces(rewardRate, 4)}
          </span>
          <span className={s.labelUnit}>stru/week</span>
        </div>
      )}
    </div>
  );
};

MainTitle.propTypes = {
  pageName: PropTypes.string.isRequired,
  rewardRate: PropTypes.number,
};
