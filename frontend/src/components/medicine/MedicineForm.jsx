import { useFormik } from "formik"
import { useEffect, useState } from "react"
import { medicineValidationSchema } from "../../validations/medicineValidation"
import { getDoctors } from "../../services/doctorService"

function MedicineForm({ initialValues, onSubmit, isEdit = false }) {
    const formik = useFormik({
        initialValues,
        validationSchema: medicineValidationSchema(),
        onSubmit,
        enableReinitialize: true
    })

    const [doctors, setDoctors] = useState([]);

    useEffect(() => {
        fetchDoctors();
    }, []);

    const fetchDoctors = async () => {
        try {
            const data = await getDoctors();
            setDoctors(data);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <form onSubmit={formik.handleSubmit} className="mt-4">
            <div className="row g-3">
                <div className="col-lg-6">
                    <label htmlFor="doctorId" className="form-label">
                        Doctor <span className="text-danger">*</span>
                    </label>
                    <select name="doctorId" value={formik.values.doctorId} onChange={formik.handleChange} onBlur={formik.handleBlur} className="form-select border-black">
                        <option value="">Select Doctor</option>
                        {doctors.map((doctor) => (
                            <option key={doctor.id} value={doctor.id}>
                                {doctor.name}
                            </option>
                        ))}
                    </select>
                    {formik.touched.doctorId && formik.errors.doctorId && (
                        <div className="text-danger">{formik.errors.doctorId}</div>
                    )}
                </div>
            </div>

            <div className="row g-3 mt-1">
                <div className="col-lg-6">
                    <label htmlFor="medicineName" className="form-label">
                        Medicine Name <span className="text-danger">*</span>
                    </label>
                    <input type="text" id="medicineName" name="medicineName" value={formik.values.medicineName} onChange={formik.handleChange} onBlur={formik.handleBlur} className="form-control border-black" />
                    {formik.touched.medicineName && formik.errors.medicineName && (
                        <div className="text-danger">{formik.errors.medicineName}</div>
                    )}
                </div>
                <div className="col-lg-6">
                    <label htmlFor="type" className="form-label">
                        Type <span className="text-danger">*</span>
                    </label>
                    <input type="text" id="type" name="type" value={formik.values.type} onChange={formik.handleChange} onBlur={formik.handleBlur} className="form-control border-black" />
                    {formik.touched.type && formik.errors.type && (
                        <div className="text-danger">{formik.errors.type}</div>
                    )}
                </div>
            </div>

            <div className="text-center mt-5">
                <button
                    type="submit"
                    className="btn btn-primary px-4"
                    disabled={formik.isSubmitting}
                >
                    {isEdit ? "Update Medicine" : "Add Medicine"}
                </button>
            </div>
        </form>
    )
}

export default MedicineForm