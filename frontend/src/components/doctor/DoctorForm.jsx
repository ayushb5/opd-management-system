import { NavLink } from "react-router-dom"
import { useFormik } from "formik"
import * as Yup from "yup"

function DoctorForm({ initialValues, onSubmit, title, buttonText }) {

    const formik = useFormik({
        initialValues,
        enableReinitialize: true,
        validationSchema: Yup.object({
            name: Yup.string()
                .required("Name is required"),

            email: Yup.string()
                .email("Invalid email")
                .required("Email is required"),

            specialization: Yup.string()
                .required("Specialization is required"),

            clinic_name: Yup.string()
                .required("Clinic name is required"),

            address: Yup.string()
                .required("Address is required"),

            mobileno: Yup.string()
                .matches(/^[0-9]{10}$/, "Mobile number must be 10 digits")
                .required("Mobile number is required"),

            status: Yup.string()
                .required("Status is required")
        }),
        onSubmit
    });

    return (
        <div className="container">
            <form onSubmit={formik.handleSubmit}>
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h1>{title}</h1>
                    <NavLink to={"/doctors"} className={"btn btn-primary"}>Go Back</NavLink>
                </div>
                <div className="row">
                    <div className="col-lg-6 mb-3">
                        <label htmlFor="name" className="form-label">
                            Name{" "}
                            <span className="text-danger">*</span>
                        </label>
                        <input type="text" name="name" id="name" value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} className="form-control border-black" />
                        {formik.touched.name && formik.errors.name && (
                            <span className="text-danger">{formik.errors.name}</span>
                        )}
                    </div>

                    <div className="col-lg-6 mb-3">
                        <label htmlFor="email" className="form-label">Email{" "}
                            <span className="text-danger">*</span>
                        </label>
                        <input type="email" name="email" id="email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} className="form-control border-black" />
                        {formik.touched.email && formik.errors.email && (
                            <span className="text-danger">{formik.errors.email}</span>
                        )}
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-6 mb-3">
                        <label htmlFor="specialization" className="form-label">Specialization{" "}
                            <span className="text-danger">*</span>
                        </label>
                        <input type="text" name="specialization" id="specialization" value={formik.values.specialization} onChange={formik.handleChange} onBlur={formik.handleBlur} className="form-control border-black" />
                        {formik.touched.specialization && formik.errors.specialization && (
                            <span className="text-danger">{formik.errors.specialization}</span>
                        )}
                    </div>
                    <div className="col-lg-6 mb-3">
                        <label htmlFor="clinic_name" className="form-label">Clinic Name{" "}
                            <span className="text-danger">*</span>
                        </label>
                        <input type="text" name="clinic_name" id="clinic_name" value={formik.values.clinic_name} onChange={formik.handleChange} onBlur={formik.handleBlur} className="form-control border-black" />
                        {formik.touched.clinic_name && formik.errors.clinic_name && (
                            <span className="text-danger">{formik.errors.clinic_name}</span>
                        )}
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-lg-12">
                        <label htmlFor="address" className="form-label">Address{" "}
                            <span className="text-danger">*</span>
                        </label>
                        <textarea name="address" id="address" value={formik.values.address} onChange={formik.handleChange} onBlur={formik.handleBlur} rows={3} className="form-control border-black" placeholder="Enter full address"></textarea>
                        {formik.touched.address && formik.errors.address && (
                            <span className="text-danger">{formik.errors.address}</span>
                        )}
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-6 mb-3">
                        <label htmlFor="mobileno" className="form-label">Mobile Number{" "}
                            <span className="text-danger">*</span>
                        </label>
                        <input type="tel" name="mobileno" id="mobileno" value={formik.values.mobileno} onChange={formik.handleChange} onBlur={formik.handleBlur} className="form-control border-black" />
                        {formik.touched.mobileno && formik.errors.mobileno && (
                            <span className="text-danger">{formik.errors.mobileno}</span>
                        )}
                    </div>
                    <div className="col-lg-6 mb-3">
                        <label htmlFor="status" className="form-label">Status{" "}
                            <span className="text-danger">*</span>
                        </label>
                        <select name="status" id="status" value={formik.values.status} onChange={formik.handleChange} onBlur={formik.handleBlur} className="form-select border-black">
                            <option value="TRIAL">Trial</option>
                            <option value="ACTIVE">Active</option>
                            <option value="EXPIRED">Expired</option>
                            <option value="CANCEL">Cancel</option>
                        </select>
                    </div>
                </div>

                <div className="mt-3 text-center">
                    <button type="submit" className="btn btn-success px-4">{buttonText}</button>
                </div>
            </form>
        </div>
    )
}

export default DoctorForm