import { useEffect, useState } from "react";
import { CalendarDate, Search } from "react-bootstrap-icons";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { getVisitsByDate } from "../../services/visitService";

function VisitList() {
    const [visits, setVisits] = useState([]);
    const [search, setSearch] = useState("");
    const [selectedDate, setSelectedDate] = useState(
        new Date().toLocaleDateString("en-CA")
    );
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        fetchVisitsByDate(selectedDate);
    }, [selectedDate]);

    const fetchVisitsByDate = async (date) => {
        try {
            setLoading(true);

            const data = await getVisitsByDate(date);
            setVisits(data);
        } catch (error) {
            console.error(error);
            toast.error("Failed to load visits");
            setVisits([]);
        } finally {
            setLoading(false);
        }
    };

    const filteredVisits = visits.filter((visit) => {
        const query = search.toLowerCase();

        return (
            visit.patient?.patientName?.toLowerCase().includes(query) ||
            visit.doctor?.name?.toLowerCase().includes(query) ||
            visit.complaints?.toLowerCase().includes(query) ||
            visit.diagnosis?.toLowerCase().includes(query)
        );
    });

    return (
        <>
            <div className="d-flex flex-wrap align-items-center gap-2">
                <div className="flex-grow-1">
                    <div className="input-group">
                        <span className="input-group-text border-black">
                            <Search />
                        </span>

                        <input
                            type="text"
                            className="form-control border-black"
                            placeholder="Search patient, doctor, complaint..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>

                <div className="input-group" style={{ width: "230px" }}>
                    <span className="input-group-text border-black">
                        <CalendarDate />
                    </span>

                    <input
                        type="date"
                        className="form-control border-black"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                    />
                </div>

                <button
                    type="button"
                    className="btn btn-outline-primary text-nowrap"
                    onClick={() =>
                        setSelectedDate(
                            new Date().toLocaleDateString("en-CA")
                        )
                    }
                >
                    Today
                </button>

                <NavLink
                    to="add-visit"
                    className="btn btn-primary add-btn text-nowrap"
                >
                    Add Visit
                </NavLink>
            </div>

            <div className="d-flex justify-content-between align-items-center mt-3">
                <span className="text-muted">
                    Visits for: <strong>{selectedDate}</strong>
                </span>

                <span className="badge bg-primary">
                    {filteredVisits.length} Visit(s)
                </span>
            </div>

            <div className="table-responsive mt-3">
                <table className="table table-hover align-middle">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Date</th>
                            <th>Patient</th>
                            <th>Doctor</th>
                            <th>Complaints</th>
                            <th>Diagnosis</th>
                            <th className="text-nowrap">Follow Up</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan={8} className="text-center py-4">
                                    Loading visits...
                                </td>
                            </tr>
                        ) : filteredVisits.length > 0 ? (
                            filteredVisits.map((visit) => (
                                <tr key={visit.id}>
                                    <td>{visit.id}</td>

                                    <td className="text-nowrap">
                                        {visit.visitDate || "-"}
                                    </td>

                                    <td className="text-nowrap">
                                        {visit.patient?.patientName || "-"}
                                    </td>

                                    <td className="text-nowrap">
                                        {visit.doctor?.name || "-"}
                                    </td>

                                    <td>{visit.complaints || "-"}</td>

                                    <td>{visit.diagnosis || "-"}</td>

                                    <td className="text-nowrap">
                                        {visit.followupDate || "-"}
                                    </td>

                                    <td className="text-nowrap">
                                        <button
                                            type="button"
                                            className="btn btn-primary btn-sm"
                                            onClick={() => navigate(`${visit.id}`)}
                                        >
                                            Open
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={8} className="text-center py-4">
                                    No visits found for this date.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default VisitList;