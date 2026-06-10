import { useFormik } from "formik"
import { doctorValidationSchema } from "../../validations/doctorValidation"

function DoctorForm({ initialValues, onSubmit, isEdit = false }) {
    const formik = useFormik({
        initialValues,
        validationSchema: doctorValidationSchema(isEdit),
        onSubmit,
        enableReinitialize: true
    })
    return (
        <form onSubmit={formik.handleSubmit} className="mt-4">
            <div className="row g-3">
                <div className="col-lg-6">
                    <label htmlFor="name" className="form-label">
                        Doctor Name <span className="text-danger">*</span>
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
                <div className="col-lg-6">
                    <label htmlFor="specialization" className="form-label">
                        Specialization <span className="text-danger">*</span>
                    </label>
                    <input type="text" id="specialization" name="specialization" value={formik.values.specialization} onChange={formik.handleChange} onBlur={formik.handleBlur} className="form-control border-black" />
                    {formik.touched.specialization && formik.errors.specialization && (
                        <div className="text-danger">{formik.errors.specialization}</div>
                    )}
                </div>
                <div className="col-lg-6">
                    <label htmlFor="clinicName" className="form-label">
                        Clinic Name <span className="text-danger">*</span>
                    </label>
                    <input type="text" id="clinicName" name="clinicName" value={formik.values.clinicName} onChange={formik.handleChange} onBlur={formik.handleBlur} className="form-control border-black" />
                    {formik.touched.clinicName && formik.errors.clinicName && (
                        <div className="text-danger">{formik.errors.clinicName}</div>
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
                            <option value="TRIAL">TRIAL</option>
                            <option value="ACTIVE">ACTIVE</option>
                            <option value="EXPIRED">EXPIRED</option>
                            <option value="CANCELLED">CANCELLED</option>
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
                <div className="col-12">
                    <label htmlFor="address" className="form-label">
                        Address <span className="text-danger">*</span>
                    </label>
                    <textarea
                        id="address"
                        name="address"
                        rows="3"
                        value={formik.values.address}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="form-control border-black"
                    />
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
                    {isEdit ? "Update Doctor" : "Add Doctor"}
                </button>
            </div>
        </form>
    )
}

export default DoctorForm