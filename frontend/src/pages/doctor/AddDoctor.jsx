import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify";
import { addDoctor } from "../../services/doctorService";
import DoctorForm from "../../components/doctor/DoctorForm";

function AddDoctor() {

    const navigate = useNavigate();
    const initialValues = {
        name: "",
        email: "",
        specialization: "",
        clinic_name: "",
        address: "",
        mobileno: "",
        status: "TRIAL"
    }

    const handleSubmit = async (values) => {
        try {
            await addDoctor(values);
            toast.success("Doctor added successfully")
            navigate("/doctors");
        } catch (error) {
            toast.error("Failed to add doctor");
            console.log(error);
        }
    }

    return (
        <>
            <DoctorForm initialValues={initialValues} onSubmit={handleSubmit} title={"Add Doctor"} buttonText={"Save Doctor"} />
        </>
    )
}

export default AddDoctor