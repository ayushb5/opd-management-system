import * as Yup from "yup";

export const referralValidationSchema = () =>
  Yup.object({
    referralCenterId: Yup.string().required("Referral center is required"),

    noteType: Yup.string().required("Note type is required"),

    reason: Yup.string().trim().required("Reason is required"),

    details: Yup.string().trim().nullable(),
  });
