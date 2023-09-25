import PropTypes from "prop-types";
import s from "./MainForm.module.scss";
import { useWindowWidth } from "../../Hooks/";
import { LARGE_WIDTH } from "../../constants/constants";

export const MainForm = ({
  handleSubmit,
  handleChange,
  isInputDisplayed = true,
  inputValue,
  isAnyLoading,
  balanceToDisplay,
  buttonText,
}) => {
  const windowWidth = useWindowWidth();
  console.log(buttonText, windowWidth);
  return (
    <form
      onSubmit={handleSubmit}
      className={s.form}
    >
      <div className={s.inputWrapper}>
        {isInputDisplayed && (
          <input
            type='text'
            placeholder='Enter stake amount'
            name='amount'
            value={inputValue}
            onChange={handleChange}
            className={s.input}
            inputMode='numeric'
            pattern='[0-9]*'
            maxLength='15'
          />
        )}
        <div className={s.balance}>
          <span className={s.balanceLabel}>Available:</span>
          <span className={s.balanceValue}>{balanceToDisplay}</span>
          <span className={s.balanceUnit}>STRU</span>
        </div>
      </div>
      <div className={s.buttonWrapper}>
        <button
          disabled={isAnyLoading}
          type='submit'
          className={`${s.button} ${isAnyLoading ? s.buttonDisabled : ""}`}
        >
          {buttonText}
        </button>
        {buttonText.toLowerCase() === "withdraw" &&
          windowWidth > LARGE_WIDTH && (
            <button className={s.withdrawAllClaimRewardsButton}>
              withdraw all & claim rewards
            </button>
          )}
      </div>
    </form>
  );
};

MainForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func,
  isInputDisplayed: PropTypes.bool,
  inputValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  isAnyLoading: PropTypes.bool,
  balanceToDisplay: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  buttonText: PropTypes.string.isRequired,
};
