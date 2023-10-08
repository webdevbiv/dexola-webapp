import PropTypes from "prop-types";
import { useWindowWidth } from "../../Hooks";
import { roundToDecimalPlaces } from "../../utils/utils";
import { MEDIUM_WIDTH } from "../../constants/constants";
import s from "./MainTitle.module.scss";

export const MainTitle = ({ pageName, rewardRate }) => {
  const windowWidth = useWindowWidth();

  return (
    <div className={s.titleWrapper}>
      <h2 className={s.title}>{pageName}</h2>
      {pageName === "Stake" && (
        <div>
          <span className={s.label}>Reward rate:</span>
          <span className={s.labelValue}>
            {rewardRate
              ? windowWidth < MEDIUM_WIDTH
                ? roundToDecimalPlaces(rewardRate, 1)
                : roundToDecimalPlaces(rewardRate, 4)
              : 0}
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
