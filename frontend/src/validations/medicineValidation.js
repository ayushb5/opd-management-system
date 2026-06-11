import * as Yup from "yup";

export const medicineValidationSchema = () =>
  Yup.object({
    doctorId: Yup.string().required("Doctor is required"),
    medicineName: Yup.string().required("Medicine name is required"),
    type: Yup.string().required("Type is required"),
  });
