import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getVisit, updateVisit } from "../../services/visitService";
import { Activity, ArrowLeft, CalendarCheck, Clipboard2Pulse, ClipboardData, ClockHistory, Droplet, FileEarmarkText, JournalText, PersonCheck } from "react-bootstrap-icons";
import Prescription from "../prescription/PrescriptionList";
import VisitDiagnosticList from "../visitDiagnostic/VisitDiagnosticList";
import VisitPathologyTestList from "../visitPathologyTest/VisitPathologyTestList";
import { CashStack } from "react-bootstrap-icons";
import { getByVisitId } from "../../services/billService";

const capitalizeGender = (text) =>
    text
        ? text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()
        : "";

function VisitDetails() {

    const { id } = useParams();

    const [visit, setVisit] = useState(null);
    const [bill, setBill] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchVisit();
        fetchBill();
    }, [id]);

    const fetchVisit = async () => {
        try {
            const data = await getVisit(id);
            setVisit(data);
        }
        catch (error) {
            console.error(error);
            toast.error("Failed to load visit");
        }
    };
    const fetchBill = async () => {
        try {
            const data = await getByVisitId(id);
            setBill(data);
        } catch (error) {
            setBill(null);
            console.error(error);
        }
    };

    if (!visit) {
        return <h5>Loading...</h5>;
    }

    const formattedDate = new Date(visit.visitDate).toLocaleDateString(
        "en-IN",
        {
            day: "2-digit",
            month: "short",
            year: "numeric"
        }
    );

    const handleChange = (e) => {
        setVisit({ ...visit, [e.target.name]: e.target.value });
    }

    const handleSaveConsultation = async () => {
        try {
            await updateVisit(id, { ...visit, doctorId: visit.doctor.id, patientId: visit.patient.id });
            toast.success("Consultation saved successfully")
        } catch (error) {
            toast.error("Failed to save consultation");
            console.error(error);
        }
    }

    const user = JSON.parse(localStorage.getItem("user"));
    const role = user.role;

    return (
        <>
            <div className="d-flex justify-content-between align-items-center">
                <span className="fs-2 fw-semibold">Visit Consultation</span>
                <div className="d-flex gap-2">
                    {role === "ADMIN" && (
                        bill ? (
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={() => navigate(`/admin/bills/view/${bill.id}`)}
                            >
                                View Bill
                            </button>
                        ) : (
                            <button
                                type="button"
                                className="btn btn-success"
                                onClick={() => navigate(`/admin/bills/add/${visit.id}`)}
                            >
                                <CashStack className="me-2" />
                                Generate Bill
                            </button>
                        )
                    )}

                    <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={() => navigate("/admin/visits")}
                    >
                        <ArrowLeft className="me-2" />
                        Go Back
                    </button>
                </div>
            </div>

            <div className="card mt-3">
                <div className="card-header">
                    <div className="row align-items-center">
                        <div className="col-12 col-lg-5 d-flex gap-3 align-items-center">
                            <div className="bg-primary text-light rounded fs-5 d-flex align-items-center justify-content-center fw-bold"
                                style={{ width: "40px", height: "40px" }}>
                                {visit.patient?.patientName
                                    ?.split(" ")
                                    .map(word => word.charAt(0).toUpperCase())
                                    .join("")}
                            </div>
                            <div className="d-flex flex-column" style={{ lineHeight: "1.2" }}>
                                <span className="fw-semibold">{visit.patient.patientName}</span>
                                <small className="text-muted">ID: {visit.patient.id}</small>
                            </div>
                        </div>

                        <div className="col-12 col-lg-7 mt-3 mt-lg-0">
                            <div className="d-flex flex-wrap gap-4 align-items-center">
                                <div className="d-flex flex-column fs-6" style={{ lineHeight: "1.4" }}>
                                    <span className="text-muted">Age / Gender</span>
                                    <span className="fw-semibold">{visit.patient.age}Y / {capitalizeGender(visit.patient.gender)}</span>
                                </div>
                                <div className="d-flex flex-column fs-6" style={{ lineHeight: "1.4" }}>
                                    <span className="text-muted">Mobile Number</span>
                                    <span className="fw-semibold">+91 {visit.patient.mobileNo}</span>
                                </div>
                                <div className="d-flex flex-column fs-6" style={{ lineHeight: "1.4" }}>
                                    <span className="text-muted">Visit Date</span>
                                    <span className="fw-semibold">{formattedDate}</span>
                                </div>
                                <div className="d-flex flex-column fs-6">
                                    <select
                                        name="status"
                                        id="status"
                                        className="form-select form-select-sm border-black"
                                        value={visit.status}
                                        onChange={handleChange}
                                    >
                                        <option value="WAITING">Waiting</option>
                                        <option value="IN_CONSULTATION">In Consultation</option>
                                        <option value="COMPLETED">Completed</option>
                                        <option value="CANCELLED">Cancelled</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row mt-4 g-4 visit-rows">
                <div className="col-12 col-md-4">
                    <div className="card h-100">
                        <div className="card-header bg-light text-primary">
                            <Activity /> Vitals
                        </div>
                        <div className="card-body">
                            <div className="row mb-3">
                                <div className="col-6">
                                    <div className="text-muted">BP</div>
                                    <div className="fw-semibold">{visit.bp || "-"}</div>
                                </div>
                                <div className="col-6">
                                    <div className="text-muted">Pulse</div>
                                    <div className="fw-semibold">{visit.pulse || "-"}</div>
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className="col-6">
                                    <div className="text-muted">Saturation</div>
                                    <div className="fw-semibold">{visit.saturation || "-"}</div>
                                </div>
                                <div className="col-6">
                                    <div className="text-muted">Temp</div>
                                    <div className="fw-semibold">{visit.temperature || "-"}</div>
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className="col-6">
                                    <div className="text-muted">Resp Rate</div>
                                    <div className="fw-semibold">{visit.respirationRate || "-"}</div>
                                </div>
                                <div className="col-6">
                                    <div className="text-muted">Weight(Kg)</div>
                                    <div className="fw-semibold">{visit.weight || "-"}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-md-4">
                    <div className="card h-100">
                        <div className="card-header bg-light text-primary">
                            <FileEarmarkText /> Complaints
                        </div>

                        <div className="card-body custom-scroll">
                            {visit.complaints || "-"}
                        </div>
                    </div>
                </div>
                <div className="col-12 col-md-4">
                    <div className="card h-100">
                        <div className="card-header bg-light text-primary">
                            <Clipboard2Pulse /> Diagnosis & Advice
                        </div>
                        <div className="card-body custom-scroll">
                            <div className="d-flex flex-column mb-2">
                                <label htmlFor="diagnosis" className="form-label">Diagnosis</label>
                                <textarea name="diagnosis" id="diagnosis" value={visit.diagnosis || ""} placeholder="Enter Diagnosis" onChange={handleChange} className="form-control border-black" rows={2} />
                            </div>
                            <div className="d-flex flex-column">
                                <label htmlFor="advice" className="form-label">Advice</label>
                                <textarea name="advice" value={visit.advice || ""} onChange={handleChange} placeholder="Enter Advice" className="form-control border-black" id="advice" rows={2} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row mt-4 g-4 visit-rows">
                <div className="col-12 col-md-4">
                    <div className="card h-100">
                        <div className="card-header bg-light text-primary">
                            <Droplet /> Sugar Profile
                        </div>
                        <div className="card-body">
                            <div className="d-flex h-100 flex-column gap-5">
                                <div>
                                    <span className="text-muted">Fasting Sugar</span>
                                    <span className="ms-3 fw-semibold">{visit.fastingSugar || "-"}</span>
                                </div>
                                <div>
                                    <span className="text-muted">PP Sugar</span>
                                    <span className="ms-3 fw-semibold">{visit.ppSugar || "-"}</span>
                                </div>
                                <div>
                                    <span className="text-muted">Random Sugar</span>
                                    <span className="ms-3 fw-semibold">{visit.randomSugar || "-"}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-md-4">
                    <div className="card h-100">
                        <div className="card-header bg-light text-primary">
                            <ClipboardData /> Lab Findings
                        </div>

                        <div className="card-body">
                            <div className="d-flex h-100 flex-column gap-5">
                                <div>
                                    <span className="text-muted">Hb</span>
                                    <span className="ms-3 fw-semibold">{visit.hb || "-"}</span>
                                </div>
                                <div>
                                    <span className="text-muted">Urea / Creatinine</span>
                                    <span className="ms-3 fw-semibold">{visit.ureaCreatinine || "-"}</span>
                                </div>
                                <div>
                                    <span className="text-muted">ECG</span>
                                    <span className="ms-3 fw-semibold">{visit.ecg || "-"}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-md-4">
                    <div className="card h-100">
                        <div className="card-header bg-light text-primary">
                            <CalendarCheck /> Follow-up Date
                        </div>
                        <div className="card-body">
                            <label htmlFor="followupDate" className="form-label">Next Review Date</label>
                            <input
                                type="date"
                                name="followupDate"
                                id="followupDate"
                                className="form-control"
                                style={{ width: "200px" }}
                                value={visit.followupDate || ""}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="row mt-4 g-4 visit-rows">
                <div className="col-12 col-md-4">
                    <div className="card h-100">
                        <div className="card-header bg-light text-primary">
                            <PersonCheck /> Clinical Examination
                        </div>
                        <div className="card-body">
                            <div className="row mb-3 ms-1">
                                <div className="col-4 form-check">
                                    <input className="form-check-input" type="checkbox" id="edema" name="edema" checked={visit.edema == "YES"} disabled />
                                    <label htmlFor="edema" className="form-check-label">Edema</label>
                                </div>
                                <div className="col-4 form-check">
                                    <input className="form-check-input" type="checkbox" id="pallor" name="pallor" checked={visit.pallor == "YES"} disabled />
                                    <label htmlFor="pallor" className="form-check-label">Pallor</label>
                                </div>
                                <div className="col-4 form-check">
                                    <input className="form-check-input" type="checkbox" id="jaundice" name="jaundice" checked={visit.jaundice == "YES"} disabled />
                                    <label htmlFor="jaundice" className="form-check-label">Jaundice</label>
                                </div>
                            </div>
                            <div className="row mb-3 ms-1">
                                <div className="col-6">
                                    <div className="text-muted">CVS</div>
                                    <div className="fw-semibold">{visit.cvs || "-"}</div>
                                </div>
                                <div className="col-6">
                                    <div className="text-muted">RS</div>
                                    <div className="fw-semibold">{visit.rs || "-"}</div>
                                </div>
                            </div>
                            <div className="row mb-3 ms-1">
                                <div className="col-6">
                                    <div className="text-muted">PA</div>
                                    <div className="fw-semibold">{visit.pa || "-"}</div>
                                </div>
                                <div className="col-6">
                                    <div className="text-muted">CNS</div>
                                    <div className="fw-semibold">{visit.cns || "-"}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-md-4">
                    <div className="card h-100">
                        <div className="card-header bg-light text-primary">
                            <ClockHistory /> Past History
                        </div>
                        <div className="card-body custom-scroll">
                            {visit.pastHistory || "No Significant History"}
                        </div>
                    </div>
                </div>
                <div className="col-12 col-md-4">
                    <div className="card h-100">
                        <div className="card-header bg-light text-primary">
                            <JournalText /> Additional Notes
                        </div>

                        <div className="card-body custom-scroll">
                            {visit.additionalNotes || "No Additional Notes"}
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-4">
                <Prescription visitId={visit.id} />
            </div>

            <div className="mt-4">
                <h3 className="mb-4">Diagnostic</h3>
                <VisitDiagnosticList visitId={id} />
            </div>

            <div className="mt-4">
                <h3 className="mb-4">Pathology Tests</h3>
                <VisitPathologyTestList visitId={id} key={`pathology-${id}`} />
            </div>

            <div className="d-flex justify-content-end mt-4">
                <button
                    className="btn btn-success" onClick={handleSaveConsultation}
                >
                    Save Consultation
                </button>
            </div>
        </>
    );
}

export default VisitDetails;