import { useFormik } from "formik";
import { visitDiagnosticValidationSchema } from "../../validations/visitDiagnosticValidation";

function DiagnosticForm({ initialValues, onSubmit, isEdit = false }) {
    const formik = useFormik({
        initialValues,
        validationSchema: visitDiagnosticValidationSchema,
        onSubmit,
        enableReinitialize: true
    });

    return (
        <form onSubmit={formik.handleSubmit} className="mt-4">
            <div className="row g-3">
                <div className="col-lg-6">
                    <label htmlFor="name" className="form-label">
                        Diagnostic Name{" "}
                        <span className="text-danger">*</span>
                    </label>

                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="form-control border-black"
                        placeholder="Example: CBC, ECG, X-Ray"
                    />

                    {formik.touched.name && formik.errors.name && (
                        <div className="text-danger">
                            {formik.errors.name}
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
                    {isEdit
                        ? "Update Diagnostic"
                        : "Add Diagnostic"}
                </button>
            </div>
        </form>
    );
}

export default DiagnosticForm;