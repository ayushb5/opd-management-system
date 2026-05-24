import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import { getPatientById, updatePatient } from "../../services/patientService";
import { toast } from "react-toastify";
import PatientForm from "../../components/patient/PatientForm"
import { getAllDoctors } from "../../services/doctorService";

function EditPatient() {
    const { id } = useParams();
    const navigate = useNavigate();

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

    const [patient, setPatient] = useState(initialValues);
    const [doctors, setDoctors] = useState([]);

    const fetchPatients = async () => {
        try {
            const data = await getPatientById(id);
            setPatient({
                doctorId: data.doctor.id,
                patient_name: data.patient_name,
                age: data.age,
                gender: data.gender,
                mobileno: data.mobileno,
                address: data.address,
                blood_group: data.blood_group || "",
                height: data.height,
                smoking: data.smoking || "",
                alcohol: data.alcohol || "",
                tobacco: data.tobacco || ""
            });
        } catch (error) {
            toast.error("Failed to load patient");
            console.log(error);
        }
    }

    const fetchDoctors = async () => {
        try {
            const data = await getAllDoctors();
            setDoctors(data);
        } catch (error) {
            toast.error("Failed to load doctors");
            console.log(error);
        }
    }

    useEffect(() => {
        fetchPatients();
        fetchDoctors();
    }, []);

    const handleSubmit = async (values) => {
        try {
            await updatePatient(id, values);
            toast.success("Patient updated successfully");
            navigate("/patients")
        } catch (error) {
            toast.error("Failed to update patient");
            console.log(error);
        }
    }

    return (
        <>
            <PatientForm doctors={doctors} initialValues={patient} onSubmit={handleSubmit} title="Update Patient" buttonText={"Update Patient"} />
        </>
    )
}

export default EditPatient