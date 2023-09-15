import PropTypes from "prop-types";
import s from "./MobileScroll.module.scss";
export const MobileScroll = ({ children }) => {
  return <div className={s.scroll}>{children}</div>;
};

MobileScroll.propTypes = {
  children: PropTypes.node.isRequired,
};
