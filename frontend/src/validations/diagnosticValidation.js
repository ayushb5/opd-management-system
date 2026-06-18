import * as Yup from "yup";

export const diagnosticValidationSchema = Yup.object({
  visitId: Yup.string().required("Visit is required"),
  doctorId: Yup.string().required("Doctor is required"),
  name: Yup.string().required("Diagnostic name is required"),
});
