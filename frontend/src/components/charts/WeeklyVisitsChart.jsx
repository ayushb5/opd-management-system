import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts"

function WeeklyVisitsChart({ data = [], title = "Weekly Patient Visits" }) {
    const chartData = data.map((item) => ({
        day: new Date(item.date).toLocaleDateString("en-US", { weekday: "short" }),
        date: item.date,
        visits: item.count,
    }))
    return (
        <div className="card shadow-sm border-0 h-100">
            <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h5 className="card-title mb-0 fw-bold text-dark">{title}</h5>
                    <span className="badge bg-primary-subtle text-primary border border-primary-subtle">Last 7 Days</span>
                </div>
                {chartData.length === 0 ? (
                    <div className="d-flex justify-content-center align-items-center text-muted" style={{ height: 260 }}>
                        No visits recorded this week yet.
                    </div>
                ) : (
                    <div style={{ width: "100%", height: 260 }}>
                        <ResponsiveContainer>
                            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="visitGrad" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#0d6efd" stopOpacity={0.4} />
                                        <stop offset="95%" stopColor="#0d6efd" stopOpacity={0.0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                                <XAxis dataKey="day" tickLine={false} axisLine={false} tick={{ fill: "#6c757d", fontSize: 12 }} />
                                <YAxis tickLine={false} axisLine={false} tick={{ fill: "#6c757d", fontSize: 12 }} allowDecimals={false} />
                                <Tooltip
                                    formatter={(value) => [`${value} Patients`, "Visits"]}
                                    labelFormatter={(label, payload) => payload?.[0]?.payload?.date || label}
                                    contentStyle={{ backgroundColor: "#fff", borderRadius: "8px", border: "1px solid #dee2e6" }}
                                />
                                <Area type="monotone" dataKey="visits" stroke="#0d6efd" strokeWidth={3} fillOpacity={1} fill="url(#visitGrad)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                )}
            </div>
        </div>
    )
}

export default WeeklyVisitsChart