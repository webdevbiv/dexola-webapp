import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import s from "./Toast.module.scss";
import toastSuccess from "../../assets/images/icons/toast_success.svg";
import toastError from "../../assets/images/icons/toast_error.svg";
import { roundToDecimalPlaces } from "../../utils/utils";
import ToastSpinnerIcon from "./ToastSpinnerIcon";

export const Toast = ({ toastType, value, pageName }) => {
  const [isVisible, setIsVisible] = useState(false);
  const amountToDisplay = roundToDecimalPlaces(value, 7);

  useEffect(() => {
    if (toastType === "pending") {
      setIsVisible(true);
    }
    if (toastType === "error" || toastType === "success") {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 4000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [toastType]);

  return isVisible ? (
    <div className={s.container}>
      {toastType === "success" && (
        <>
          <img
            className={s.icon}
            src={toastSuccess}
          />
          <div className={s.message}>
            <p className={s.successTextWrapper}>
              <span className={s.successValue}>
                {amountToDisplay}&nbsp;stru&nbsp;
              </span>
              {pageName === "stake" && (
                <span className={s.successText}>
                  successfully added to Staking
                </span>
              )}
              {pageName === "withdraw" && (
                <span className={s.successText}>successfully withdrawn</span>
              )}
              {pageName === "claimRewards" && (
                <span className={s.successText}>
                  successfully claimed rewards
                </span>
              )}
            </p>
          </div>
        </>
      )}
      {toastType === "error" && (
        <>
          <img
            className={s.icon}
            src={toastError}
          />
          <div className={s.message}>
            <p className={s.errorText}>
              <span className={s.errorTextFirst}>Connection Error.</span>
              <span className={s.errorTextSecond}>Please try again</span>
            </p>
          </div>
        </>
      )}
      {toastType === "pending" && (
        <>
          <ToastSpinnerIcon
            classNameSVG={s.icon}
            classNamePath={s.spinnerPath}
          />
          <div className={s.message}>
            <p className={s.pendingTextWrapper}>
              {pageName === "stake" && (
                <span className={s.pendingText}>
                  Adding&nbsp;
                  <span className={s.pendingValue}>
                    {amountToDisplay}&nbsp;stru
                  </span>
                  &nbsp;to Staking
                </span>
              )}
              {pageName === "withdraw" && (
                <span className={s.pendingText}>
                  Withdrawing&nbsp;
                  <span className={s.pendingValue}>
                    {amountToDisplay}&nbsp;stru
                  </span>
                </span>
              )}
              {pageName === "claimRewards" && (
                <span className={s.pendingText}>
                  Claiming&nbsp;
                  <span className={s.pendingValue}>
                    {amountToDisplay}&nbsp;stru
                  </span>
                  &nbsp;rewards
                </span>
              )}
            </p>
          </div>
        </>
      )}
    </div>
  ) : null;
};

Toast.propTypes = {
  toastType: PropTypes.oneOf(["pending", "success", "error", ""]),
  value: PropTypes.any.isRequired,
  pageName: PropTypes.string.isRequired,
};
