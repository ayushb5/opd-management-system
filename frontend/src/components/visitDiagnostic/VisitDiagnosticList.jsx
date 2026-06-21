import { useEffect, useState } from "react";
import { Pencil, Search, Trash } from "react-bootstrap-icons";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import ConfirmationModal from "../ConfirmationModal";
import {
    deleteDiagnostic,
    getByVisitId
} from "../../services/diagnosticService";

function VisitDiagnosticList({ visitId }) {
    const [diagnostics, setDiagnostics] = useState([]);
    const [search, setSearch] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [selectedDiagnosticId, setSelectedDiagnosticId] = useState(null);

    const navigate = useNavigate();
    const location = useLocation();
    const basePath = location.pathname.startsWith("/doctor/visits")
        ? "/doctor/visits"
        : "/admin/visits";

    useEffect(() => {
        const fetchDiagnostics = async () => {
            try {
                const data = await getByVisitId(visitId);
                setDiagnostics(data);
            } catch (error) {
                toast.error("Failed to load diagnostics");
                console.error(error);
            }
        };

        fetchDiagnostics();
    }, [visitId]);

    const handleDelete = async () => {
        try {
            await deleteDiagnostic(selectedDiagnosticId);

            toast.success("Diagnostic deleted successfully");

            setDiagnostics((previous) =>
                previous.filter(
                    (diagnostic) =>
                        diagnostic.id !== selectedDiagnosticId
                )
            );

            setShowModal(false);
        } catch (error) {
            toast.error("Failed to delete diagnostic");
            console.error(error);
        }
    };

    const filteredDiagnostics = diagnostics.filter((diagnostic) =>
        diagnostic.name?.toLowerCase().includes(search.toLowerCase())
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
                            placeholder="Search Diagnostic..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>

                <NavLink
                    to={`${basePath}/${visitId}/add-diagnostic`}
                    className="btn btn-primary add-btn text-nowrap"
                >
                    Add Diagnostic
                </NavLink>

            </div >

            <div className="table-responsive mt-3">
                <table className="table table-hover align-middle">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Diagnostic Name</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredDiagnostics.length > 0 ? (
                            filteredDiagnostics.map((diagnostic, index) => (
                                <tr key={diagnostic.id}>
                                    <td>{index + 1}</td>
                                    <td>{diagnostic.name}</td>

                                    <td className="text-nowrap">
                                        <button
                                            className="btn btn-warning btn-sm me-2"
                                            onClick={() =>
                                                navigate(
                                                    `${basePath}/${visitId}/edit-diagnostic/${diagnostic.id}`
                                                )
                                            }
                                        >
                                            <Pencil />
                                        </button>

                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => {
                                                setSelectedDiagnosticId(
                                                    diagnostic.id
                                                );
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
                                    colSpan="3"
                                    className="text-center text-muted"
                                >
                                    No diagnostics added for this visit.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <ConfirmationModal
                show={showModal}
                title="Delete Diagnostic"
                message="Are you sure you want to delete this diagnostic?"
                onConfirm={handleDelete}
                onClose={() => setShowModal(false)}
            />
        </>
    );
}

export default VisitDiagnosticList;