import PropTypes from "prop-types";
import s from "./HeaderButton.module.scss";

export const HeaderButton = ({ text }) => {
  return <button className={s.button}>{text}</button>;
};

HeaderButton.propTypes = {
  text: PropTypes.string.isRequired,
};
