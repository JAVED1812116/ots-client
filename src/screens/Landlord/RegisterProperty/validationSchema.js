import * as Yup from 'yup';

export const landlordDetailSchema = Yup.object().shape({
  ownerName: Yup.string().min(2).matches(/^[A-Za-z\s]+$/, 'Owner Name must not contain numbers').required('Owner Name is required'),
  fatherName: Yup.string().min(2).matches(/^[A-Za-z\s]+$/, 'Father Name must not contain numbers').required('Father Name is required'),
   // ✅ CNIC Validation (XXXXX-XXXXXXX-X)
   cnic: Yup.string()
   .matches(/^\d{5}-\d{7}-\d{1}$/, 'CNIC must be in the format XXXXX-XXXXXXX-X')
   .required('CNIC is required'),

 // ✅ Contact Number Validation (9 digits only, because 03 fix hai label me)
 contactNumber: Yup.string()
   .matches(/^\d{9}$/, 'Contact Number must be exactly 11 digits')
   .required('Contact Number is required'),
  alternateNumber: Yup.string(),
  permenantAddress: Yup.string().required('Permanent Address is required'),
  postalAddress: Yup.string().required('Postal Address is required'),
  email: Yup.string().email('Invalid email format').required('Email is required'),
});


export const landlordPropertySchema = Yup.object().shape({
  propertyAddress: Yup.string().required('Property Address is required'),
totalFloor: Yup.number()
  .transform((val, original) => (original === "" ? undefined : val))
  .typeError("Total Floor must be a number")
  .integer("Total Floor must be an integer")
  .min(1, "Total Floor cannot be 0 and must be at least 1")
  .required("Please enter a valid Total Floor"),
totalFlat: Yup.number()
  .transform((val, original) => (original === "" ? undefined : val))
  .typeError("Total Flat must be a number")
  .integer("Total Flat must be an integer")
  .min(1, "Total Flat cannot be 0 and must be at least 1")
  .required("Please enter a valid Total Flat"),
  flats: Yup.array().of(
    Yup.object().shape({
      flatName: Yup.string().required("Flat name is required"),
      flatNumber: Yup.string().required("Flat number is required"),
      flatFloor: Yup.string().required("Flat Floor is required"),
      flatRooms: Yup.string().required("Rooms are required"),
      flatToilet: Yup.string().required("Toilet is required"),
      flatKitchen: Yup.string().required("Kitchen is required"),
      flatRent: Yup.string().required("Rent is required"),
      flatAdvance: Yup.string().required("Advance is required"),
      flatMaintananceCharges: Yup.string().required("Maintainance is required"),
      flatTrashCharges: Yup.string().required("Trash charges are required"),
      flatSecurityCharges: Yup.string().required("Security charges are required"),
      is_rent: Yup.string().required("Status are required"),
    })
  ),
  // totalFlat: Yup.string()
  // .min(1, 'Total Flat must be at least 1').required('Please enter a valid Total Flat'),
});