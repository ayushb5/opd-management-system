import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Pencil, Search, Trash } from "react-bootstrap-icons";
import { getByVisitId, deleteReferral } from "../../services/referralService"
import ConfirmationModal from "../ConfirmationModal";

function ReferralList({ visitId, patientId, doctorId }) {
    const [referrals, setReferralls] = useState([]);
    const [search, setSearch] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [selectReferralId, setSelectedReferralId] = useState(null);
    const navigate = useNavigate();

    const user =
        JSON.parse(localStorage.getItem("user")) ||
        JSON.parse(sessionStorage.getItem("user"));
    const role = user?.role;

    useEffect(() => {
        fetchReferral();
    }, [visitId]);

    const fetchReferral = async () => {
        try {
            const referralData = await getByVisitId(visitId);
            setReferralls(referralData);
        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = async () => {
        try {
            await deleteReferral(selectReferralId);
            toast.success("Referral deleted successfully");

            setReferralls(
                referrals.filter((rc) => rc.id != selectReferralId),
            );
            setShowModal(false);
        } catch (error) {
            toast.error("Failed to delete referrals");
            console.error(error);
        }
    };

    const formatDateTime = (dateTime) => {
        if (!dateTime) return "-";

        return new Date(dateTime).toLocaleString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    const filteredReferrals = referrals.filter((referral) => {
        const query = search.toLowerCase();

        return (
            referral.referralCenter?.name?.toLowerCase().includes(query) ||
            referral.referralCenter?.type?.toLowerCase().includes(query) ||
            referral.noteType?.toLowerCase().includes(query) ||
            referral.reason?.toLowerCase().includes(query) ||
            referral.details?.toLowerCase().includes(query)
        );
    });

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
                            placeholder="Search referral..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>

                <button
                    type="button"
                    className="btn btn-primary add-btn text-nowrap"
                    onClick={() =>
                        navigate(
                            role === "DOCTOR"
                                ? `/doctor/visits/${visitId}/add-referral`
                                : `/admin/visits/${visitId}/add-referral`,
                            {
                                state: {
                                    visitId,
                                    patientId,
                                    doctorId,
                                },
                            }
                        )
                    }
                >
                    Add Referral
                </button>
            </div>

            <div className="table-responsive mt-3">
                <table className="table table-hover align-middle">
                    <thead>
                        <tr>
                            <th>Referral Center</th>
                            <th>Center Type</th>
                            <th>Note Type</th>
                            <th>Reason</th>
                            <th>Details</th>
                            <th>Referred On</th>
                            <th className="text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredReferrals.length > 0 ? (
                            filteredReferrals.map((referral) => (
                                <tr key={referral.id}>
                                    <td className="fw-semibold">
                                        {referral.referralCenter?.name || "-"}
                                    </td>

                                    <td>
                                        {referral.referralCenter?.type || "-"}
                                    </td>

                                    <td>{referral.noteType || "-"}</td>

                                    <td>{referral.reason || "-"}</td>

                                    <td>{referral.details || "-"}</td>

                                    <td>
                                        {formatDateTime(referral.createdAt)}
                                    </td>
                                    <td className="text-nowrap">
                                        <button
                                            className="btn btn-warning btn-sm me-2"
                                            onClick={() => navigate(`edit-referral/${referral.id}`)}
                                        >
                                            <Pencil />
                                        </button>

                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => {
                                                setSelectedReferralId(referral.id);
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
                                    No Referral found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <ConfirmationModal
                show={showModal}
                title="Delete Referral"
                message="Are you sure you want to delete this referral"
                onConfirm={handleDelete}
                onClose={() => setShowModal(false)}
            />
        </>
    );
}

export default ReferralList;
