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
import MedicineList from "./pages/admin/medicines/MedicineList";
import AddMedicine from "./pages/admin/medicines/AddMedicine";
import EditMedicine from "./pages/admin/medicines/EditMedicine";
import ReferralCenterList from "./pages/admin/referralCenter/ReferralCenterList";
import AddReferralCenter from "./pages/admin/referralCenter/AddReferralCenter";
import EditReferralCenter from "./pages/admin/referralCenter/EditReferralCenter";
import Visits from "./pages/doctor/visits/Visits";
import VisitDetails from "./pages/doctor/visits/VisitDetails";
import AddPrescription from "./pages/doctor/visits/prescription/AddPrescription";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route element={<DashboardLayout />}>

        {/* Admin */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute allowedRole="ADMIN">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* Admin - Doctor */}
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
        {/* Admin - Receptionist */}
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
        {/* Admin - Patient */}
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
        {/* Admin - Visit */}
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

        {/* Admin - Medicine */}
        <Route path="/admin/medicines">
          <Route index element={
            <ProtectedRoute allowedRole="ADMIN">
              <MedicineList />
            </ProtectedRoute>
          }
          />
          <Route path="add-medicine" element={
            <ProtectedRoute allowedRole="ADMIN">
              <AddMedicine />
            </ProtectedRoute>
          }
          />
          <Route path="edit-medicine/:id" element={
            <ProtectedRoute allowedRole="ADMIN">
              <EditMedicine />
            </ProtectedRoute>
          }
          />
        </Route>

        {/* Admin - Referrral Center */}
        <Route path="/admin/referral-centers">
          <Route index element={
            <ProtectedRoute allowedRole="ADMIN">
              <ReferralCenterList />
            </ProtectedRoute>
          }
          />
          <Route path="add-referral-center" element={
            <ProtectedRoute allowedRole="ADMIN">
              <AddReferralCenter />
            </ProtectedRoute>
          }
          />
          <Route path="edit-referral-center/:id" element={
            <ProtectedRoute allowedRole="ADMIN">
              <EditReferralCenter />
            </ProtectedRoute>
          }
          />
        </Route>

        {/* Doctor */}
        <Route
          path="/doctor/dashboard"
          element={
            <ProtectedRoute allowedRole="DOCTOR">
              <DoctorDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/doctor/visits/"
        >
          <Route index element={
            <ProtectedRoute allowedRole="DOCTOR">
              <Visits />
            </ProtectedRoute>
          }
          />
          <Route path=":id" element={
            <ProtectedRoute allowedRole="DOCTOR">
              <VisitDetails />
            </ProtectedRoute>
          }
          />

          {/* Doctor-Visits-Prescription */}
          <Route path=":id/add-prescription" element={
            <ProtectedRoute allowedRole="DOCTOR">
              <AddPrescription />
            </ProtectedRoute>
          } />
        </Route>

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