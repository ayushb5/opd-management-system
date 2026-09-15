import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
} from "recharts";

function MonthlyVisitsChart({ data = [], title = "Monthly Consultations" }) {
    // Map { month: "Sep", count: 12 }
    const chartData = data.map((item) => ({
        month: item.month,
        count: item.count,
    }));

    return (
        <div className="card shadow-sm border-0 h-100">
            <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h5 className="card-title mb-0 fw-bold text-dark">{title}</h5>
                    <span className="badge bg-success-subtle text-success border border-success-subtle">
                        All Time
                    </span>
                </div>

                {chartData.length === 0 ? (
                    <div className="d-flex justify-content-center align-items-center text-muted" style={{ height: 260 }}>
                        No monthly data recorded yet.
                    </div>
                ) : (
                    <div style={{ width: "100%", height: 260 }}>
                        <ResponsiveContainer>
                            <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                                <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fill: "#6c757d", fontSize: 12 }} />
                                <YAxis tickLine={false} axisLine={false} tick={{ fill: "#6c757d", fontSize: 12 }} allowDecimals={false} />
                                <Tooltip
                                    formatter={(value) => [`${value} Consultations`, "Total"]}
                                    contentStyle={{ backgroundColor: "#fff", borderRadius: "8px", border: "1px solid #dee2e6" }}
                                />
                                <Bar dataKey="count" fill="#198754" radius={[6, 6, 0, 0]} barSize={32} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                )}
            </div>
        </div>
    );
}

export default MonthlyVisitsChart;
