import { useFormik } from "formik"
import { useEffect, useState } from "react"
import { referralCenterValidationSchema } from "../../validations/referralCenterValidation"
import { getAllDoctors } from "../../services/doctorService"

function ReferralCenterForm({ initialValues, onSubmit, isEdit = false }) {
    const formik = useFormik({
        initialValues,
        validationSchema: referralCenterValidationSchema(),
        onSubmit,
        enableReinitialize: true
    })

    const [doctors, setDoctors] = useState([]);

    useEffect(() => {
        fetchDoctors();
    }, []);

    const fetchDoctors = async () => {
        try {
            const data = await getAllDoctors();
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
                            <option key={doctor.id} value={doctor.id}>
                                {doctor.name}
                            </option>
                        ))}
                    </select>
                    {formik.touched.doctorId && formik.errors.doctorId && (
                        <div className="text-danger">{formik.errors.doctorId}</div>
                    )}
                </div>
                <div className="col-lg-6">
                    <label htmlFor="name" className="form-label">
                        Referral Center Name <span className="text-danger">*</span>
                    </label>
                    <input type="text" id="name" name="name" value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} className="form-control border-black" />
                    {formik.touched.name && formik.errors.name && (
                        <div className="text-danger">{formik.errors.name}</div>
                    )}
                </div>
            </div>

            <div className="row g-3 mt-1">
                <div className="col-lg-6">
                    <label htmlFor="type" className="form-label">
                        Type <span className="text-danger">*</span>
                    </label>
                    <select name="type" id="type" value={formik.values.type} onChange={formik.handleChange} onBlur={formik.handleBlur} className="form-select border-black">
                        <option value="">Select Type</option>
                        <option value="DOCTOR">DOCTOR</option>
                        <option value="LAB">LAB</option>
                        <option value="HOSPITAL">HOSPITAL</option>
                        <option value="PHARMACY">PHARMACY</option>
                    </select>
                    {formik.touched.type && formik.errors.type && (
                        <div className="text-danger">{formik.errors.type}</div>
                    )}
                </div>
                <div className="col-lg-6">
                    <label htmlFor="contactInfo" className="form-label">
                        Contact Information <span className="text-danger">*</span>
                    </label>
                    <input type="text" name="contactInfo" id="contactInfo" value={formik.values.contactInfo} onChange={formik.handleChange} onBlur={formik.handleBlur} className="form-control border-black" />
                    {formik.touched.contactInfo && formik.errors.contactInfo && (
                        <div className="text-danger">{formik.errors.contactInfo}</div>
                    )}
                </div>
            </div>

            <div className="row g-3 mt-1">
                <div className="col-lg-12">
                    <label htmlFor="address">
                        Address <span className="text-danger">*</span>
                    </label>
                    <textarea name="address" id="address" rows={3} value={formik.values.address} onChange={formik.handleChange} onBlur={formik.handleBlur} className="form-control border-black" />
                    {formik.touched.address && formik.errors.address && (
                        <div className="text-danger">{formik.errors.address}</div>
                    )}
                </div>
            </div>
            <div className="text-center mt-5">
                <button
                    type="submit"
                    className="btn btn-primary px-4"
                    disabled={formik.isSubmitting}
                >
                    {isEdit ? "Update Referral Center" : "Add Referral Center"}
                </button>
            </div>
        </form>
    )
}

export default ReferralCenterForm