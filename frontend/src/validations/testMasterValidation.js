import * as Yup from "yup";

export const testMasterValidationSchema = () =>
  Yup.object({
    doctorId: Yup.string().required("Doctor is required"),
    testName: Yup.string().required("Test Name is required"),
    normalRange: Yup.string().required("Normal Range is required"),
    unit: Yup.string().required("Unit is required"),
  });
