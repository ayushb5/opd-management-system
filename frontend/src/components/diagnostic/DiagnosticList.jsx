import { useEffect, useState } from "react"
import { Search } from "react-bootstrap-icons"
import { NavLink, useNavigate } from "react-router-dom"
import { Pencil, Trash } from "react-bootstrap-icons";
import ConfirmationModal from "../ConfirmationModal";
import { toast } from "react-toastify"
import { deleteDiagnostic, getDiagnostics } from "../../services/diagnosticService";

function DiagnosticList() {
    const [diagnostics, setDiagnostics] = useState([]);
    const [search, setSearch] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [selectedDiagnosticId, setSelectedDiagnosticId] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        fetchDiagnostics();
    }, [])

    const fetchDiagnostics = async () => {
        try {
            const diagnosticData = await getDiagnostics();
            setDiagnostics(diagnosticData);
        } catch (error) {
            console.error(error);
        }
    }

    const handleDelete = async () => {
        try {
            await deleteDiagnostic(selectedDiagnosticId);
            toast.success("Doctor deleted successfully");

            setDiagnostics(
                diagnostics.filter(diagnostic => diagnostic.id != selectedDiagnosticId)
            );
            setShowModal(false);
        } catch (error) {
            toast.error("Failed to delete diagnostic");
            console.error(error);
        }
    }

    const filteredDiagnostics = diagnostics.filter((diagnostic) =>
        diagnostic.name?.toLowerCase().includes(search.toLowerCase()) ||
        diagnostic.doctor?.name?.toLowerCase().includes(search.toLowerCase())
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
                    to="add-diagnostic"
                    className="btn btn-primary add-btn text-nowrap"
                >
                    Add Diagnostic
                </NavLink>

            </div>

            <div className="table-responsive mt-3">
                <table className="table table-hover align-middle">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Doctor Name</th>
                            <th className="text-nowrap">Diagnostic Name</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredDiagnostics.length > 0 ? (
                            filteredDiagnostics.map((diagnostic) => (
                                <tr key={diagnostic.id}>
                                    <td>{diagnostic.id}</td>
                                    <td className="text-nowrap">{diagnostic.doctor?.name}</td>
                                    <td>{diagnostic.name}</td>
                                    <td className="text-nowrap">
                                        <button className="btn btn-warning btn-sm me-2"
                                            onClick={() => navigate(`edit-diagnostic/${diagnostic.id}`)}
                                        >
                                            <Pencil />
                                        </button>

                                        <button className="btn btn-danger btn-sm"
                                            onClick={() => {
                                                setSelectedDiagnosticId(diagnostic.id);
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
                                <td colSpan={4} className="text-center">
                                    No Diagnostic found
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
    )
}

export default DiagnosticList