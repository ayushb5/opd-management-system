import { useEffect, useState } from "react";
import { Search, Pencil, Trash } from "react-bootstrap-icons";
import { NavLink, useNavigate } from "react-router-dom";
import ConfirmationModal from "../../components/ConfirmationModal";
import { toast } from "react-toastify";
import { deleteTestMaster, getTestMasters } from "../../services/testMasterService";

function TestMasterList() {

    const [testMaster, setTestMaster] = useState([]);
    const [search, setSearch] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [selectedTestMasterId, setSelectedTestMasterId] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        fetchTestMaster();
    }, []);

    const fetchTestMaster = async () => {
        try {
            const data = await getTestMasters();
            setTestMaster(data);
        } catch (error) {
            console.error(error);
            toast.error("Failed to load Test Masters");
        }
    };

    const handleDelete = async () => {
        try {
            await deleteTestMaster(selectedTestMasterId);

            toast.success("Test Master deleted successfully");

            setTestMaster(
                testMaster.filter(
                    testMaster => testMaster.id !== selectedTestMasterId
                )
            );

            setShowModal(false);
        } catch (error) {
            toast.error("Failed to delete Test Master");
            console.error(error);
        }
    };

    const filteredTestMaster = testMaster.filter(
        (testMaster) =>
            testMaster.doctor?.name
                ?.toLowerCase()
                .includes(search.toLowerCase()) ||

            testMaster.testName?.toLowerCase().includes(search.toLowerCase())
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
                            placeholder="Search test name or doctor..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>

                <NavLink
                    to="add-test-master"
                    className="btn btn-primary add-btn text-nowrap"
                >
                    Add Test Master
                </NavLink>

            </div>

            <div className="table-responsive mt-3">
                <table className="table table-hover align-middle">

                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Doctor name</th>
                            <th>Test name</th>
                            <th>Normal Range</th>
                            <th>Unit</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {filteredTestMaster.length > 0 ? (
                            filteredTestMaster.map((testMaster) => (
                                <tr key={testMaster.id}>
                                    <td>{testMaster.id}</td>

                                    <td className="text-nowrap">{testMaster.doctor.name}</td>

                                    <td className="text-nowrap">
                                        {testMaster.testName}
                                    </td>

                                    <td>
                                        {testMaster.normalRange}
                                    </td>

                                    <td>
                                        {testMaster.unit}
                                    </td>

                                    <td className="text-nowrap">
                                        <button
                                            className="btn btn-warning btn-sm me-2"
                                            onClick={() =>
                                                navigate(
                                                    `edit-test-master/${testMaster.id}`
                                                )
                                            }
                                        >
                                            <Pencil />
                                        </button>

                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => {
                                                setSelectedTestMasterId(testMaster.id);
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
                                    colSpan={6}
                                    className="text-center"
                                >
                                    No Tests found
                                </td>
                            </tr>
                        )}

                    </tbody>

                </table>
            </div>

            <ConfirmationModal
                show={showModal}
                title="Delete Test Master"
                message="Are you sure you want to delete this Test Master?"
                onConfirm={handleDelete}
                onClose={() => setShowModal(false)}
            />
        </>
    );
}

export default TestMasterList;