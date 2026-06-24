import { useFormik } from "formik"
import { useEffect, useState } from "react"
import { referralValidationSchema } from "../../validations/referralValidation"
import { getReferralCenters } from "../../services/referralCenterService"
import { toast } from "react-toastify"

function ReferralForm({ initialValues, onSubmit, isEdit = false }) {
    const formik = useFormik({
        initialValues,
        validationSchema: referralValidationSchema(),
        onSubmit,
        enableReinitialize: true
    })

    const [referralCenters, setReferralCenters] = useState([]);

    useEffect(() => {
        fetchReferralCenters();
    }, []);

    const fetchReferralCenters = async () => {
        try {
            const data = await getReferralCenters();
            setReferralCenters(data);
        } catch (error) {
            console.error(error);
            toast.error("Failed to load referral centers");
        }
    }

    return (
        <form onSubmit={formik.handleSubmit} className="mt-4">
            <div className="row g-3 mb-2">
                <div className="col-lg-6">
                    <label htmlFor="referralCenterId" className="form-label">
                        Referral Center <span className="text-danger">*</span>
                    </label>
                    <select name="referralCenterId" id="referralCenterId" value={formik.values.referralCenterId} onChange={formik.handleChange} onBlur={formik.handleBlur} className="form-select border-black">
                        <option value="">Select Referral Center</option>
                        {referralCenters.map((rc) => (
                            <option key={rc.id} value={rc.id}>
                                {rc.name} ({rc.type})
                            </option>
                        ))}
                    </select>
                    {formik.touched.referralCenterId && formik.errors.referralCenterId && (
                        <div className="text-danger">{formik.errors.referralCenterId}</div>
                    )}
                </div>
                <div className="col-md-6">
                    <label htmlFor="noteType" className="form-label">
                        Note Type <span className="text-danger">*</span>
                    </label>

                    <select
                        id="noteType"
                        name="noteType"
                        value={formik.values.noteType}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="form-select border-black"
                    >
                        <option value="">Select Note Type</option>
                        <option value="PATHOLOGY">Pathology</option>
                        <option value="PHARMACY">Pharmacy</option>
                        <option value="HIGHER_CENTER">Higher Center</option>
                        <option value="DIAGNOSTIC">Diagnostic</option>
                    </select>

                    {formik.touched.noteType && formik.errors.noteType && (
                        <div className="text-danger">
                            {formik.errors.noteType}
                        </div>
                    )}
                </div>
            </div>

            <div className="col-12 mb-2">
                <label htmlFor="reason" className="form-label">
                    Reason <span className="text-danger">*</span>
                </label>

                <input
                    type="text"
                    id="reason"
                    name="reason"
                    value={formik.values.reason}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="form-control border-black"
                    placeholder="Example: CBC and thyroid profile"
                />

                {formik.touched.reason && formik.errors.reason && (
                    <div className="text-danger">{formik.errors.reason}</div>
                )}
            </div>

            <div className="col-12">
                <label htmlFor="details" className="form-label">
                    Details
                </label>

                <textarea
                    id="details"
                    name="details"
                    rows="3"
                    value={formik.values.details}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="form-control border-black"
                    placeholder="Additional instructions or notes"
                />

                {formik.touched.details && formik.errors.details && (
                    <div className="text-danger">{formik.errors.details}</div>
                )}
            </div>

            <div className="text-center mt-4">
                <button
                    type="submit"
                    className="btn btn-primary px-4"
                    disabled={formik.isSubmitting}
                >
                    {formik.isSubmitting
                        ? "Saving..."
                        : isEdit
                            ? "Update Referral"
                            : "Add Referral"}
                </button>
            </div>
        </form>
    )
}

export default ReferralForm