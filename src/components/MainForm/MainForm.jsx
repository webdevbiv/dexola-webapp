import PropTypes from "prop-types";
import s from "./MainForm.module.scss";

export const MainForm = ({
  handleSubmit,
  handleChange,
  isInputDisplayed = true,
  inputValue,
  isAnyLoading,
  balanceToDisplay,
  buttonText,
}) => {
  return (
    <form
      onSubmit={handleSubmit}
      className={s.form}
    >
      <div className={s.inputWrapper}>
        {isInputDisplayed && (
          <input
            type='number'
            placeholder='Enter stake amount'
            name='amount'
            value={inputValue}
            onChange={handleChange}
            className={s.input}
          />
        )}
        <div className={s.balance}>
          <span className={s.label}>Available:</span>
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
      </div>
    </form>
  );
};

MainForm.propTypes = {
  balanceToDisplay: PropTypes.any,
  handleChange: PropTypes.any,
  handleSubmit: PropTypes.any,
  inputValue: PropTypes.any,
  isAnyLoading: PropTypes.any,
  buttonText: PropTypes.any,
  isInputDisplayed: PropTypes.any,
};
