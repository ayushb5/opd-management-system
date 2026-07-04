import { Outlet } from "react-router-dom"
import { useState } from "react"
import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"

function DashboardLayout() {
    const [user, setUser] = useState(
        JSON.parse(localStorage.getItem("user")) ||
        JSON.parse(sessionStorage.getItem("user"))
    );
    return (
        <div className="container-fluid">
            <div className="row min-vh-100">
                <div className="col-lg-2 p-0 d-none d-lg-block">
                    <Sidebar showTitle={true} />
                </div>
                <div
                    className="offcanvas offcanvas-start p-0"
                    id="sidebarOffCanvas"
                    tabIndex={-1}
                    style={{ width: "280px" }}
                >
                    <div className="offcanvas-header bg-dark">
                        <h5 className="text-white">City Care Hospital</h5>
                        <button
                            type="button"
                            className="btn-close mb-1 bg-light"
                            data-bs-dismiss="offcanvas"
                        ></button>
                    </div>

                    <div className="offcanvas-body p-0 overflow-hidden">
                        <Sidebar showTitle={false} />
                    </div>
                </div>
                <div className="col-12 col-lg-10 p-0">
                    <Navbar user={user} />
                    <div className="p-4">
                        <Outlet context={{ user, setUser }} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DashboardLayout