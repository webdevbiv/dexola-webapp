import PropTypes from "prop-types";
import { Formik, Field, ErrorMessage, Form } from "formik";
import * as Yup from "yup";
import s from "./MainForm.module.scss";
import { useWindowWidth } from "../../Hooks/";
import { LARGE_WIDTH } from "../../constants/constants";

const validationSchema = Yup.object().shape({
  amount: Yup.number()
    .typeError("Please enter a valid number")
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
                    setFieldValue("amount", newValue);
                    setFieldValue("balance", balanceToDisplay);
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
                  : Number(balanceToDisplay).toFixed(4)}
              </span>
              <span className={s.balanceUnit}>STRU</span>
            </div>
          </div>
          <div className={s.buttonWrapper}>
            <button
              type='submit'
              className={`${s.button} ${isSubmitting ? s.buttonDisabled : ""}`}
              disabled={isSubmitting}
            >
              {buttonText}
            </button>
            {buttonText.toLowerCase() === "withdraw" &&
              windowWidth >= LARGE_WIDTH && (
                <button
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
