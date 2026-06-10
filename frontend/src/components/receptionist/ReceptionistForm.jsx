import { useFormik } from "formik"
import { receptionistValidationSchema } from "../../validations/receptionistValidation"
import { useEffect, useState } from "react"
import { getDoctors } from "../../services/doctorService"

function ReceptionistForm({ initialValues, onSubmit, isEdit = false }) {
    const formik = useFormik({
        initialValues,
        validationSchema: receptionistValidationSchema(isEdit),
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
                    <label htmlFor="name" className="form-label">
                        Receptionist Name <span className="text-danger">*</span>
                    </label>
                    <input type="text" id="name" name="name" value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} className="form-control border-black" />
                    {formik.touched.name && formik.errors.name && (
                        <div className="text-danger">{formik.errors.name}</div>
                    )}
                </div>
                <div className="col-lg-6">
                    <label htmlFor="email" className="form-label">
                        Email <span className="text-danger">*</span>
                    </label>
                    <input type="email" id="email" name="email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} className="form-control border-black" />
                    {formik.touched.email && formik.errors.email && (
                        <div className="text-danger">{formik.errors.email}</div>
                    )}
                </div>
            </div>

            <div className="row g-3 mt-1">
                {!isEdit && (
                    <div className="col-lg-6">
                        <label htmlFor="password" className="form-label">
                            Password <span className="text-danger">*</span>
                        </label>
                        <input type="password" id="password" name="password" value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} className="form-control border-black" />
                        {formik.touched.password && formik.errors.password && (
                            <div className="text-danger">{formik.errors.password}</div>
                        )}
                    </div>
                )}
                {isEdit && (
                    <div className="col-lg-6">
                        <label htmlFor="status" className="form-label">Status</label>
                        <select name="status" id="status" value={formik.values.status} onChange={formik.handleChange} onBlur={formik.handleBlur} className="form-select border-black">
                            <option value="ACTIVE">ACTIVE</option>
                            <option value="INACTIVE">INACTIVE</option>
                        </select>
                    </div>
                )}
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


            <div className="text-center mt-5">
                <button
                    type="submit"
                    className="btn btn-primary px-4"
                    disabled={formik.isSubmitting}
                >
                    {isEdit ? "Update Receptionist" : "Add Receptionist"}
                </button>
            </div>
        </form>
    )
}

export default ReceptionistForm