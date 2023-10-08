import PropTypes from "prop-types";
import { Form, Field, ErrorMessage, Formik } from "formik";
import * as Yup from "yup";
import { useWindowWidth } from "../../Hooks/";
import { roundToDecimalPlaces } from "../../utils/utils";
import { LARGE_WIDTH } from "../../constants/constants";
import s from "./MainForm.module.scss";

const validationSchema = Yup.object().shape({
  amount: Yup.number()
    .typeError("Amount is required")
    .positive("Amount must be positive")
    .max(
      999999999999999,
      "Amount must be less than or equal to 999999999999999"
    )
    .test("balance", "Insufficient funds", function () {
      const { amount, balance } = this.parent;
      console.log(`value: ${amount} balance: ${balance}`);
      console.log(this.parent);
      return amount <= balance;
    })
    .required("Amount is required"),
});

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

  console.log(balanceToDisplay);

  return (
    <Formik
      initialValues={{
        amount: "",
        balance: "",
      }}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        console.log("submit");
        console.log(values);
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
  isInputDisplayed: PropTypes.bool,
  inputValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  balanceToDisplay: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  buttonText: PropTypes.string.isRequired,
  onWithdrawAllClaimRewardsClick: PropTypes.func,
  handleChange: PropTypes.func,
};
