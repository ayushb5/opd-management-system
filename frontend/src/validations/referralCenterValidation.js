import * as Yup from "yup";

export const referralCenterValidationSchema = () =>
  Yup.object({
    doctorId: Yup.string().required("Doctor is required"),
    name: Yup.string().required("Name is required"),
    type: Yup.string().required("Type is required"),
    contactInfo: Yup.string().required("Contact Info is required"),
    address: Yup.string().required("Address is required"),
  });
