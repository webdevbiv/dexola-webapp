import PropTypes from "prop-types";
import s from "./MainForm.module.scss";
export const MainForm = ({
  handleSubmit,
  handleChange,
  inputValue,
  isAnyLoading,
  balanceOfStarRunner,
}) => {
  return (
    <form
      onSubmit={handleSubmit}
      className={s.form}
    >
      <div className={s.inputWrapper}>
        <input
          type='number'
          placeholder='Enter stake amount'
          name='amount'
          value={inputValue}
          onChange={handleChange}
          min='1'
          max='10000'
          step='1'
          className={s.input}
        />
        <div className={s.balance}>
          <span className={s.label}>Available:</span>
          <span className={s.balanceValue}>
            {balanceOfStarRunner.formatted}
          </span>
          <span className={s.balanceUnit}>STRU</span>
        </div>
      </div>
      <div className={s.buttonWrapper}>
        <button
          disabled={isAnyLoading}
          type='submit'
          className={`${s.button} ${isAnyLoading ? s.buttonDisabled : ""}`}
        >
          stake
        </button>
      </div>
    </form>
  );
};

MainForm.propTypes = {
  balanceOfStarRunner: PropTypes.shape({
    formatted: PropTypes.any,
  }),
  handleChange: PropTypes.any,
  handleSubmit: PropTypes.any,
  inputValue: PropTypes.any,
  isAnyLoading: PropTypes.any,
};
