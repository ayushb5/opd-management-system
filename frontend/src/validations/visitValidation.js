import * as Yup from "yup";

export const receptionistValidationSchema = (isEdit) =>
  Yup.object({
    name: Yup.string().required("Doctor name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    mobileno: Yup.string()
      .matches(/^[0-9]{10}$/, "Enter valid mobile number")
      .required("Mobile is required"),
    doctorId: Yup.string().required("Doctor is required"),

    ...(isEdit
      ? {}
      : {
          password: Yup.string()
            .min(6, "Password must be at least 6 characters")
            .required("Password is required"),
        }),
  });
