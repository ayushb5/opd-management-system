import * as Yup from "yup";

export const billValidationSchema = Yup.object({
  visitId: Yup.number().required("Visit is required"),

  consultationFee: Yup.number()
    .typeError("Consultation Fee must be a number")
    .required("Consultation Fee is required")
    .min(0, "Consultation Fee cannot be negative"),

  totalAmount: Yup.number()
    .typeError("Total Amount must be a number")
    .required("Total Amount is required")
    .min(0, "Total Amount cannot be negative"),

  concession: Yup.number()
    .typeError("Concession must be a number")
    .required("Concession is required")
    .min(0, "Concession cannot be negative"),

  paidAmount: Yup.number()
    .typeError("Paid Amount must be a number")
    .required("Paid Amount is required")
    .min(0, "Paid Amount cannot be negative"),

  paymentMode: Yup.string().required("Payment Mode is required"),

  paymentStatus: Yup.string().required("Payment Status is required"),
});
