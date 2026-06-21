import { useEffect, useState } from "react";
import { Pencil, Search, Trash } from "react-bootstrap-icons";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import ConfirmationModal from "../ConfirmationModal";
import {
    deletePathologyTest,
    getByVisitId
} from "../../services/pathologyTestService";

function VisitPathologyTestList({ visitId, refreshKey = 0 }) {
    const [pathologyTests, setPathologyTests] = useState([]);
    const [search, setSearch] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [selectedTestId, setSelectedTestId] = useState(null);

    const navigate = useNavigate();
    const location = useLocation();
    const basePath = location.pathname.startsWith("/doctor/visits")
        ? "/doctor/visits"
        : "/admin/visits";

    useEffect(() => {
        const fetchTests = async () => {
            try {
                const data = await getByVisitId(visitId);
                console.log("Fetched pathology tests:", data);
                setPathologyTests(data);
            } catch (error) {
                toast.error("Failed to load pathology tests");
                console.error(error);
            }
        };

        fetchTests();
    }, [visitId, refreshKey]);


    const handleDelete = async () => {
        try {
            await deletePathologyTest(selectedTestId);

            toast.success("Pathology test deleted successfully");

            setPathologyTests((previous) =>
                previous.filter(
                    (test) =>
                        test.id !== selectedTestId
                )
            );

            setShowModal(false);
        } catch (error) {
            toast.error("Failed to delete pathology test");
            console.error(error);
        }
    };

    const filteredTests = pathologyTests.filter((test) =>
        test.testMaster?.testName
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
                            placeholder="Search Pathology Test..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>

                <NavLink
                    to={`${basePath}/${visitId}/add-pathology-test`}
                    className="btn btn-primary add-btn text-nowrap"
                >
                    Add Pathology Test
                </NavLink>

            </div >

            <div className="table-responsive mt-3">
                <table className="table table-hover align-middle">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Test Name</th>
                            <th>Result</th>
                            <th>Remarks</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredTests.length > 0 ? (
                            filteredTests.map((test, index) => (
                                <tr key={test.id}>
                                    <td>{index + 1}</td>
                                    <td>{test.testMaster?.testName}</td>
                                    <td>{test.result || "-"}</td>
                                    <td>{test.remarks || "-"}</td>

                                    <td className="text-nowrap">
                                        <button
                                            className="btn btn-warning btn-sm me-2"
                                            onClick={() =>
                                                navigate(
                                                    `${basePath}/${visitId}/edit-pathology-test/${test.id}`
                                                )
                                            }
                                        >
                                            <Pencil />
                                        </button>

                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => {
                                                setSelectedTestId(
                                                    test.id
                                                );
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
                                <td
                                    colSpan="5"
                                    className="text-center text-muted"
                                >
                                    No pathology tests found
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
    );
}

export default VisitPathologyTestList;