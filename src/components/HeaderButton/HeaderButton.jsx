import PropTypes from "prop-types";
import s from "./HeaderButton.module.scss";

export const HeaderButton = ({ text, onClick }) => {
  return (
    <button
      className={s.button}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

HeaderButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};
