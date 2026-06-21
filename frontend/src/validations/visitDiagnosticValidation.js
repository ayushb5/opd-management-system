import * as Yup from "yup";

export const visitDiagnosticValidationSchema = Yup.object({
  name: Yup.string().required("Diagnostic name is required"),
});
