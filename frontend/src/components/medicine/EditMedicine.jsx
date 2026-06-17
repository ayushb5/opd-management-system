import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify"
import { ArrowLeft } from "react-bootstrap-icons";
import { getMedicine, updateMedicine } from "../../services/medicineService";
import MedicineForm from "./MedicineForm";
function EditDoctor() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);

    const [initialValues, setInitialValues] = useState({
        doctorId: "",
        medicineName: "",
        type: ""
    });

    useEffect(() => {
        fetchMedicines();
    }, []);

    const fetchMedicines = async () => {
        try {
            const medicine = await getMedicine(id);
            setInitialValues({
                doctorId: medicine.doctor.id || "",
                medicineName: medicine.medicineName || "",
                type: medicine.type || ""
            })
        } catch (error) {
            toast.error("Failed to load medicine");
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            await updateMedicine(id, values);
            toast.success("Medicine updated successfully");
            navigate("/admin/medicines/");
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to update medicine");
            console.error(error);
        } finally {
            setSubmitting(false);
        }
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div className="d-flex justify-content-between align-items-center">
                <span className="fs-2 fw-semibold">Edit Medicine</span>
                <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => navigate("/admin/medicines")}
                >
                    <ArrowLeft className="me-2" />
                    Go Back
                </button>
            </div>
            <MedicineForm initialValues={initialValues} onSubmit={handleSubmit} isEdit={true} />
        </>
    )
}

export default EditDoctor