import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"
import { useState } from "react"

function DashboardLayout() {
    const [showSidebar, setShowSidebar] = useState(false);

    return (
        <div className="container-fluid">
            <div className="row min-vh-100">
                <div className="col-lg-2 p-0 d-none d-lg-block">
                    <Sidebar />
                </div>
                <div className="offcanvas offcanvas-start" id="sidebarOffCanvas" tabIndex={-1}>
                    <div className="offcanvas-body p-0">
                        <Sidebar />
                    </div>
                </div>
                <div className="col-lg-10 p-0">
                    <Navbar />
                    <div className="p-4">
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DashboardLayout