import { useEffect, useState } from "react"
import { Search } from "react-bootstrap-icons"
import { NavLink } from "react-router-dom"
import { Pencil, Trash } from "react-bootstrap-icons";
import { getDoctors } from "../../../services/doctorService";
function DoctorList() {
    const [doctors, setDoctors] = useState([]);
    const [search, setSearch] = useState("");

    const fetchDoctors = async () => {
        try {
            const doctorsData = await getDoctors();
            setDoctors(doctorsData);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchDoctors();
    }, [])

    const filteredDoctors = doctors.filter((doctor) =>
        doctor.name?.toLowerCase().includes(search.toLowerCase()) ||
        doctor.specialization?.toLowerCase().includes(search.toLowerCase()) ||
        doctor.mobile?.includes(search)
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
                            placeholder="Search doctors..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>

                <NavLink
                    to="add-doctor"
                    className="btn btn-primary add-doctor-btn text-nowrap"
                >
                    Add Doctor
                </NavLink>

            </div>

            <div className="table-responsive mt-3">
                <table className="table table-hover align-middle">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Specialization</th>
                            <th>Mobile</th>
                            <th>Email</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredDoctors.length > 0 ? (
                            filteredDoctors.map((doctor) => (
                                <tr key={doctor.id}>
                                    <td>{doctor.id}</td>
                                    <td className="text-nowrap">{doctor.name}</td>
                                    <td>{doctor.specialization}</td>
                                    <td>{doctor.mobileno}</td>
                                    <td>{doctor.email}</td>
                                    <td className="text-nowrap">
                                        <button className="btn btn-warning btn-sm me-2">
                                            <Pencil />
                                        </button>

                                        <button className="btn btn-danger btn-sm">
                                            <Trash />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={6} className="text-center">
                                    No doctors found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default DoctorList