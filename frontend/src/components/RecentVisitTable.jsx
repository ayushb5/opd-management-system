function RecentVisitTable({ recentVisits }) {

    const getStatusBadge = (status) => {
        switch (status) {
            case "WAITING":
                return <span className="badge bg-warning">Waiting</span>;

            case "IN_CONSULTATION":
                return <span className="badge bg-primary">In Consultation</span>;

            case "COMPLETED":
                return <span className="badge bg-success">Completed</span>;

            case "CANCELLED":
                return <span className="badge bg-danger">Cancelled</span>;

            default:
                return <span className="badge bg-secondary">Unknown</span>;
        }
    };

    return (
        <div className="card shadow-sm">
            <div className="card-header">
                <h5 className="mb-0">Recent Visits</h5>
            </div>
            <div className="card-body">
                <div className="table-responsive">
                    <table className="table table-hover align-middle">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Patient</th>
                                <th>Doctor</th>
                                <th className="text-nowrap">Visit Date</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentVisits.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan={5}
                                        className="text-center"
                                    >
                                        No Recent visits found
                                    </td>
                                </tr>
                            ) : (
                                recentVisits.map((visit, index) => (
                                    <tr key={visit.visitId}>
                                        <td>{index + 1}</td>
                                        <td className="text-nowrap">{visit.patientName}</td>
                                        <td className="text-nowrap">{visit.doctorName}</td>
                                        <td className="text-nowrap">{visit.visitDate}</td>
                                        <td>{getStatusBadge(visit.status)}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div >
        </div >
    )
}

export default RecentVisitTable