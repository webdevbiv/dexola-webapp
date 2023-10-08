import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import s from "./Toast.module.scss";
import toastSuccess from "../../assets/images/icons/toast_success.svg";
import toastError from "../../assets/images/icons/toast_error.svg";

export const Toast = ({ toastType, value, pageName }) => {
  const [isVisible, setIsVisible] = useState(false);

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
              <span className={s.successValue}>{value}&nbsp;stru&nbsp;</span>
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
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 33 32'
            fill='none'
            className={s.icon}
          >
            <g opacity='0.3'>
              <mask
                id='path-1-inside-1_3230_1652'
                fill='white'
              >
                <path d='M32.5 16C32.5 24.8366 25.3366 32 16.5 32C7.66344 32 0.5 24.8366 0.5 16C0.5 7.16344 7.66344 0 16.5 0C25.3366 0 32.5 7.16344 32.5 16ZM4.5 16C4.5 22.6274 9.87258 28 16.5 28C23.1274 28 28.5 22.6274 28.5 16C28.5 9.37258 23.1274 4 16.5 4C9.87258 4 4.5 9.37258 4.5 16Z' />
              </mask>
              <path
                d='M32.5 16C32.5 24.8366 25.3366 32 16.5 32C7.66344 32 0.5 24.8366 0.5 16C0.5 7.16344 7.66344 0 16.5 0C25.3366 0 32.5 7.16344 32.5 16ZM4.5 16C4.5 22.6274 9.87258 28 16.5 28C23.1274 28 28.5 22.6274 28.5 16C28.5 9.37258 23.1274 4 16.5 4C9.87258 4 4.5 9.37258 4.5 16Z'
                stroke='#6E758B'
                strokeWidth='6'
                mask='url(#path-1-inside-1_3230_1652)'
              />
            </g>
            <path
              d='M16.5 2C16.5 0.895431 17.3989 -0.0128753 18.4948 0.124839C19.9105 0.302737 21.2991 0.669597 22.6229 1.21793C24.5641 2.022 26.328 3.20055 27.8137 4.68629C29.2994 6.17203 30.478 7.93586 31.2821 9.87707C31.8304 11.2009 32.1973 12.5895 32.3752 14.0052C32.5129 15.1011 31.6046 16 30.5 16C29.3954 16 28.517 15.0985 28.3337 14.0092C28.1839 13.1188 27.9337 12.246 27.5866 11.4078C26.9835 9.95189 26.0996 8.62902 24.9853 7.51472C23.871 6.40042 22.5481 5.5165 21.0922 4.91345C20.254 4.56627 19.3812 4.31608 18.4908 4.16628C17.4015 3.98304 16.5 3.10457 16.5 2Z'
              fill='#20FE51'
              className={s.spinnerPath}
            />
          </svg>
          <div className={s.message}>
            <p className={s.pendingTextWrapper}>
              {pageName === "stake" && (
                <span className={s.pendingText}>
                  Adding&nbsp;
                  <span className={s.pendingValue}>{value}&nbsp;stru</span>
                  &nbsp;to Staking
                </span>
              )}
              {pageName === "withdraw" && (
                <span className={s.pendingText}>
                  Withdrawing&nbsp;
                  <span className={s.pendingValue}>{value}&nbsp;stru</span>
                </span>
              )}
              {pageName === "claimRewards" && (
                <span className={s.pendingText}>
                  Claiming&nbsp;
                  <span className={s.pendingValue}>{value}&nbsp;stru</span>
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
