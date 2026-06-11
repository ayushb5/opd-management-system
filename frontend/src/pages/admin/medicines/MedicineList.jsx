import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
    deleteMedicine,
    getMedicines,
} from "../../../services/medicineService";
import { toast } from "react-toastify";
import { Pencil, Search, Trash } from "react-bootstrap-icons";
import ConfirmationModal from "../../../components/ConfirmationModal";

function MedicineList() {
    const [medicines, setMedicines] = useState([]);
    const [search, setSearch] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [selectedMedicineId, setSelectedMedicineId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchMedicines();
    }, []);

    const fetchMedicines = async () => {
        try {
            const medicineData = await getMedicines();
            setMedicines(medicineData);
        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = async () => {
        try {
            await deleteMedicine(selectedMedicineId);
            toast.success("Medicine deleted successfully");

            setMedicines(
                medicines.filter((medicine) => medicine.id != selectedMedicineId),
            );
            setShowModal(false);
        } catch (error) {
            toast.error("Failed to delete medicine");
            console.error(error);
        }
    };

    const filteredMedicines = medicines.filter(
        (medicine) =>
            medicine.medicineName?.toLowerCase().includes(search.toLocaleLowerCase()) ||
            medicine.type?.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ||
            medicine.doctor.name?.toLowerCase().includes(search.toLowerCase())
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
                            placeholder="Search medicines..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>

                <NavLink
                    to="add-medicine"
                    className="btn btn-primary add-btn text-nowrap"
                >
                    Add Medicine
                </NavLink>
            </div>

            <div className="table-responsive mt-3">
                <table className="table table-hover align-middle">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Medicine Name</th>
                            <th>Type</th>
                            <th>Doctor</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredMedicines.length > 0 ? (
                            filteredMedicines.map((medicine) => (
                                <tr key={medicine.id}>
                                    <td>{medicine.id}</td>
                                    <td className="text-nowrap">{medicine.medicineName}</td>
                                    <td>{medicine.type}</td>
                                    <td>{medicine.doctor.name}</td>
                                    <td className="text-nowrap">
                                        <button
                                            className="btn btn-warning btn-sm me-2"
                                            onClick={() => navigate(`edit-medicine/${medicine.id}`)}
                                        >
                                            <Pencil />
                                        </button>

                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => {
                                                setSelectedMedicineId(medicine.id);
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
                                <td colSpan={5} className="text-center">
                                    No Medicines found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <ConfirmationModal
                show={showModal}
                title="Delete Medicine"
                message="Are you sure you want to delete this medicine"
                onConfirm={handleDelete}
                onClose={() => setShowModal(false)}
            />
        </>
    );
}

export default MedicineList;
