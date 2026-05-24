import { useNavigate } from "react-router-dom"
import PatientForm from "../../components/patient/PatientForm"
import { toast } from "react-toastify";
import { addPatient } from "../../services/patientService";
import { useEffect, useState } from "react";
import { getAllDoctors } from "../../services/doctorService"

function AddPatient() {
    const navigate = useNavigate();
    const [doctors, setDoctors] = useState([]);

    const initialValues = {
        doctorId: "",
        patient_name: "",
        age: "",
        gender: "",
        mobileno: "",
        address: "",
        blood_group: "",
        height: "",
        smoking: "",
        alcohol: "",
        tobacco: ""
    }

    const handleSubmit = async (values) => {
        try {
            await addPatient(values);
            toast.success("Patient added successfully");
            navigate("/patients");
        } catch (error) {
            toast.error("Failed to add patient");
            console.log(error);
        }
    }

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const data = await getAllDoctors();
                setDoctors(data);
            } catch (error) {
                console.log(error);
                toast.error("Failed to load doctors");
            }
        }
        fetchDoctors();
    }, [])

    return (
        <PatientForm doctors={doctors} initialValues={initialValues} onSubmit={handleSubmit} title={"Add Patient"} buttonText={"Save Patient"} />
    )
}

export default AddPatient