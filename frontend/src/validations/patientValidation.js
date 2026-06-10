import * as Yup from "yup";

export const patientValidationSchema = () =>
  Yup.object({
    patientName: Yup.string().required("Patient name is required"),
    age: Yup.number()
      .typeError("Age must be a number")
      .min(0, "Age cannot be negative")
      .required("Age is required"),
    gender: Yup.string().required("Gender is required"),
    mobileNo: Yup.string()
      .matches(/^[0-9]{10}$/, "Enter valid mobile number")
      .required("Mobile is required"),
    address: Yup.string().required("Address is required"),
    bloodGroup: Yup.string().required("Blood group is required"),
    height: Yup.number()
      .typeError("Height must be a number")
      .required("Height is required")
      .positive("Height must be positive"),
    smoking: Yup.string().required("Smoking is required"),
    alcohol: Yup.string().required("Alcohol is required"),
    tobacco: Yup.string().required("Tobacco is required"),
    doctorId: Yup.number()
      .typeError("Doctor is required")
      .required("Doctor is required"),
  });
