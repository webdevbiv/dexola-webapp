import PropTypes from "prop-types";
export const Background = ({ children }) => {
  return <div className="background">{children}</div>;
};

Background.propTypes = {
  children: PropTypes.node.isRequired,
};
