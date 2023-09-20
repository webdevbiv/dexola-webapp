import PropTypes from "prop-types";
import s from "./MainContainer.module.scss";

export const MainContainer = ({ children }) => {
  return (
    <div className={`mainContainer ${s.container}`}>
      <div className={s.wrapper}>{children}</div>
    </div>
  );
};

MainContainer.propTypes = {
  children: PropTypes.node.isRequired,
};
