import * as Yup from "yup";

export const visitPathologyTestValidationSchema = Yup.object({
  testMasterId: Yup.number().required("Test is required"),
  result: Yup.string().required("Result is required"),
  remarks: Yup.string(),
  reportFile: Yup.string(),
});
