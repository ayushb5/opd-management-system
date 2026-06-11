function DashboardCard({ title, count, icon }) {
    return (
        <div className="card shadow-sm border-0 h-100">
            <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                    <div>
                        <h6 className="text-muted text-nowrap">{title}</h6>
                        <h3>{count}</h3>
                    </div>

                    <div className="fs-1 text-primary">
                        {icon}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DashboardCard