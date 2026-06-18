import { useEffect, useState } from "react"
import { Search } from "react-bootstrap-icons"
import { NavLink, useNavigate } from "react-router-dom"
import { Pencil, Trash } from "react-bootstrap-icons";
import ConfirmationModal from "../ConfirmationModal";
import { toast } from "react-toastify"
import { deleteBill, getBills } from "../../services/billService";

function BillList() {
    const [bills, setBills] = useState([]);
    const [search, setSearch] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [selectBillId, setSelecetedBillId] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        fetchBills();
    }, [])

    const fetchBills = async () => {
        try {
            const billsData = await getBills();
            setBills(billsData);
        } catch (error) {
            console.error(error);
        }
    }

    const handleDelete = async () => {
        try {
            await deleteBill(selectBillId);
            toast.success("Doctor deleted successfully");

            setBills(
                bills.filter(bill => bill.id != selectBillId)
            );
            setShowModal(false);
        } catch (error) {
            toast.error("Failed to delete bill");
            console.error(error);
        }
    }

    const filteredBills = bills.filter((bill) =>
        bill.visit?.patient?.patientName
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
                            placeholder="Search Bill..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>

                <NavLink
                    to="add-bill"
                    className="btn btn-primary add-btn text-nowrap"
                >
                    Add Bill
                </NavLink>

            </div>

            <div className="table-responsive mt-3">
                <table className="table table-hover align-middle">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th className="text-nowrap">Visit ID</th>
                            <th className="text-nowrap">Total Amount</th>
                            <th className="text-nowrap">Paid Amount</th>
                            <th className="text-nowrap">Pending Amount</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredBills.length > 0 ? (
                            filteredBills.map((bill) => (
                                <tr key={bill.id}>
                                    <td>{bill.id}</td>
                                    <td className="text-nowrap">{bill.visit.patient.patientName}</td>
                                    <td>{bill.totalAmount}</td>
                                    <td>{bill.paidAmount}</td>
                                    <td>{bill.pendingAmount}</td>
                                    <td>{bill.paymentStatus}</td>
                                    <td className="text-nowrap">
                                        <button className="btn btn-warning btn-sm me-2"
                                            onClick={() => navigate(`edit-bill/${bill.id}`)}
                                        >
                                            <Pencil />
                                        </button>

                                        <button className="btn btn-danger btn-sm"
                                            onClick={() => {
                                                setSelecetedBillId(bill.id);
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
                                <td colSpan={7} className="text-center">
                                    No Bill found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <ConfirmationModal
                show={showModal}
                title="Delete Bill"
                message="Are you sure you want to delete this bill?"
                onConfirm={handleDelete}
                onClose={() => setShowModal(false)}
            />
        </>
    )
}

export default BillList