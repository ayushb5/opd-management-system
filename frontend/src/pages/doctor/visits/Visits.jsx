import { useEffect, useState } from "react";
import { Search } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getVisitsByDoctorAndDate } from "../../../services/visitService";

function Visits() {

    const [visits, setVisits] = useState([]);
    const [search, setSearch] = useState("");

    const user = JSON.parse(
        localStorage.getItem("user") ||
        sessionStorage.getItem("user") ||
        "null"
    );

    const doctorId = user.id;

    const [selectedDate, setSelectedDate] = useState(
        new Date().toISOString().split("T")[0]
    );

    const navigate = useNavigate();

    useEffect(() => {
        if (doctorId && selectedDate) {
            fetchVisits();
        } else {
            setVisits([]);
        }
    }, [selectedDate, doctorId]);

    const fetchVisits = async () => {
        try {
            const data = await getVisitsByDoctorAndDate(
                doctorId,
                selectedDate
            );
            setVisits(data);
        } catch (error) {
            console.error(error);
            toast.error("Failed to load visits");
        }
    };

    const filteredVisits = visits.filter(
        (visit) =>
            visit.patient?.patientName
                ?.toLowerCase()
                .includes(search.toLowerCase()) ||

            visit.complaints
                ?.toLowerCase()
                .includes(search.toLowerCase())
    );

    return (
        <>
            <h4 className="text-center mb-3">My Visits</h4>
            <div className="d-flex align-items-center gap-3 mb-3">

                <div className="flex-grow-1">
                    <div className="input-group">
                        <span className="input-group-text border-black">
                            <Search />
                        </span>

                        <input
                            type="text"
                            className="form-control border-black"
                            placeholder="Search patient..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>

                <input
                    type="date"
                    className="form-control"
                    style={{ width: "200px" }}
                    value={selectedDate}
                    onChange={(e) =>
                        setSelectedDate(e.target.value)
                    }
                />
            </div>

            <div className="table-responsive mt-3">
                <table className="table table-hover align-middle">

                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Date</th>
                            <th>Patient</th>
                            <th>Complaints</th>
                            <th className="text-nowrap">Follow Up</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {filteredVisits.length > 0 ? (
                            filteredVisits.map((visit) => (
                                <tr key={visit.id}>
                                    <td>{visit.id}</td>

                                    <td className="text-nowrap">{visit.visitDate}</td>

                                    <td className="text-nowrap">
                                        {visit.patient?.patientName}
                                    </td>

                                    <td>
                                        {visit.complaints}
                                    </td>

                                    <td className="text-nowrap">
                                        {visit.followupDate || "-"}
                                    </td>

                                    <td>
                                        <span
                                            className={`badge ${visit.status === "WAITING"
                                                ? "bg-warning text-dark"
                                                : visit.status === "IN_CONSULTATION"
                                                    ? "bg-info"
                                                    : visit.status === "COMPLETED"
                                                        ? "bg-success"
                                                        : "bg-danger"
                                                }`}
                                        >
                                            {visit.status}
                                        </span>
                                    </td>


                                    <td className="text-nowrap">
                                        <button
                                            className="btn btn-primary btn-sm me-2"
                                            onClick={() =>
                                                navigate(
                                                    `${visit.id}`
                                                )
                                            }
                                        >
                                            Open
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan={7}
                                    className="text-center"
                                >
                                    No visits found
                                </td>
                            </tr>
                        )}

                    </tbody>

                </table>
            </div>
        </>
    );
}

export default Visits;