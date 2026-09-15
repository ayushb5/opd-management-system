import {
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
} from "recharts";

function DonutDistributionChart({
    data = [],
    title = "Distribution",
    badgeText = "Today",
    colors = ["#0d6efd", "#198754", "#ffc107", "#dc3545"],
}) {
    // Formats { name: "UPI", value: 10 } or { mode: "UPI", amount: 5000 }
    const chartData = data.map((item) => ({
        name: item.name || item.mode || "Unknown",
        value: item.value || Number(item.amount) || item.count || 0,
    }));

    return (
        <div className="card shadow-sm border-0 h-100">
            <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-2">
                    <h5 className="card-title mb-0 fw-bold text-dark">{title}</h5>
                    <span className="badge bg-secondary-subtle text-secondary border">{badgeText}</span>
                </div>

                {chartData.length === 0 ? (
                    <div className="d-flex justify-content-center align-items-center text-muted" style={{ height: 260 }}>
                        No records found.
                    </div>
                ) : (
                    <div style={{ width: "100%", height: 260 }}>
                        <ResponsiveContainer>
                            <PieChart>
                                <Tooltip contentStyle={{ backgroundColor: "#fff", borderRadius: "8px", border: "1px solid #dee2e6" }} />
                                <Legend verticalAlign="bottom" height={36} iconType="circle" />
                                <Pie data={chartData} cx="50%" cy="45%" innerRadius={55} outerRadius={80} paddingAngle={4} dataKey="value">
                                    {chartData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                                    ))}
                                </Pie>
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                )}
            </div>
        </div>
    );
}

export default DonutDistributionChart;
