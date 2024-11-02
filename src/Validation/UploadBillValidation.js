import * as Yup from "yup";
Yup.addMethod(Yup.string, "stripEmptyString", function () {
  return this.transform((value) => (value === "" ? undefined : value));
});

const getUploadBillValidationSchema = () => {
  return Yup.object().shape({
    kElectricPreviousReading: Yup.string()
    .required("Field is required")
    .nullable(),
    kElectricCurrentReading: Yup.string()
    .required("Field is required")
    .nullable(),
    kElectricPerUnit: Yup.string()
    .required("Field is required")
    .nullable(),
    landlordMessage: Yup.string()
    .required("Field is required")
    .nullable(),
   
  });
};
export const UploadBillValidation = getUploadBillValidationSchema;
export default UploadBillValidation;

