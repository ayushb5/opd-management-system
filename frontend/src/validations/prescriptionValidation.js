import * as Yup from "yup";

export const prescriptionValidationSchema = Yup.object({
  medicineId: Yup.number().required("Medicine is required"),

  doseQuantity: Yup.string().required("Dose quantity is required"),

  doseUnit: Yup.string().required("Dose unit is required"),

  morningDose: Yup.number().min(0).required("Morning dose is required"),

  afternoonDose: Yup.number().min(0).required("Afternoon dose is required"),

  eveningDose: Yup.number().min(0).required("Evening dose is required"),

  durationDays: Yup.number()
    .integer("Must be a whole number")
    .min(1, "Duration must be at least 1 day")
    .required("Duration is required"),

  instructions: Yup.string().max(500),

  quantityNote: Yup.string().max(255),
}).test(
  "dose-required",
  "At least one dose (Morning/Afternoon/Evening) must be greater than 0",
  (value) => {
    return (
      (value?.morningDose || 0) +
        (value?.afternoonDose || 0) +
        (value?.eveningDose || 0) >
      0
    );
  },
);
