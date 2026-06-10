import * as Yup from "yup";

export const visitValidationSchema = () =>
  Yup.object({
    doctorId: Yup.string().required("Doctor is required"),

    patientId: Yup.string().required("Patient is required"),

    visitDate: Yup.date().required("Visit date is required"),

    complaints: Yup.string().required("Complaints are required"),

    diagnosis: Yup.string().required("Diagnosis is required"),

    advice: Yup.string().required("Advice is required"),

    bp: Yup.string(),

    pulse: Yup.number()
      .nullable()
      .transform((value, originalValue) =>
        originalValue === "" ? null : value,
      ),

    saturation: Yup.number()
      .nullable()
      .transform((value, originalValue) =>
        originalValue === "" ? null : value,
      ),

    temperature: Yup.number()
      .nullable()
      .transform((value, originalValue) =>
        originalValue === "" ? null : value,
      ),

    respirationRate: Yup.number()
      .nullable()
      .transform((value, originalValue) =>
        originalValue === "" ? null : value,
      ),

    weight: Yup.number()
      .nullable()
      .transform((value, originalValue) =>
        originalValue === "" ? null : value,
      )
      .required("Weight is required"),

    fastingSugar: Yup.number()
      .nullable()
      .transform((value, originalValue) =>
        originalValue === "" ? null : value,
      ),

    ppSugar: Yup.number()
      .nullable()
      .transform((value, originalValue) =>
        originalValue === "" ? null : value,
      ),

    randomSugar: Yup.number()
      .nullable()
      .transform((value, originalValue) =>
        originalValue === "" ? null : value,
      ),

    hb: Yup.number()
      .nullable()
      .transform((value, originalValue) =>
        originalValue === "" ? null : value,
      ),

    ecg: Yup.string(),

    ureaCreatinine: Yup.string(),

    edema: Yup.string(),

    pallor: Yup.string(),

    jaundice: Yup.string(),

    cvs: Yup.string(),

    rs: Yup.string(),

    pa: Yup.string(),

    cns: Yup.string(),

    pastHistory: Yup.string(),

    currentMedication: Yup.string(),

    additionalNotes: Yup.string(),

    followupDate: Yup.date()
      .nullable()
      .transform((value, originalValue) =>
        originalValue === "" ? null : value,
      )
      .required("Follow up date is required"),
  });
