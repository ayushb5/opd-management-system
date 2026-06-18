import { useFormik } from "formik"
import { prescriptionValidationSchema } from "../../validations/prescriptionValidation"
import { useEffect, useState } from "react";
import { getMedicines } from "../../services/medicineService"

function PrescriptionForm({ initialValues, onSubmit, isEdit = false }) {
    const formik = useFormik({
        initialValues,
        validationSchema: prescriptionValidationSchema,
        onSubmit,
        enableReinitialize: true
    })

    const [medicines, setMedicines] = useState([]);

    useEffect(() => {
        fetchMedicines();
    }, []);

    const fetchMedicines = async () => {
        try {
            const medicineData = await getMedicines();
            setMedicines(medicineData);
        } catch (error) {
            console.error(error);
        }
    };

    const totalQuantity =
        (
            Number(formik.values.morningDose || 0) +
            Number(formik.values.afternoonDose || 0) +
            Number(formik.values.eveningDose || 0)
        ) *
        Number(formik.values.durationDays || 0);

    return (
        <form onSubmit={formik.handleSubmit} className="mt-4">
            <div className="row g-3">
                <div className="col-lg-6">
                    <label htmlFor="medicineId" className="form-label">
                        Medicine <span className="text-danger">*</span>
                    </label>
                    <select
                        name="medicineId"
                        value={formik.values.medicineId}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="form-select border-black"
                    >
                        <option value="">Select Medicine</option>

                        {medicines.map((medicine) => (
                            <option key={medicine.id} value={medicine.id}>
                                {medicine.medicineName}
                            </option>
                        ))}
                    </select>

                    {formik.touched.medicineId && formik.errors.medicineId && (
                        <div className="text-danger">{formik.errors.medicineId}</div>
                    )}
                </div>
                <div className="col-lg-6">
                    <label htmlFor="doseQuantity" className="form-label">
                        Dose Quantity <span className="text-danger">*</span>
                    </label>

                    <input
                        type="number"
                        name="doseQuantity"
                        className="form-control border-black"
                        value={formik.values.doseQuantity}
                        onChange={formik.handleChange}
                        min={1}
                    />

                    {formik.touched.doseQuantity && formik.errors.doseQuantity && (
                        <div className="text-danger">{formik.errors.doseQuantity}</div>
                    )}
                </div>
            </div>

            <div className="row g-3 mt-1">
                <div className="col-lg-6">
                    <label htmlFor="doseUnit" className="form-label">
                        Dose Unit <span className="text-danger">*</span>
                    </label>

                    <select
                        name="doseUnit"
                        className="form-select border-black"
                        value={formik.values.doseUnit}
                        onChange={formik.handleChange}
                    >
                        <option value="Tablet">Tablet</option>
                        <option value="Capsule">Capsule</option>
                        <option value="Syrup">Syrup</option>
                        <option value="Injection">Injection</option>
                    </select>

                    {formik.touched.doseUnit && formik.errors.doseUnit && (
                        <div className="text-danger">{formik.errors.doseUnit}</div>
                    )}
                </div>
                <div className="col-lg-6">
                    <label htmlFor="durationDays" className="form-label">
                        Duration Days <span className="text-danger">*</span>
                    </label>

                    <input
                        type="number"
                        name="durationDays"
                        className="form-control border-black"
                        value={formik.values.durationDays}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        min={1}
                    />
                    {formik.touched.durationDays && formik.errors.durationDays && (
                        <div className="text-danger">{formik.errors.durationDays}</div>
                    )}
                </div>
            </div>
            <div className="row g-3 mt-1">
                <div className="col-lg-4">
                    <label htmlFor="morningDose" className="form-label">
                        Morning
                    </label>

                    <input
                        type="number"
                        name="morningDose"
                        className="form-control border-black"
                        value={formik.values.morningDose}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        min={0}
                    />

                    {formik.touched.morningDose && formik.errors.morningDose && (
                        <div className="text-danger">{formik.errors.morningDose}</div>
                    )}
                </div>
                <div className="col-lg-4">
                    <label htmlFor="afternoonDose" className="form-label">
                        Afternoon
                    </label>

                    <input
                        type="number"
                        name="afternoonDose"
                        className="form-control border-black"
                        value={formik.values.afternoonDose}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        min={0}
                    />
                    {formik.touched.afternoonDose && formik.errors.afternoonDose && (
                        <div className="text-danger">{formik.errors.afternoonDose}</div>
                    )}
                </div>
                <div className="col-lg-4">
                    <label htmlFor="eveningDose" className="form-label">
                        Evening
                    </label>

                    <input
                        type="number"
                        name="eveningDose"
                        className="form-control border-black"
                        value={formik.values.eveningDose}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        min={0}
                    />
                    {formik.touched.eveningDose && formik.errors.eveningDose && (
                        <div className="text-danger">{formik.errors.eveningDose}</div>
                    )}
                </div>
            </div>

            <div className="mt-3">
                <label htmlFor="instructions" className="form-label">
                    Instructions
                </label>

                <textarea
                    rows="3"
                    name="instructions"
                    className="form-control border-black"
                    value={formik.values.instructions}
                    onChange={formik.handleChange}
                />
                {formik.touched.instructions && formik.errors.instructions && (
                    <div className="text-danger">{formik.errors.instructions}</div>
                )}
            </div>

            <div className="mt-3">
                <label htmlFor="quantityNote" className="form-label">
                    Quantity Note
                </label>

                <textarea
                    rows="2"
                    name="quantityNote"
                    className="form-control border-black"
                    value={formik.values.quantityNote}
                    onChange={formik.handleChange}
                />

                {formik.touched.quantityNote && formik.errors.quantityNote && (
                    <div className="text-danger">{formik.errors.quantityNote}</div>
                )}
            </div>

            <div className="alert alert-info mt-4">

                <strong>Dosage:</strong>

                {" "}
                {formik.values.doseQuantity}
                {" "}
                {formik.values.doseUnit}
                (
                {formik.values.morningDose}
                -
                {formik.values.afternoonDose}
                -
                {formik.values.eveningDose}
                )

                <br />

                <strong>Total Quantity:</strong>

                {" "}
                {totalQuantity}
            </div>

            <div className="text-center mt-5">
                <button
                    type="submit"
                    className="btn btn-primary px-4"
                    disabled={formik.isSubmitting}
                >
                    {isEdit ? "Update Prescription" : "Add Prescription"}
                </button>
            </div>
        </form>
    )
}

export default PrescriptionForm