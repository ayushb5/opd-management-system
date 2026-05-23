import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { getDoctorById, updateDoctor } from "../../services/doctorService";
import { toast } from "react-toastify";
import DoctorForm from "../../components/doctor/DoctorForm";

function EditDoctor() {
    const { id } = useParams();
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

    const [doctor, setDoctor] = useState(initialValues);

    const fetchDoctor = async () => {
        try {
            const data = await getDoctorById(id);
            setDoctor(data);
        } catch (error) {
            console.log(error);
            toast.error("Failed to load doctor");
        }
    }

    useEffect(() => {
        fetchDoctor();
    }, []);

    const handleSubmit = async (values) => {
        try {
            await updateDoctor(id, values);
            toast.success("Doctor updated successfully");
            navigate("/doctors");
        } catch (error) {
            toast.error("Failed to update doctor");
            console.log(error);
        }
    }

    return (
        <>
            <DoctorForm initialValues={doctor} onSubmit={handleSubmit} title={"Update Doctor"} buttonText={"Update Doctor"} />
        </>
    )
}

export default EditDoctor