import Navbar from "../components/common/Navbar"
import Sidebar from "../components/common/Sidebar"

function MainLayout({ children }) {
    return (
        <>
            <Navbar />

            <div className="d-flex">
                <Sidebar />
                <main className="p-4 flex-grow-1">
                    {children}
                </main>
            </div>
        </>
    )
}

export default MainLayout