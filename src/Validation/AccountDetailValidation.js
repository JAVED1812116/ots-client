import * as Yup from "yup";
Yup.addMethod(Yup.string, "stripEmptyString", function () {
  return this.transform((value) => (value === "" ? undefined : value));
});

const getAccountDetailValidationSchema = () => {
  return Yup.object().shape({
    bankName: Yup.string()
    .required("Field is required")
    .min(3,"Bank Name min 3 character")
    .max(25,"Bank Name max 25 character")
    .nullable(),
    accountName: Yup.string()
    .required("Field is required")
    .min(3,"Account Name min 3 character")
    .max(20,"Account Name max 20 character")
    .nullable(),
    accountNumber: Yup.number()
    .transform((value, originalValue) =>
      originalValue === "" ? null : value
  )
    .required("Field is required")
    .typeError("Must be a number")
    .min(7,"Account Number Should be min 7 character")
    // .max(15,"Account Number Should be of max 15 character")
    .nullable(),
    ibanNumber: Yup.string()
    .required("Field is required")
    .min(16,"IBAN Number Should be min 16 Character")
    .max(24,"IBAN Number Should be of max 24 Character")
    .nullable(),
  });
};
export const AccountDetailValidation = getAccountDetailValidationSchema;
export default AccountDetailValidation;

