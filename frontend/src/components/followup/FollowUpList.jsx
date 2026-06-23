import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, PlusCircle } from "react-bootstrap-icons";

import {
    getFollowUpsByDoctor,
    getTodayFollowUpsByDoctor,
    getOverdueFollowUpsByDoctor,
} from "../../services/visitService";

const FollowUpList = () => {
    const navigate = useNavigate();

    const [followUps, setFollowUps] = useState([]);
    const [filter, setFilter] = useState("ALL");
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");

    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const doctorId = user?.id;

    const fetchFollowUps = async (selectedFilter = "ALL") => {
        try {
            setLoading(true);

            let data = [];

            if (selectedFilter === "TODAY") {
                data = await getTodayFollowUpsByDoctor(doctorId);
            } else if (selectedFilter === "OVERDUE") {
                data = await getOverdueFollowUpsByDoctor(doctorId);
            } else {
                data = await getFollowUpsByDoctor(doctorId);
            }

            setFollowUps(data);
        } catch (error) {
            console.error("Error while fetching follow-ups:", error);
            setFollowUps([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFollowUps("ALL");
    }, []);

    const handleFilterChange = (selectedFilter) => {
        setFilter(selectedFilter);
        fetchFollowUps(selectedFilter);
    };

    const getFollowUpStatus = (followupDate) => {
        const today = new Date().toISOString().split("T")[0];

        if (followupDate === today) return "TODAY";
        if (followupDate < today) return "OVERDUE";
        return "UPCOMING";
    };

    const getStatusBadgeClass = (status) => {
        if (status === "TODAY") return "bg-primary";
        if (status === "OVERDUE") return "bg-danger";
        return "bg-warning text-dark";
    };

    const filteredFollowUps = followUps.filter((followUp) => {
        const patientName = followUp.patient?.patientName?.toLowerCase() || "";
        const mobileNo = followUp.patient?.mobileNo || "";
        const followupDate = followUp.followupDate;

        const today = new Date().toISOString().split("T")[0];

        if (filter === "UPCOMING" && followupDate <= today) {
            return false;
        }

        return (
            patientName.includes(search.toLowerCase()) ||
            mobileNo.includes(search)
        );
    });

    return (
        <div className="container-fluid">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h3 className="mb-1">Follow-ups</h3>
                    <p className="text-muted mb-0">
                        View and manage scheduled patient follow-ups.
                    </p>
                </div>
            </div>

            <div className="card shadow-sm mb-4">
                <div className="card-body">
                    <div className="row g-3 align-items-center">
                        <div className="col-md-6">
                            <div className="d-flex gap-2 flex-wrap">
                                {["ALL", "TODAY", "UPCOMING", "OVERDUE"].map((item) => (
                                    <button
                                        key={item}
                                        className={`btn ${filter === item
                                            ? "btn-primary"
                                            : "btn-outline-primary"
                                            }`}
                                        onClick={() => handleFilterChange(item)}
                                    >
                                        {item}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="col-md-6">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search by patient name or mobile number"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="card shadow-sm">
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-hover align-middle mb-0">
                            <thead>
                                <tr>
                                    <th>Patient</th>
                                    <th>Mobile No.</th>
                                    <th>Last Visit</th>
                                    <th>Follow-up Date</th>
                                    <th>Diagnosis</th>
                                    <th>Status</th>
                                    <th className="text-center">Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {loading ? (
                                    <tr>
                                        <td colSpan="7" className="text-center py-4">
                                            Loading follow-ups...
                                        </td>
                                    </tr>
                                ) : filteredFollowUps.length > 0 ? (
                                    filteredFollowUps.map((followUp) => {
                                        const status = getFollowUpStatus(
                                            followUp.followupDate
                                        );

                                        return (
                                            <tr key={followUp.id}>
                                                <td className="fw-semibold">
                                                    {followUp.patient?.patientName || "-"}
                                                </td>

                                                <td>{followUp.patient?.mobileNo || "-"}</td>

                                                <td>{followUp.visitDate || "-"}</td>

                                                <td>{followUp.followupDate || "-"}</td>

                                                <td>{followUp.diagnosis || "-"}</td>

                                                <td>
                                                    <span
                                                        className={`badge ${getStatusBadgeClass(
                                                            status
                                                        )}`}
                                                    >
                                                        {status}
                                                    </span>
                                                </td>

                                                <td className="text-center">
                                                    <div className="d-flex justify-content-center gap-2">
                                                        <button
                                                            className="btn btn-sm btn-outline-secondary"
                                                            title="View Previous Visit"
                                                            onClick={() => navigate(`/doctor/visits/${followUp.id}`)}
                                                        >
                                                            <Eye />
                                                        </button>

                                                        <button
                                                            className="btn btn-sm btn-primary"
                                                            title="Start Follow-up Visit"
                                                            onClick={() =>
                                                                navigate("/doctor/visits/add", {
                                                                    state: {
                                                                        patientId: followUp.patient?.id,
                                                                        doctorId: followUp.doctor?.id,
                                                                        previousVisitId: followUp.id,
                                                                        isFollowUp: true,
                                                                    },
                                                                })
                                                            }
                                                        >
                                                            <PlusCircle className="me-1" />
                                                            Start
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })
                                ) : (
                                    <tr>
                                        <td colSpan="7" className="text-center py-4 text-muted">
                                            No follow-ups found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FollowUpList;