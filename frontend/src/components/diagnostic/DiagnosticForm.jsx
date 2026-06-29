import { useFormik } from "formik"
import {
    diagnosticValidationSchema
} from "../../validations/diagnosticValidation"
import { useEffect, useState } from "react"
import { getAllDoctors } from "../../services/doctorService"
import { getAllVisits } from "../../services/visitService"

function DiagnosticForm({ initialValues, onSubmit, isEdit = false }) {
    const formik = useFormik({
        initialValues,
        validationSchema: diagnosticValidationSchema,
        onSubmit,
        enableReinitialize: true
    })

    const [doctors, setDoctors] = useState([]);
    const [visits, setVisits] = useState([]);

    useEffect(() => {
        fetchDoctors();
        fetchVisits();
    }, []);

    const fetchDoctors = async () => {
        try {
            const data = await getAllDoctors();
            setDoctors(data);
        } catch (error) {
            console.error(error);
        }
    }

    const fetchVisits = async () => {
        try {
            const data = await getAllVisits();
            setVisits(data);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <form onSubmit={formik.handleSubmit} className="mt-4">
            <div className="row g-3">
                <div className="col-lg-6">
                    <label htmlFor="visitId" className="form-label">
                        Select Visit <span className="text-danger">*</span>
                    </label>
                    <select name="visitId" id="visitId" value={formik.values.visitId} onChange={formik.handleChange} onBlur={formik.handleBlur} className="form-select">
                        <option value="">Select Visit</option>
                        {visits.map((visit) => (
                            <option key={visit.id} value={visit.id}>
                                {visit.patient?.patientName} | {visit.visitDate} | {visit.doctor?.name}
                            </option>
                        ))}
                    </select>
                    {formik.touched.visitId && formik.errors.visitId && (
                        <div className="text-danger">{formik.errors.visitId}</div>
                    )}
                </div>
            </div>

            <div className="row g-3 mt-1">
                <div className="col-lg-6">
                    <label htmlFor="doctorId" className="form-label">
                        Select Doctor <span className="text-danger">*</span>
                    </label>
                    <select name="doctorId" id="doctorId" value={formik.values.doctorId} onChange={formik.handleChange} onBlur={formik.handleBlur} className="form-select border-black">
                        <option value="">Select Doctor</option>
                        {doctors.map((doctor) => (
                            <option key={doctor.id} value={doctor.id}>{doctor.name}</option>
                        ))}
                    </select>
                    {formik.touched.doctorId && formik.errors.doctorId && (
                        <div className="text-danger">
                            {formik.errors.doctorId}
                        </div>
                    )}
                </div>
            </div>

            <div className="row g-3 mt-1">
                <div className="col-lg-6">
                    <label htmlFor="name" className="form-label">
                        Diagnostic Name <span className="text-danger">*</span>
                    </label>
                    <input type="text" id="name" name="name" value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} className="form-control border-black" />
                    {formik.touched.name && formik.errors.name && (
                        <div className="text-danger">{formik.errors.name}</div>
                    )}
                </div>
            </div>

            <div className="text-center mt-5">
                <button
                    type="submit"
                    className="btn btn-primary px-4"
                    disabled={formik.isSubmitting}
                >
                    {isEdit ? "Update Diagnostic" : "Add Diagnostic"}
                </button>
            </div>
        </form>
    )
}

export default DiagnosticForm