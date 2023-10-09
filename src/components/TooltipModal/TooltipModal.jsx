import PropTypes from "prop-types";
import s from "./TooltipModal.module.scss";
export const TooltipModal = ({ onClick, text, isActive, id }) => {
  return (
    <div
      className={
        s.backdrop + " " + (isActive ? s.backdropActive : s.backdropNotActive)
      }
      onClick={onClick}
    >
      <div
        className={
          s.container +
          " " +
          (isActive ? s.containerActive : s.containerNotActive)
        }
      >
        <div className={s.wrapper}>
          <div className={s.grabber}></div>
          <h3 className={s.title}>
            {id === "stakedBalance" ? "Staked Balance" : id}
          </h3>
          <p className={s.text}>{text}</p>
        </div>
      </div>
    </div>
  );
};

TooltipModal.propTypes = {
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
};
