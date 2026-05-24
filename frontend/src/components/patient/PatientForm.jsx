import { useFormik } from "formik"
import { NavLink } from "react-router-dom"
import * as Yup from "yup"

function PatientForm({ doctors, initialValues, onSubmit, title, buttonText }) {
    const formik = useFormik({
        initialValues,
        enableReinitialize: true,
        validationSchema: Yup.object({
            doctorId: Yup.number()
                .required("Doctor is required"),

            patient_name: Yup.string()
                .required("Name is required"),

            age: Yup.number()
                .required("Age is required")
                .min(0, 'Age cannot be negative')
                .max(120, 'Please enter a valid age'),

            gender: Yup.string()
                .required("Gender is required"),

            mobileno: Yup.string()
                .matches(/^[0-9]{10}$/, "Mobile number must be 10 digits")
                .required("Mobile number is required"),

            address: Yup.string()
                .required("Address is required"),

            height: Yup.string()
                .required("Height is required")
        }),
        onSubmit
    })
    return (
        <>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h1>{title}</h1>
                <NavLink to={"/patients"} className={"btn btn-primary"}>Go Back</NavLink>
            </div>
            <form onSubmit={formik.handleSubmit}>
                <div className="row mb-3">
                    <div className="col-lg-6">
                        <label htmlFor="doctorId" className="form-label fw-semibold">
                            Doctor{" "}
                            <span className="text-danger">*</span>
                        </label>
                        <select name="doctorId" id="doctorId" value={formik.values.doctorId} onChange={formik.handleChange} onBlur={formik.handleBlur} className="form-select border-black">
                            <option value="">Select Doctor</option>
                            {doctors.map((doctor) => (
                                <option key={doctor.id} value={doctor.id}>{doctor.name} ({doctor.specialization})</option>
                            ))}
                        </select>
                        {formik.touched.doctorId && formik.errors.doctorId && (
                            <span className="text-danger">{formik.errors.doctorId}</span>
                        )}
                    </div>
                </div>

                <h5 className="mb-3 mt-4">Patient Details</h5>
                <div className="row mb-3">
                    <div className="col-lg-6">
                        <label htmlFor="patient_name" className="form-label">
                            Name{" "}
                            <span className="text-danger">*</span>
                        </label>
                        <input type="text" name="patient_name" id="patient_name" value={formik.values.patient_name} onChange={formik.handleChange} onBlur={formik.handleBlur} className="form-control border-black" />
                        {formik.touched.patient_name && formik.errors.patient_name && (
                            <span className="text-danger">{formik.errors.patient_name}</span>
                        )}
                    </div>
                    <div className="col-lg-6 mb-3">
                        <label htmlFor="age" className="form-label">
                            Age{" "}
                            <span className="text-danger">*</span>
                        </label>
                        <input type="number" name="age" id="age" value={formik.values.age} onChange={formik.handleChange} onBlur={formik.handleBlur} className="form-control border-black" />
                        {formik.touched.age && formik.errors.age && (
                            <span className="text-danger">{formik.errors.age}</span>
                        )}
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-6 mb-3">
                        <label htmlFor="gender" className="form-label">
                            Gender{" "}
                            <span className="text-danger">*</span>
                        </label>
                        <select name="gender" id="gender" value={formik.values.gender} onChange={formik.handleChange} onBlur={formik.handleBlur} className="form-select border-black">
                            <option value="">Select Patient's gender</option>
                            <option value="FEMALE">Female</option>
                            <option value="MALE">Male</option>
                            <option value="OTHER">Other</option>
                        </select>
                        {formik.touched.gender && formik.errors.gender && (
                            <span className="text-danger">{formik.errors.gender}</span>
                        )}
                    </div>
                    <div className="col-lg-6 mb-3">
                        <label htmlFor="mobileno" className="form-label">
                            Mobile Number{" "}
                            <span className="text-danger">*</span>
                        </label>
                        <input type="text" name="mobileno" id="mobileno" value={formik.values.mobileno} onChange={formik.handleChange} onBlur={formik.handleBlur} className="form-control border-black" />
                        {formik.touched.mobileno && formik.errors.mobileno && (
                            <span className="text-danger">{formik.errors.mobileno}</span>
                        )}
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-lg-12">
                        <label htmlFor="address" className="form-label">
                            Address{" "}
                            <span className="text-danger">*</span>
                        </label>
                        <textarea name="address" id="address" rows={3} value={formik.values.address} onChange={formik.handleChange} onBlur={formik.handleBlur} className="form-control border-black" placeholder="Enter full address"></textarea>
                        {formik.touched.address && formik.errors.address && (
                            <span className="text-danger">{formik.errors.address}</span>
                        )}
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-6 mb-3">
                        <label htmlFor="height" className="form-label">
                            Height (cm){" "}
                            <span className="text-danger">*</span>
                        </label>
                        <input type="number" name="height" id="height" value={formik.values.height} onChange={formik.handleChange} onBlur={formik.handleBlur} className="form-control border-black" placeholder="Enter height in cm" />
                        {formik.touched.height && formik.errors.height && (
                            <span className="text-danger">{formik.errors.height}</span>
                        )}
                    </div>
                    <div className="col-lg-6 mb-3">
                        <label className="form-label">Blood Group</label>
                        <select name="blood_group" id="blood_group" className="form-select border-black" value={formik.values.blood_group} onChange={formik.handleChange} onBlur={formik.handleBlur}>
                            <option value="">Select blood group</option>
                            <option value="A+">A+</option>
                            <option value="A-">A-</option>
                            <option value="B+">B+</option>
                            <option value="B-">B-</option>
                            <option value="O+">O+</option>
                            <option value="O-">O-</option>
                            <option value="AB+">AB+</option>
                            <option value="AB-">AB-</option>
                        </select>
                    </div>
                </div>

                <div className="row">
                    <div className="col-lg-4 mb-3">
                        <label htmlFor="smoking" className="form-label">Smoking</label>
                        <select name="smoking" id="smoking" value={formik.values.smoking} onChange={formik.handleChange} onBlur={formik.handleBlur} className="form-select border-black">
                            <option value="">Select</option>
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                        </select>
                    </div>
                    <div className="col-lg-4 mb-3">
                        <label htmlFor="alcohol" className="form-label">Alcohol</label>
                        <select name="alcohol" id="alcohol" value={formik.values.alcohol} onChange={formik.handleChange} onBlur={formik.handleBlur} className="form-select border-black">
                            <option value="">Select</option>
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                        </select>
                    </div>
                    <div className="col-lg-4 mb-3">
                        <label htmlFor="tobacco" className="form-label">Tobacco</label>
                        <select name="tobacco" id="tobacco" value={formik.values.tobacco} onChange={formik.handleChange} onBlur={formik.handleBlur} className="form-select border-black">
                            <option value="">Select</option>
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                        </select>
                    </div>
                </div>

                <div className="mt-3 text-center">
                    <button type="submit" className="btn btn-success px-4">
                        {buttonText}
                    </button>
                </div>
            </form>
        </>
    )
}

export default PatientForm