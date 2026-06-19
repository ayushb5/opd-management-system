import { useEffect, useState } from "react"
import { Search } from "react-bootstrap-icons"
import { NavLink, useNavigate } from "react-router-dom"
import { Pencil, Trash } from "react-bootstrap-icons";
import ConfirmationModal from "../ConfirmationModal";
import { toast } from "react-toastify"
import { deletePathologyTest, getPathologyTests } from "../../services/pathologyTestService"

function PathologyTestList() {
    const [pathologyTests, setPathologyTests] = useState([]);
    const [search, setSearch] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [selectedPathologyTestId, setSelectedPathologyTestId] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        fetchPathologyTests();
    }, [])

    const fetchPathologyTests = async () => {
        try {
            const pathologyTestData = await getPathologyTests();
            setPathologyTests(pathologyTestData);
            console.log(pathologyTestData);
        } catch (error) {
            console.error(error);
        }
    }

    const handleDelete = async () => {
        try {
            await deletePathologyTest(selectedPathologyTestId);
            toast.success("Pathology Test deleted successfully");

            setPathologyTests(
                pathologyTests.filter(pathologyTest => pathologyTest.id !== selectedPathologyTestId)
            );
            setShowModal(false);
        } catch (error) {
            toast.error("Failed to delete pathology test");
            console.error(error);
        }
    }

    const filteredPathologyTest = pathologyTests.filter((pathologyTest) =>
        pathologyTest.visit?.patient?.patientName
            ?.toLowerCase()
            .includes(search.toLowerCase()) ||

        pathologyTest.testMaster?.testName
            ?.toLowerCase()
            .includes(search.toLowerCase()) ||

        pathologyTest.result
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
                            placeholder="Search Patient..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>

                <NavLink
                    to="add-pathology-test"
                    className="btn btn-primary add-btn text-nowrap"
                >
                    Add Pathology Test
                </NavLink>

            </div>

            <div className="table-responsive mt-3">
                <table className="table table-hover align-middle">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Patient</th>
                            <th>Visit</th>
                            <th>Test</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredPathologyTest.length > 0 ? (
                            filteredPathologyTest.map((pathologyTest) => (
                                <tr key={pathologyTest.id}>
                                    <td>{pathologyTest.id}</td>
                                    <td>{pathologyTest.visit?.patient?.patientName}</td>
                                    <td>{pathologyTest.visit.id}</td>
                                    <td>{pathologyTest.testMaster?.testName}</td>
                                    <td>
                                        {new Date(pathologyTest.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="text-nowrap">
                                        <button className="btn btn-warning btn-sm me-2"
                                            onClick={() => navigate(`edit-pathology-test/${pathologyTest.id}`)}
                                        >
                                            <Pencil />
                                        </button>

                                        <button className="btn btn-danger btn-sm"
                                            onClick={() => {
                                                setSelectedPathologyTestId(pathologyTest.id);
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
                                <td colSpan={6} className="text-center">
                                    No Pathology Test found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <ConfirmationModal
                show={showModal}
                title="Delete Pathology Test"
                message="Are you sure you want to delete this pathology test?"
                onConfirm={handleDelete}
                onClose={() => setShowModal(false)}
            />
        </>
    )
}

export default PathologyTestList