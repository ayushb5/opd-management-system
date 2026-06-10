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
import ReceptionistList from "./pages/admin/receptionist/ReceptionistList";
import AddReceptionist from "./pages/admin/receptionist/AddReceptionist";
import EditReceptionist from "./pages/admin/receptionist/EditReceptionist";
import PatientList from "./pages/admin/patients/PatientList";
import AddPatient from "./pages/admin/patients/AddPatient"
import EditPatient from "./pages/admin/patients/EditPatient";
import VisitList from "./pages/admin/visits/VisitList";
import AddVisit from "./pages/admin/visits/AddVisit";
import EditVisit from "./pages/admin/visits/EditVisit";

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

        <Route path="/admin/receptionists">
          <Route index element={
            <ProtectedRoute allowedRole="ADMIN">
              <ReceptionistList />
            </ProtectedRoute>
          }
          />
          <Route
            path="add-receptionist"
            element={
              <ProtectedRoute allowedRole="ADMIN">
                <AddReceptionist />
              </ProtectedRoute>
            }
          />
          <Route
            path="edit-receptionist/:id"
            element={
              <ProtectedRoute allowedRole="ADMIN">
                <EditReceptionist />
              </ProtectedRoute>
            }
          />
        </Route>

        <Route path="/admin/patients">
          <Route index element={
            <ProtectedRoute allowedRole="ADMIN">
              <PatientList />
            </ProtectedRoute>
          }
          />
          <Route path="add-patient" element={
            <ProtectedRoute allowedRole="ADMIN">
              <AddPatient />
            </ProtectedRoute>
          }
          />
          <Route path="edit-patient/:id" element={
            <ProtectedRoute allowedRole="ADMIN">
              <EditPatient />
            </ProtectedRoute>
          }
          />
        </Route>

        <Route path="/admin/visits">
          <Route index element={
            <ProtectedRoute allowedRole="ADMIN">
              <VisitList />
            </ProtectedRoute>
          }
          />
          <Route path="add-visit" element={
            <ProtectedRoute allowedRole="ADMIN">
              <AddVisit />
            </ProtectedRoute>
          }
          />
          <Route path="edit-visit/:id" element={
            <ProtectedRoute allowedRole="ADMIN">
              <EditVisit />
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