import Login from "./pages/Login"
import "./App.css";
import { Route, Routes } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";
import ProtectedRoute from "./routes/ProtectedRoute";
import AdminDashboard from "./pages/admin/AdminDashboard";
import DoctorDashboard from "./pages/doctor/DoctorDashboard";
import ReceptionistDashboard from "./pages/receptionist/ReceptionistDashboard";
import DoctorList from "./components/doctor/DoctorList";
import AddDoctor from "./components/doctor/AddDoctor";
import EditDoctor from "./components/doctor/EditDoctor";
import ReceptionistList from "./components/receptionist/ReceptionistList";
import AddReceptionist from "./components/receptionist/AddReceptionist";
import EditReceptionist from "./components/receptionist/EditReceptionist";
import PatientList from "./components/patient/PatientList";
import AddPatient from "./components/patient/AddPatient"
import EditPatient from "./components/patient/EditPatient";
import VisitList from "./components/visit/VisitList";
import AddVisit from "./components/visit/AddVisit";
import EditVisit from "./components/visit/EditVisit";
import MedicineList from "./components/medicine/MedicineList";
import AddMedicine from "./components/medicine/AddMedicine";
import EditMedicine from "./components/medicine/EditMedicine";
import ReferralCenterList from "./pages/admin/referralCenter/ReferralCenterList";
import AddReferralCenter from "./pages/admin/referralCenter/AddReferralCenter";
import EditReferralCenter from "./pages/admin/referralCenter/EditReferralCenter";
import Visits from "./pages/doctor/visits/Visits";
import VisitDetails from "./pages/doctor/visits/VisitDetails";
import AddPrescription from "./pages/doctor/visits/prescription/AddPrescription";
import EditPrescription from "./pages/doctor/visits/prescription/EditPrescription";
import TestMaster from "./pages/admin/testMasters/TestMaster";
import AddTestMaster from "./components/testMaster/AddTestMaster";
import EditTestMaster from "./components/testMaster/EditTestMaster";

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
        {/* Admin - Test Master */}
        <Route path="/admin/test-masters">
          <Route index element={
            <ProtectedRoute allowedRole="ADMIN">
              <TestMaster />
            </ProtectedRoute>
          } />
          <Route path="add-test-master" element={
            <ProtectedRoute allowedRole="ADMIN">
              <AddTestMaster />
            </ProtectedRoute>
          }
          />
          <Route path="edit-test-master/:id" element={
            <ProtectedRoute allowedRole="ADMIN">
              <EditTestMaster />
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
          <Route path=":id/add-prescription/:visitId" element={
            <ProtectedRoute allowedRole="DOCTOR">
              <AddPrescription />
            </ProtectedRoute>
          } />

          <Route path=":id/edit-prescription/:id" element={
            <ProtectedRoute allowedRole="DOCTOR">
              <EditPrescription />
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