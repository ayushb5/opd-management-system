import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Pencil, Search, Trash } from "react-bootstrap-icons";
import { getReferralCenters, deleteReferralCenter } from "../../services/referralCenterService"
import ConfirmationModal from "../ConfirmationModal";
import Pagination from "../Pagination";

function ReferralCenterList() {
    const [referralCenters, setReferralCenters] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [pageSize] = useState(10);
    const [totalPages, setTotalPages] = useState(0);
    const [search, setSearch] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [selectedRCId, setSelectedRCId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchReferralCenters();
    }, [[currentPage, pageSize, search]]);

    const fetchReferralCenters = async () => {
        try {
            const data = await getReferralCenters(currentPage, pageSize, search);
            setReferralCenters(data.content);
            setTotalPages(data.totalPages);
        } catch (error) {
            console.error(error);
            toast.error("Failed to load Referral Centers");
        }
    };

    const handleDelete = async () => {
        try {
            await deleteReferralCenter(selectedRCId);
            toast.success("Referral Center deleted successfully");

            await fetchReferralCenters();

            setShowModal(false);
        } catch (error) {
            toast.error("Failed to delete referral center");
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
                            placeholder="Search referral center..."
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
                    to="add-referral-center"
                    className="btn btn-primary add-btn text-nowrap"
                >
                    Add Referral Center
                </NavLink>
            </div>

            <div className="table-responsive mt-3">
                <table className="table table-hover align-middle">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Type</th>
                            <th>Doctor</th>
                            <th>Contact Info</th>
                            <th>Address</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {referralCenters.length > 0 ? (
                            referralCenters.map((rc) => (
                                <tr key={rc.id}>
                                    <td>{rc.id}</td>
                                    <td className="text-nowrap">{rc.name}</td>
                                    <td>{rc.type}</td>
                                    <td>{rc.doctor.name}</td>
                                    <td>{rc.contactInfo}</td>
                                    <td>{rc.address}</td>
                                    <td className="text-nowrap">
                                        <button
                                            className="btn btn-warning btn-sm me-2"
                                            onClick={() => navigate(`edit-referral-center/${rc.id}`)}
                                        >
                                            <Pencil />
                                        </button>

                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => {
                                                setSelectedRCId(rc.id);
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
                                <td colSpan={8} className="text-center">
                                    No Referral Centers found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />

            <ConfirmationModal
                show={showModal}
                title="Delete Referral Center"
                message="Are you sure you want to delete this center"
                onConfirm={handleDelete}
                onClose={() => setShowModal(false)}
            />
        </>
    );
}

export default ReferralCenterList;
