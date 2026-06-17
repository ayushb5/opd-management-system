import { useFormik } from "formik"
import { useEffect, useState } from "react"
import { getDoctors } from "../../services/doctorService"
import { testMasterValidationSchema } from "../../validations/testMasterValidation"

function TestMasterForm({ initialValues, onSubmit, isEdit = false }) {
    const formik = useFormik({
        initialValues,
        validationSchema: testMasterValidationSchema(),
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
            </div>

            <div className="row g-3 mt-1">
                <div className="col-lg-4">
                    <label htmlFor="testName" className="form-label">
                        Test Name <span className="text-danger">*</span>
                    </label>
                    <input type="text" id="testName" name="testName" value={formik.values.testName} onChange={formik.handleChange} onBlur={formik.handleBlur} className="form-control border-black" />
                    {formik.touched.testName && formik.errors.testName && (
                        <div className="text-danger">{formik.errors.testName}</div>
                    )}
                </div>
                <div className="col-lg-4">
                    <label htmlFor="normalRange" className="form-label">
                        Normal Range <span className="text-danger">*</span>
                    </label>
                    <input type="text" id="normalRange" name="normalRange" value={formik.values.normalRange} onChange={formik.handleChange} onBlur={formik.handleBlur} className="form-control border-black" />
                    {formik.touched.normalRange && formik.errors.normalRange && (
                        <div className="text-danger">{formik.errors.normalRange}</div>
                    )}
                </div>
                <div className="col-lg-4">
                    <label htmlFor="unit" className="form-label">
                        Unit <span className="text-danger">*</span>
                    </label>
                    <input type="text" id="unit" name="unit" value={formik.values.unit} onChange={formik.handleChange} onBlur={formik.handleBlur} className="form-control border-black" />
                    {formik.touched.unit && formik.errors.unit && (
                        <div className="text-danger">{formik.errors.unit}</div>
                    )}
                </div>
            </div>

            <div className="text-center mt-5">
                <button
                    type="submit"
                    className="btn btn-primary px-4"
                    disabled={formik.isSubmitting}
                >
                    {isEdit ? "Update Test Master" : "Add Test Master"}
                </button>
            </div>
        </form>
    )
}

export default TestMasterForm