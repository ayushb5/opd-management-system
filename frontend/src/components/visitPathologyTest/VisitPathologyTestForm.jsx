import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { visitPathologyTestValidationSchema } from "../../validations/visitPathologyTestValidation";
import { getTestMasters } from "../../services/testMasterService";

function VisitPathologyTestForm({ initialValues, onSubmit, isEdit = false }) {
    const formik = useFormik({
        initialValues,
        validationSchema: visitPathologyTestValidationSchema,
        onSubmit,
        enableReinitialize: true
    });

    const [testMasters, setTestMasters] = useState([]);

    useEffect(() => {
        fetchTestMasters();
    }, []);

    const fetchTestMasters = async () => {
        try {
            const data = await getTestMasters();
            setTestMasters(data);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <form onSubmit={formik.handleSubmit} className="mt-4">
            <div className="row g-3">
                <div className="col-lg-6">
                    <label htmlFor="testMasterId" className="form-label">
                        Select Test <span className="text-danger">*</span>
                    </label>
                    <select name="testMasterId" id="testMasterId" value={formik.values.testMasterId} onChange={formik.handleChange} onBlur={formik.handleBlur} className="form-select border-black">
                        <option value="">Select Test</option>
                        {testMasters.map((testMaster) => (
                            <option key={testMaster.id} value={testMaster.id}>{testMaster.testName}</option>
                        ))}
                    </select>
                    {formik.touched.testMasterId && formik.errors.testMasterId && (
                        <div className="text-danger">
                            {formik.errors.testMasterId}
                        </div>
                    )}
                </div>
            </div>

            <div className="row g-3 mt-1">
                <div className="col-lg-6">
                    <label htmlFor="result" className="form-label">
                        Result <span className="text-danger">*</span>
                    </label>
                    <textarea
                        rows="3"
                        name="result"
                        value={formik.values.result}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="form-control border-black"
                    />
                    {formik.touched.result && formik.errors.result && (
                        <div className="text-danger">{formik.errors.result}</div>
                    )}
                </div>
                <div className="col-lg-6">
                    <label className="form-label">
                        Remarks
                    </label>

                    <textarea
                        rows="3"
                        name="remarks"
                        value={formik.values.remarks}
                        onChange={formik.handleChange}
                        className="form-control border-black"
                    />
                </div>
            </div>

            <div className="row g-3 mt-1">
                <div className="col-lg-6">
                    <label className="form-label">
                        Report File Name
                    </label>

                    <input
                        type="text"
                        name="reportFile"
                        value={formik.values.reportFile}
                        onChange={formik.handleChange}
                        className="form-control border-black"
                        placeholder="e.g. blood_report.pdf"
                    />
                </div>
            </div>

            <div className="text-center mt-5">
                <button
                    type="submit"
                    className="btn btn-primary px-4"
                    disabled={formik.isSubmitting}
                >
                    {isEdit
                        ? "Update Pathology Test"
                        : "Add Pathology Test"}
                </button>
            </div>
        </form>
    );
}

export default VisitPathologyTestForm;