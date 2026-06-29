import { useEffect, useState } from "react";
import { Search, Pencil, Trash } from "react-bootstrap-icons";
import { NavLink, useNavigate } from "react-router-dom";
import {
    getReceptionists,
    deleteReceptionist
} from "../../services/receptionistService";
import ConfirmationModal from "../ConfirmationModal";
import { toast } from "react-toastify";
import Pagination from "../Pagination";

function ReceptionistList() {

    const [receptionists, setReceptionists] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [pageSize] = useState(10);
    const [totalPages, setTotalPages] = useState(0);
    const [search, setSearch] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [selectedReceptionistId, setSelectedReceptionistId] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        fetchReceptionists();
    }, [currentPage, pageSize, search]);

    const fetchReceptionists = async () => {
        try {
            const data = await getReceptionists(currentPage, pageSize, search);
            setReceptionists(data.content);
            setTotalPages(data.totalPages);
        } catch (error) {
            console.error(error);
            toast.error("Failed to load receptionists");
        }
    };

    const handleDelete = async () => {
        try {
            await deleteReceptionist(selectedReceptionistId);

            toast.success("Receptionist deleted successfully");

            await fetchReceptionists();

            setShowModal(false);
        } catch (error) {
            toast.error("Failed to delete receptionist");
            console.error(error);
        }
    };

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
                            onChange={(e) => {
                                setSearch(e.target.value);
                                setCurrentPage(0);
                            }
                            }
                        />
                    </div>
                </div>

                <NavLink
                    to="add-receptionist"
                    className="btn btn-primary add-btn text-nowrap"
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

                        {receptionists.length > 0 ? (
                            receptionists.map((receptionist) => (
                                <tr key={receptionist.id}>

                                    <td>{receptionist.id}</td>
                                    <td className="text-nowrap">{receptionist.name}</td>
                                    <td>{receptionist.email}</td>
                                    <td>{receptionist.mobileNo}</td>

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

            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />

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