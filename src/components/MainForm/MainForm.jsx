import PropTypes from "prop-types";
import { Form, Field, ErrorMessage, Formik } from "formik";
import { useWindowWidth } from "../../Hooks/";
import { roundToDecimalPlaces } from "../../utils/utils";
import { LARGE_WIDTH } from "../../constants/constants";
import { validationSchema } from "./formValidation";
import s from "./MainForm.module.scss";

export const MainForm = ({
  handleSubmit,
  isInputDisplayed = true,
  inputValue,
  balanceToDisplay,
  buttonText,
  handleChange,
  onWithdrawAllClaimRewardsClick,
}) => {
  const windowWidth = useWindowWidth();

  return (
    <Formik
      initialValues={{
        amount: "",
        balance: "",
      }}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        handleSubmit();

        setSubmitting(false);
      }}
    >
      {({ isSubmitting, setFieldValue }) => (
        <Form className={s.form}>
          <div className={s.inputWrapper}>
            {isInputDisplayed && (
              <div className={s.formikWrapper}>
                <Field
                  type='text'
                  name='amount'
                  inputMode='numeric'
                  onChange={(e) => {
                    handleChange(e);
                    const newValue = e.target.value;
                    setFieldValue("amount", parseFloat(newValue));
                    setFieldValue("balance", parseFloat(balanceToDisplay));
                  }}
                  value={inputValue}
                  placeholder={`Enter ${buttonText.toLowerCase()} amount`}
                  className={s.input}
                />
                <ErrorMessage
                  name='amount'
                  component='div'
                  className={s.error}
                />
              </div>
            )}
            <div className={s.balance}>
              <span className={s.balanceLabel}>Available:</span>
              <span className={s.balanceValue}>
                {Number(balanceToDisplay) === 0
                  ? "0.00"
                  : roundToDecimalPlaces(balanceToDisplay, 4)}
              </span>
              <span className={s.balanceUnit}>STRU</span>
            </div>
          </div>
          <div className={s.buttonWrapper}>
            {buttonText.toLowerCase() === "claim rewards" ? (
              <button
                type='button'
                className={`${s.button} ${
                  isSubmitting ? s.buttonDisabled : ""
                }`}
                disabled={isSubmitting}
                onClick={handleSubmit}
              >
                {buttonText}
              </button>
            ) : (
              <button
                type='submit'
                className={`${s.button} ${
                  isSubmitting ? s.buttonDisabled : ""
                }`}
                disabled={isSubmitting}
              >
                {buttonText}
              </button>
            )}

            {buttonText.toLowerCase() === "withdraw" &&
              windowWidth >= LARGE_WIDTH && (
                <button
                  type='button'
                  className={s.withdrawAllClaimRewardsButton}
                  onClick={onWithdrawAllClaimRewardsClick}
                >
                  withdraw all & claim rewards
                </button>
              )}
          </div>
        </Form>
      )}
    </Formik>
  );
};

MainForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  buttonText: PropTypes.string.isRequired,
  balanceToDisplay: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  isInputDisplayed: PropTypes.bool,
  inputValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onWithdrawAllClaimRewardsClick: PropTypes.func,
  handleChange: PropTypes.func,
};
