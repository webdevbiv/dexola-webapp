import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
  amount: Yup.number()
    .typeError("Amount is required")
    .positive("Amount must be positive")
    .max(
      999999999999999,
      "Amount must be less than or equal to 999999999999999"
    )
    .test("balance", "Insufficient funds", function () {
      const { amount, balance } = this.parent;
      return amount <= balance;
    })
    .required("Amount is required"),
});
