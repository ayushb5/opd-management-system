import { useEffect, useState } from "react";
import { Search, Pencil, Trash } from "react-bootstrap-icons";
import { NavLink, useNavigate } from "react-router-dom";
import {
    getReceptionists,
    deleteReceptionist
} from "../../../services/receptionistService";
import ConfirmationModal from "../../../components/ConfirmationModal";
import { toast } from "react-toastify";

function ReceptionistList() {

    const [receptionists, setReceptionists] = useState([]);
    const [search, setSearch] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [selectedReceptionistId, setSelectedReceptionistId] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        fetchReceptionists();
    }, []);

    const fetchReceptionists = async () => {
        try {
            const data = await getReceptionists();
            setReceptionists(data);
        } catch (error) {
            console.error(error);
            toast.error("Failed to load receptionists");
        }
    };

    const handleDelete = async () => {
        try {
            await deleteReceptionist(selectedReceptionistId);

            toast.success("Receptionist deleted successfully");

            setReceptionists(
                receptionists.filter(
                    receptionist => receptionist.id !== selectedReceptionistId
                )
            );

            setShowModal(false);
        } catch (error) {
            toast.error("Failed to delete receptionist");
            console.error(error);
        }
    };

    const filteredReceptionists = receptionists.filter(
        (receptionist) =>
            receptionist.name?.toLowerCase().includes(search.toLowerCase()) ||
            receptionist.email?.toLowerCase().includes(search.toLowerCase()) ||
            receptionist.mobileno?.includes(search)
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
                            placeholder="Search receptionist..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>

                <NavLink
                    to="add-receptionist"
                    className="btn btn-primary text-nowrap"
                >
                    Add Receptionist
                </NavLink>

            </div>

            <div className="table-responsive mt-3">
                <table className="table table-hover align-middle">

                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Mobile</th>
                            <th>Doctor</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>

                        {filteredReceptionists.length > 0 ? (
                            filteredReceptionists.map((receptionist) => (
                                <tr key={receptionist.id}>

                                    <td>{receptionist.id}</td>
                                    <td className="text-nowrap">{receptionist.name}</td>
                                    <td>{receptionist.email}</td>
                                    <td>{receptionist.mobileno}</td>

                                    <td className="text-nowrap">
                                        {receptionist.doctor?.name}
                                    </td>

                                    <td>
                                        {receptionist.status ? (
                                            <span className="badge bg-success">
                                                Active
                                            </span>
                                        ) : (
                                            <span className="badge bg-danger">
                                                Inactive
                                            </span>
                                        )}
                                    </td>

                                    <td className="text-nowrap">

                                        <button
                                            className="btn btn-warning btn-sm me-2"
                                            onClick={() =>
                                                navigate(
                                                    `edit-receptionist/${receptionist.id}`
                                                )
                                            }
                                        >
                                            <Pencil />
                                        </button>

                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => {
                                                setSelectedReceptionistId(
                                                    receptionist.id
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
                                    colSpan={7}
                                    className="text-center"
                                >
                                    No receptionists found
                                </td>
                            </tr>
                        )}

                    </tbody>

                </table>
            </div>

            <ConfirmationModal
                show={showModal}
                title="Delete Receptionist"
                message="Are you sure you want to delete this receptionist?"
                onConfirm={handleDelete}
                onClose={() => setShowModal(false)}
            />
        </>
    );
}

export default ReceptionistList;