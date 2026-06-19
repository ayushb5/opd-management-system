import * as Yup from "yup";

export const pathologyTestValidationSchema = Yup.object({
  visitId: Yup.string().required("Visit is required"),

  testMasterId: Yup.string().required("Test is required"),

  result: Yup.string().required("Result is required"),

  remarks: Yup.string(),

  reportFile: Yup.string(),
});
