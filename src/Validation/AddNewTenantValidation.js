import * as Yup from "yup";
Yup.addMethod(Yup.string, "stripEmptyString", function () {
  return this.transform((value) => (value === "" ? undefined : value));
});

const getAddNewTenantValidationSchema = () => {
  return Yup.object().shape({
    email: Yup.string()
    .required("Field is required")
    .nullable()
    .email("Email is not valid"),
  });
};
export const AddNewTenantValidation = getAddNewTenantValidationSchema;
export default AddNewTenantValidation;

