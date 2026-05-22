import MainLayout from "../../layouts/MainLayout"

function Dashboard() {
    return (
        <MainLayout>
            <h1 className="mb-4">Dashboard</h1>

            <div className="row g-4">
                <div className="col-md-3">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <h5>Total Patients</h5>
                            <h2>0</h2>
                        </div>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <h5>Total Doctors</h5>
                            <h2>0</h2>
                        </div>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <h5>Total Visits</h5>
                            <h2>0</h2>
                        </div>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <h5>Total Bills</h5>
                            <h2>0</h2>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    )
}

export default Dashboard