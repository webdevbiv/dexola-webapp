import { useEffect } from "react";
import PropTypes from "prop-types";
import "./Toast.module.scss"; // Create a CSS file for styling

const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      onClose();
    }, 3000); // Close the toast automatically after 3 seconds

    return () => {
      clearTimeout(timeout);
    };
  }, [onClose]);

  const toastClassName = `toast ${type}`;

  return (
    <div className={toastClassName}>
      <p>{message}</p>
    </div>
  );
};

Toast.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["pending", "error", "success"]).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Toast;
