import Login from "./pages/Login"
import "./App.css";
import { Route, Routes } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";
import ProtectedRoute from "./routes/ProtectedRoute";
import AdminDashboard from "./pages/admin/AdminDashboard";
import DoctorDashboard from "./pages/doctor/DoctorDashboard";
import ReceptionistDashboard from "./pages/receptionist/ReceptionistDashboard";
import DoctorList from "./pages/admin/doctors/DoctorList";
import AddDoctor from "./pages/admin/doctors/AddDoctor";
import EditDoctor from "./pages/admin/doctors/EditDoctor";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route element={<DashboardLayout />}>

        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute allowedRole="ADMIN">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/doctors/"
        >
          <Route index element={
            <ProtectedRoute allowedRole="ADMIN">
              <DoctorList />
            </ProtectedRoute>
          }
          />

          <Route
            path="add-doctor"
            element={
              <ProtectedRoute allowedRole="ADMIN">
                <AddDoctor />
              </ProtectedRoute>
            }
          />

          <Route
            path="edit-doctor/:id"
            element={
              <ProtectedRoute allowedRole="ADMIN">
                <EditDoctor />
              </ProtectedRoute>
            }
          />

        </Route>

        <Route
          path="/doctor/dashboard"
          element={
            <ProtectedRoute allowedRole="DOCTOR">
              <DoctorDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/receptionist/dashboard"
          element={
            <ProtectedRoute allowedRole="RECEPTIONIST">
              <ReceptionistDashboard />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  )
}

export default App