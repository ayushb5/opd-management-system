import { useFormik } from "formik"
import { patientValidationSchema } from "../../validations/patientValidation"
import { useEffect, useState } from "react"
import { getDoctors } from "../../services/doctorService"

function PatientForm({ initialValues, onSubmit, isEdit = false }) {
    const formik = useFormik({
        initialValues,
        validationSchema: patientValidationSchema(),
        onSubmit,
        enableReinitialize: true
    })

    const [doctors, setDoctors] = useState([]);
    useEffect(() => {
        fetchDoctors();
    }, [])

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
                <div className="col-lg-6">
                    <label htmlFor="patientName" className="form-label">
                        Patient Name <span className="text-danger">*</span>
                    </label>
                    <input type="text" id="patientName" name="patientName" value={formik.values.patientName} onChange={formik.handleChange} onBlur={formik.handleBlur} className="form-control border-black" />
                    {formik.touched.patientName && formik.errors.patientName && (
                        <div className="text-danger">{formik.errors.patientName}</div>
                    )}
                </div>
            </div>

            <div className="row g-3 mt-1">
                <div className="col-lg-6">
                    <label htmlFor="age" className="form-label">
                        Age <span className="text-danger">*</span>
                    </label>
                    <input type="number" id="age" name="age" value={formik.values.age} onChange={formik.handleChange} onBlur={formik.handleBlur} className="form-control border-black" />
                    {formik.touched.age && formik.errors.age && (
                        <div className="text-danger">{formik.errors.age}</div>
                    )}
                </div>
                <div className="col-lg-6">
                    <label htmlFor="gender" className="form-label">
                        Gender <span className="text-danger">*</span>
                    </label>
                    <select name="gender" id="gender" value={formik.values.gender} onChange={formik.handleChange} onBlur={formik.handleBlur} className="form-select border-black">
                        <option value="">Select Gender</option>
                        <option value="MALE">MALE</option>
                        <option value="FEMALE">FEMALE</option>
                        <option value="OTHER">OTHER</option>
                    </select>
                    {formik.touched.gender && formik.errors.gender && (
                        <div className="text-danger">{formik.errors.gender}</div>
                    )}
                </div>
            </div>

            <div className="row g-3 mt-1">
                <div className="col-lg-6">
                    <label htmlFor="mobileNo" className="form-label">
                        Mobile Number <span className="text-danger">*</span>
                    </label>
                    <input type="tel" id="mobileNo" name="mobileNo" value={formik.values.mobileNo} onChange={formik.handleChange} onBlur={formik.handleBlur} className="form-control border-black" />
                    {formik.touched.mobileNo && formik.errors.mobileNo && (
                        <div className="text-danger">{formik.errors.mobileNo}</div>
                    )}
                </div>
            </div>

            <div className="row g-3 mt-1">
                <label htmlFor="address" className="form-label">
                    Address <span className="text-danger">*</span>
                </label>
                <textarea name="address" id="address" value={formik.values.address} onChange={formik.handleChange} onBlur={formik.handleBlur} rows={3} className="form-control border-black mt-0" />
                {formik.touched.address && formik.errors.address && (
                    <div className="text-danger mt-0">{formik.errors.address}</div>
                )}
            </div>

            <div className="row g-3 mt-1">
                <div className="col-lg-6">
                    <label htmlFor="bloodGroup" className="form-label">
                        Blood Group <span className="text-danger">*</span>
                    </label>
                    <select name="bloodGroup" id="bloodGroup" value={formik.values.bloodGroup} onChange={formik.handleChange} onBlur={formik.handleBlur} className="form-select border-black">
                        <option value="">Select Blood Group</option>
                        <option value="A+">A+</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B-">B-</option>
                        <option value="AB+">AB+</option>
                        <option value="AB-">AB-</option>
                        <option value="O+">O+</option>
                        <option value="O-">O-</option>
                    </select>
                    {formik.touched.bloodGroup && formik.errors.bloodGroup && (
                        <div className="text-danger">{formik.errors.bloodGroup}</div>
                    )}
                </div>
                <div className="col-lg-6">
                    <label htmlFor="height" className="form-label">
                        Height (cm) <span className="text-danger">*</span>
                    </label>
                    <input type="number" id="height" name="height" value={formik.values.height} onChange={formik.handleChange} onBlur={formik.handleBlur} className="form-control border-black" />
                    {formik.touched.height && formik.errors.height && (
                        <div className="text-danger">{formik.errors.height}</div>
                    )}
                </div>
            </div>

            <div className="row g-3 mt-1">
                <div className="col-lg-6">
                    <label htmlFor="smoking" className="form-label">
                        Smoking <span className="text-danger">*</span>
                    </label>
                    <select name="smoking" id="smoking" value={formik.values.smoking} onChange={formik.handleChange} onBlur={formik.handleBlur} className="form-control border-black">
                        <option value="">Select Smoking</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                    </select>
                    {formik.touched.smoking && formik.errors.smoking && (
                        <div className="text-danger">{formik.errors.smoking}</div>
                    )}
                </div>
                <div className="col-lg-6">
                    <label htmlFor="alcohol" className="form-label">
                        Alcohol <span className="text-danger">*</span>
                    </label>
                    <select name="alcohol" id="alcohol" value={formik.values.alcohol} onChange={formik.handleChange} onBlur={formik.handleBlur} className="form-control border-black">
                        <option value="">Select Alcohol</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                    </select>
                    {formik.touched.alcohol && formik.errors.alcohol && (
                        <div className="text-danger">{formik.errors.alcohol}</div>
                    )}
                </div>
            </div>

            <div className="row g-3 mt-1">
                <div className="row g-3 mt-1">
                    <div className="col-lg-6">
                        <label htmlFor="tobacco" className="form-label">
                            Tobacco <span className="text-danger">*</span>
                        </label>
                        <select name="tobacco" id="tobacco" value={formik.values.tobacco} onChange={formik.handleChange} onBlur={formik.handleBlur} className="form-control border-black">
                            <option value="">Select Tobacco</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </select>
                        {formik.touched.tobacco && formik.errors.tobacco && (
                            <div className="text-danger">{formik.errors.tobacco}</div>
                        )}
                    </div>
                </div>
            </div>

            <div className="text-center mt-5">
                <button
                    type="submit"
                    className="btn btn-primary px-4"
                    disabled={formik.isSubmitting}
                >
                    {isEdit ? "Update Patient" : "Add Patient"}
                </button>
            </div>
        </form>
    )
}

export default PatientForm