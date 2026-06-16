import { useFormik } from "formik"
import { useEffect, useState } from "react"
import { visitValidationSchema } from "../../validations/visitValidation";
import { getDoctors } from "../../services/doctorService";
import { getPatients } from "../../services/patientService";

function VisitForm({ initialValues, onSubmit, isEdit = false }) {
    const formik = useFormik({
        initialValues,
        validationSchema: visitValidationSchema(),
        onSubmit,
        enableReinitialize: true
    })
    const [doctors, setDoctors] = useState([]);
    const [patients, setPatients] = useState([]);

    useEffect(() => {
        fetchDoctors();
        fetchPatients();
    }, [])

    const fetchDoctors = async () => {
        try {
            const data = await getDoctors();
            setDoctors(data);
        } catch (error) {
            console.error(error);
        }

    }
    const fetchPatients = async () => {
        try {
            const data = await getPatients();
            setPatients(data);
        } catch (error) {
            console.error(error);
        }

    }
    return (
        <form onSubmit={formik.handleSubmit} className="mt-4">

            {/* Visit Information */}

            <div className="card shadow-sm mb-4">
                <div className="card-header">
                    <h5 className="mb-0">Visit Information</h5>
                </div>

                <div className="card-body">

                    <div className="row g-3">

                        <div className="col-md-4">
                            <label className="form-label">
                                Doctor <span className="text-danger">*</span>
                            </label>

                            <select
                                name="doctorId"
                                value={formik.values.doctorId}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className="form-select border-black"
                            >
                                <option value="">
                                    Select Doctor
                                </option>

                                {doctors.map((doctor) => (
                                    <option
                                        key={doctor.id}
                                        value={doctor.id}
                                    >
                                        {doctor.name}
                                    </option>
                                ))}
                            </select>
                            {formik.touched.doctorId && formik.errors.doctorId && (
                                <div className="text-danger">{formik.errors.doctorId}</div>
                            )}
                        </div>

                        <div className="col-md-4">
                            <label className="form-label">
                                Patient <span className="text-danger">*</span>
                            </label>

                            <select
                                name="patientId"
                                value={formik.values.patientId}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className="form-select border-black"
                            >
                                <option value="">
                                    Select Patient
                                </option>

                                {patients.map((patient) => (
                                    <option
                                        key={patient.id}
                                        value={patient.id}
                                    >
                                        {patient.patientName}
                                    </option>
                                ))}
                            </select>

                            {formik.touched.patientId && formik.errors.patientId && (
                                <div className="text-danger">{formik.errors.patientId}</div>
                            )}
                        </div>

                        <div className="col-md-4">
                            <label className="form-label">
                                Visit Date <span className="text-danger">*</span>
                            </label>

                            <input
                                type="date"
                                name="visitDate"
                                value={formik.values.visitDate}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className="form-control border-black"
                            />

                            {formik.touched.visitDate && formik.errors.visitDate && (
                                <div className="text-danger">{formik.errors.visitDate}</div>
                            )}
                        </div>

                    </div>

                </div>
            </div>

            {/* Complaints */}

            <div className="card shadow-sm mb-4">

                <div className="card-header">
                    <h5 className="mb-0">
                        Chief Complaints
                    </h5>
                </div>

                <div className="card-body">

                    <div className="mb-3">

                        <label className="form-label">
                            Complaints <span className="text-danger">*</span>
                        </label>

                        <textarea
                            rows="3"
                            name="complaints"
                            value={formik.values.complaints}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="form-control border-black"
                        />

                        {formik.touched.complaints && formik.errors.complaints && (
                            <div className="text-danger">{formik.errors.complaints}</div>
                        )}

                    </div>

                    <div className="mb-3">

                        <label className="form-label">
                            Diagnosis <span className="text-danger">*</span>
                        </label>

                        <textarea
                            rows="3"
                            name="diagnosis"
                            value={formik.values.diagnosis}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="form-control border-black"
                        />

                        {formik.touched.diagnosis && formik.errors.diagnosis && (
                            <div className="text-danger">{formik.errors.diagnosis}</div>
                        )}

                    </div>

                    <div>

                        <label className="form-label">
                            Advice <span className="text-danger">*</span>
                        </label>

                        <textarea
                            rows="3"
                            name="advice"
                            value={formik.values.advice}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="form-control border-black"
                        />

                        {formik.touched.advice && formik.errors.advice && (
                            <div className="text-danger">{formik.errors.advice}</div>
                        )}

                    </div>

                </div>

            </div>

            {/* Vitals */}

            <div className="card shadow-sm mb-4">

                <div className="card-header">
                    <h5 className="mb-0">
                        Vitals
                    </h5>
                </div>

                <div className="card-body">

                    <div className="row g-3">

                        <div className="col-md-4">
                            <label className="form-label">
                                BP
                            </label>

                            <input
                                type="text"
                                name="bp"
                                value={formik.values.bp}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className="form-control border-black"
                            />
                        </div>

                        <div className="col-md-4">
                            <label className="form-label">
                                Pulse
                            </label>

                            <input
                                type="number"
                                name="pulse"
                                value={formik.values.pulse}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className="form-control border-black"
                            />
                        </div>

                        <div className="col-md-4">
                            <label className="form-label">
                                Temperature
                            </label>

                            <input
                                type="number"
                                step="0.1"
                                name="temperature"
                                value={formik.values.temperature}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className="form-control border-black"
                            />
                        </div>

                        <div className="col-md-4">
                            <label className="form-label">
                                Saturation
                            </label>

                            <input
                                type="number"
                                name="saturation"
                                value={formik.values.saturation}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className="form-control border-black"
                            />
                        </div>

                        <div className="col-md-4">
                            <label className="form-label">
                                Respiration Rate
                            </label>

                            <input
                                type="number"
                                name="respirationRate"
                                value={formik.values.respirationRate}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className="form-control border-black"
                            />
                        </div>

                        <div className="col-md-4">
                            <label className="form-label">
                                Weight(Kg) <span className="text-danger">*</span>
                            </label>

                            <input
                                type="number"
                                step="0.1"
                                name="weight"
                                value={formik.values.weight}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className="form-control border-black"
                            />

                            {formik.touched.weight && formik.errors.weight && (
                                <div className="text-danger">{formik.errors.weight}</div>
                            )}
                        </div>

                    </div>

                </div>

            </div>

            {/* Sugar & Laboratory */}

            <div className="card shadow-sm mb-4">
                <div className="card-header">
                    <h5 className="mb-0">Sugar & Laboratory</h5>
                </div>

                <div className="card-body">
                    <div className="row g-3">

                        <div className="col-md-4">
                            <label className="form-label">Fasting Sugar</label>
                            <input
                                type="number"
                                step="0.01"
                                name="fastingSugar"
                                value={formik.values.fastingSugar}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className="form-control border-black"
                            />
                        </div>

                        <div className="col-md-4">
                            <label className="form-label">PP Sugar</label>
                            <input
                                type="number"
                                step="0.01"
                                name="ppSugar"
                                value={formik.values.ppSugar}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className="form-control border-black"
                            />
                        </div>

                        <div className="col-md-4">
                            <label className="form-label">Random Sugar</label>
                            <input
                                type="number"
                                step="0.01"
                                name="randomSugar"
                                value={formik.values.randomSugar}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className="form-control border-black"
                            />
                        </div>

                        <div className="col-md-4">
                            <label className="form-label">HB</label>
                            <input
                                type="number"
                                step="0.01"
                                name="hb"
                                value={formik.values.hb}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className="form-control border-black"
                            />
                        </div>

                        <div className="col-md-8">
                            <label className="form-label">Urea Creatinine</label>
                            <input
                                type="text"
                                name="ureaCreatinine"
                                value={formik.values.ureaCreatinine}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className="form-control border-black"
                            />
                        </div>

                        <div className="col-12">
                            <label className="form-label">ECG</label>
                            <textarea
                                rows="3"
                                name="ecg"
                                value={formik.values.ecg}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className="form-control border-black"
                            />
                        </div>

                    </div>
                </div>
            </div>

            {/* Clinical Examination */}

            <div className="card shadow-sm mb-4">
                <div className="card-header">
                    <h5 className="mb-0">Clinical Examination</h5>
                </div>

                <div className="card-body">

                    <div className="row g-3">

                        <div className="col-md-4">
                            <label className="form-label">Edema</label>
                            <input
                                type="text"
                                name="edema"
                                value={formik.values.edema}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className="form-control border-black"
                            />
                        </div>

                        <div className="col-md-4">
                            <label className="form-label">Pallor</label>
                            <input
                                type="text"
                                name="pallor"
                                value={formik.values.pallor}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className="form-control border-black"
                            />
                        </div>

                        <div className="col-md-4">
                            <label className="form-label">Jaundice</label>
                            <input
                                type="text"
                                name="jaundice"
                                value={formik.values.jaundice}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className="form-control border-black"
                            />
                        </div>

                        <div className="col-md-6">
                            <label className="form-label">CVS</label>
                            <textarea
                                rows="2"
                                name="cvs"
                                value={formik.values.cvs}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className="form-control border-black"
                            />
                        </div>

                        <div className="col-md-6">
                            <label className="form-label">RS</label>
                            <textarea
                                rows="2"
                                name="rs"
                                value={formik.values.rs}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className="form-control border-black"
                            />
                        </div>

                        <div className="col-md-6">
                            <label className="form-label">PA</label>
                            <textarea
                                rows="2"
                                name="pa"
                                value={formik.values.pa}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className="form-control border-black"
                            />
                        </div>

                        <div className="col-md-6">
                            <label className="form-label">CNS</label>
                            <textarea
                                rows="2"
                                name="cns"
                                value={formik.values.cns}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className="form-control border-black"
                            />
                        </div>

                    </div>

                </div>
            </div>

            {/* Medical History */}

            <div className="card shadow-sm mb-4">
                <div className="card-header">
                    <h5 className="mb-0">Medical History</h5>
                </div>

                <div className="card-body">

                    <div className="mb-3">
                        <label className="form-label">Past History</label>
                        <textarea
                            rows="3"
                            name="pastHistory"
                            value={formik.values.pastHistory}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="form-control border-black"
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Current Medication</label>
                        <textarea
                            rows="3"
                            name="currentMedication"
                            value={formik.values.currentMedication}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="form-control border-black"
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Additional Notes</label>
                        <textarea
                            rows="3"
                            name="additionalNotes"
                            value={formik.values.additionalNotes}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="form-control border-black"
                        />
                    </div>

                </div>
            </div>

            {/* Follow Up */}

            <div className="card shadow-sm mb-4">

                <div className="card-header">
                    <h5 className="mb-0">
                        Follow Up
                    </h5>
                </div>

                <div className="card-body">

                    <div className="row">

                        <div className="col-md-4">

                            <label className="form-label">
                                Follow Up Date
                            </label>

                            <input
                                type="date"
                                name="followupDate"
                                value={formik.values.followupDate}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className="form-control border-black"
                            />
                        </div>

                    </div>

                </div>

            </div>

            {/* Status */}
            {isEdit && (
                <div className="card shadow-sm mb-4">

                    <div className="card-header">
                        <h5 className="mb-0">
                            Status
                        </h5>
                    </div>

                    <div className="card-body">

                        <div className="row">

                            <div className="col-md-4">

                                <label className="form-label">
                                    Select Status <span className="text-danger">*</span>
                                </label>

                                <select name="status" id="status" value={formik.values.status} onChange={formik.handleChange} onBlur={formik.handleBlur} className="form-select border-black">
                                    <option value="WAITING">Waiting</option>
                                    <option value="IN_CONSULTATION">In Consultation</option>
                                    <option value="COMPLETED">Completed</option>
                                    <option value="CANCELLED">Cancelled</option>
                                </select>

                            </div>

                        </div>

                    </div>

                </div>
            )}

            <div className="text-center mb-5">

                <button
                    type="submit"
                    className="btn btn-primary px-5"
                >
                    {isEdit ? "Update Visit" : "Add Visit"}
                </button>

            </div>

        </form>
    )
}

export default VisitForm