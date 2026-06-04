import Login from "./pages/Login"
import "./App.css";
import { Route, Routes } from "react-router-dom";
import AdminDashboard from "./pages/admin/AdminDashboard";
import DoctorDashboard from "./pages/doctor/DoctorDashboard";
import ReceptionistDashboard from "./pages/receptionist/ReceptionistDashboard";
import DashboardLayout from "./layouts/DashboardLayout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route element={<DashboardLayout />}>
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
        <Route path="/receptionist/dashboard" element={<ReceptionistDashboard />} />
      </Route>
    </Routes>
  )
}

export default App