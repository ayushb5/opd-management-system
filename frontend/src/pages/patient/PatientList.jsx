import { useEffect, useState } from "react"
import { getAllPatients } from "../../services/patientService"
import { NavLink } from "react-router-dom";

function PatientList() {
    const [patients, setPatients] = useState([]);
    const [filteredPatients, setFilteredPatients] = useState([]);
    const [search, setSearch] = useState("");

    const fetchPatients = async () => {
        try {
            const data = await getAllPatients();
            setPatients(data);
            setFilteredPatients(data);
        } catch (error) {
            console.log(error);
        }
    }

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearch(value);
        if (value.trim() === "") {
            setFilteredPatients(patients);
            return;
        }
        const filtered = patients.filter((patient) =>
            patient.name
                .toLowerCase()
                .includes(value.toLowerCase())
        );
        setFilteredPatients(filtered);
    }

    const handleDelete = (id) => {
        console.log("Delete patient: ", id);
    }

    useEffect(() => {
        fetchPatients();
    }, []);

    return (
        <>
            <div className="d-flex justify-content-center mb-2">
                <input type="text" placeholder="Search here.." className="p-1" value={search} onChange={handleSearch} />
                <NavLink to={"/patients/add-patient"} className="btn btn-success ms-2">Add Patient</NavLink>
            </div>
            <table className="table">
                <thead>
                    <tr>
                        <th>S.No</th>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Gender</th>
                        <th>Mobile</th>
                        <th>Blood Group</th>
                        <th>Height</th>
                        <th>Smoking</th>
                        <th>Alcohol</th>
                        <th>Tobacco</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredPatients.length > 0 ? (
                        filteredPatients.map((patient) => (
                            <tr key={patient.id}>
                                <td>{patient.id}</td>
                                <td>{patient.name}</td>
                                <td>{patient.age}</td>
                                <td>{patient.gender}</td>
                                <td>{patient.mobileno}</td>
                                <td>{patient.blood_group}</td>
                                <td>{patient.height}</td>
                                <td>{patient.smoking}</td>
                                <td>{patient.alcohol}</td>
                                <td>{patient.tobacco}</td>
                                <td>
                                    <div className="d-flex gap-2">
                                        <NavLink to={`/edit-patient/${patient.id}`} className={"btn btn-warning btn-sm"}>Edit</NavLink>
                                        <button onClick={() => handleDelete(patient.id)} className={"btn btn-danger btn-sm"}>Delete</button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={"11"} className="text-center">
                                No Patients found
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </ >
    )
}

export default PatientList