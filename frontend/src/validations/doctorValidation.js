import * as Yup from "yup";

export const doctorValidationSchema = (isEdit) =>
  Yup.object({
    name: Yup.string().required("Doctor name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    mobileno: Yup.string()
      .matches(/^[0-9]{10}$/, "Enter valid mobile number")
      .required("Mobile is required"),
    specialization: Yup.string().required("Specialization is required"),
    clinic_name: Yup.string().required("Clinic name is required"),
    address: Yup.string().required("Address is required"),

    ...(isEdit
      ? {}
      : {
          password: Yup.string()
            .min(6, "Password must be at least 6 characters")
            .required("Password is required"),
        }),
  });
