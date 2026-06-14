import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getVisit } from "../../../services/visitService";
import { Activity, ArrowLeft, FileEarmarkText } from "react-bootstrap-icons";

const capitalizeGender = (text) =>
    text
        ? text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()
        : "";

function VisitDetails() {

    const { id } = useParams();

    const [visit, setVisit] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchVisit();
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

    return (
        <>
            <div className="d-flex justify-content-between align-items-center">
                <span className="fs-2 fw-semibold">Visit Consultation</span>
                <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => navigate("/doctor/visits")}
                >
                    <ArrowLeft className="me-2" />
                    Go Back
                </button>
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
                                        onChange={(e) =>
                                            setVisit({
                                                ...visit,
                                                status: e.target.value
                                            })
                                        }
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
                                    <div className="fw-semibold">{visit.pulse || "-"}</div>
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
            </div>
        </>
    );
}

export default VisitDetails;