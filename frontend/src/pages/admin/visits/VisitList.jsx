import { useEffect, useState } from "react";
import { Search, Pencil, Trash } from "react-bootstrap-icons";
import { NavLink, useNavigate } from "react-router-dom";
import ConfirmationModal from "../../../components/ConfirmationModal";
import { toast } from "react-toastify";
import { deleteVisit, getVisits } from "../../../services/visitService";

function VisitList() {

    const [visits, setVisits] = useState([]);
    const [search, setSearch] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [selectedVisitId, setSelectedVisitId] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        fetchVisits();
    }, []);

    const fetchVisits = async () => {
        try {
            const data = await getVisits();
            setVisits(data);
        } catch (error) {
            console.error(error);
            toast.error("Failed to load visits");
        }
    };

    const handleDelete = async () => {
        try {
            await deleteVisit(selectedVisitId);

            toast.success("Visit deleted successfully");

            setVisits(
                visits.filter(
                    visit => visit.id !== selectedVisitId
                )
            );

            setShowModal(false);
        } catch (error) {
            toast.error("Failed to delete visit");
            console.error(error);
        }
    };

    const filteredVisits = visits.filter(
        (visit) =>
            visit.patient?.patientName
                ?.toLowerCase()
                .includes(search.toLowerCase()) ||

            visit.doctor?.name
                ?.toLowerCase()
                .includes(search.toLowerCase())
    );

    return (
        <>
            <div className="d-flex align-items-center gap-2">

                <div className="flex-grow-1">
                    <div className="input-group">
                        <span className="input-group-text border-black">
                            <Search />
                        </span>

                        <input
                            type="text"
                            className="form-control border-black"
                            placeholder="Search patient or doctor..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>

                <NavLink
                    to="add-visit"
                    className="btn btn-primary add-btn text-nowrap"
                >
                    Add Visit
                </NavLink>

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
                        {filteredVisits.length > 0 ? (
                            filteredVisits.map((visit) => (
                                <tr key={visit.id}>
                                    <td>{visit.id}</td>

                                    <td className="text-nowrap">{visit.visitDate}</td>

                                    <td className="text-nowrap">
                                        {visit.patient?.patientName}
                                    </td>

                                    <td className="text-nowrap">
                                        {visit.doctor?.name}
                                    </td>

                                    <td>
                                        {visit.complaints}
                                    </td>

                                    <td>
                                        {visit.diagnosis || "-"}
                                    </td>

                                    <td className="text-nowrap">
                                        {visit.followupDate || "-"}
                                    </td>

                                    <td className="text-nowrap">
                                        <button
                                            className="btn btn-warning btn-sm me-2"
                                            onClick={() =>
                                                navigate(
                                                    `edit-visit/${visit.id}`
                                                )
                                            }
                                        >
                                            <Pencil />
                                        </button>

                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => {
                                                setSelectedVisitId(visit.id);
                                                setShowModal(true);
                                            }}
                                        >
                                            <Trash />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan={8}
                                    className="text-center"
                                >
                                    No visits found
                                </td>
                            </tr>
                        )}

                    </tbody>

                </table>
            </div>

            <ConfirmationModal
                show={showModal}
                title="Delete Visit"
                message="Are you sure you want to delete this visit?"
                onConfirm={handleDelete}
                onClose={() => setShowModal(false)}
            />
        </>
    );
}

export default VisitList;