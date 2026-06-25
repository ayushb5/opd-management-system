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
import ReferralCenterList from "./components/referralCenter/ReferralCenterList";
import AddReferralCenter from "./components/referralCenter/AddReferralCenter";
import EditReferralCenter from "./components/referralCenter/EditReferralCenter";
import Visits from "./pages/doctor/visits/Visits";
import VisitDetails from "./components/visit/VisitDetails";
import AddPrescription from "./components/prescription/AddPrescription";
import EditPrescription from "./components/prescription/EditPrescription";
import TestMaster from "./pages/admin/testMasters/TestMaster";
import AddTestMaster from "./components/testMaster/AddTestMaster";
import EditTestMaster from "./components/testMaster/EditTestMaster";
import Diagnostic from "./pages/admin/diagnostics/Diagnostic";
import AddDiagnostic from "./components/diagnostic/AddDiagnostic";
import EditDiagnostic from "./components/diagnostic/EditDiagnostic";
import AddVisitDiagnostic from "./components/visitDiagnostic/AddDiagnostic";
import EditVisitDiagnostic from "./components/visitDiagnostic/EditDiagnostic";
import Bill from "./pages/admin/bills/Bill";
import AddBill from "./components/bill/AddBill";
import EditBill from "./components/bill/EditBill";
import PathologyTestList from "./components/pathologyTest/PathologyTestList";
import AddPathologyTest from "./components/pathologyTest/AddPathologyTest";
import EditPathologyTest from "./components/pathologyTest/EditPathologyTest";
import AddVisitPathologyTest from "./components/visitPathologyTest/AddVisitPathologyTest";
import EditVisitPathologyTest from "./components/visitPathologyTest/EditVisitPathologyTest";
import BillDetails from "./components/bill/BillDetails";
import FollowUpList from "./components/followup/FollowUpList";
import AddReferral from "./components/referral/AddReferral";
import EditReferral from "./components/referral/EditReferral";

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
          {/* Admin -> visit -> diagnostic */}
          <Route
            path=":visitId/add-diagnostic"
            element={
              <ProtectedRoute allowedRole="ADMIN">
                <AddVisitDiagnostic />
              </ProtectedRoute>
            }
          />

          <Route
            path=":visitId/edit-diagnostic/:diagnosticId"
            element={
              <ProtectedRoute allowedRole="ADMIN">
                <EditVisitDiagnostic />
              </ProtectedRoute>
            }
          />

          {/* Admin -> visit -> pathology test */}
          <Route
            path=":visitId/add-pathology-test"
            element={
              <ProtectedRoute allowedRole="ADMIN">
                <AddVisitPathologyTest />
              </ProtectedRoute>
            }
          />

          <Route
            path=":visitId/edit-pathology-test/:testId"
            element={
              <ProtectedRoute allowedRole="ADMIN">
                <EditVisitPathologyTest />
              </ProtectedRoute>
            }
          />

          {/* ADMIN- VISIT DETAILS */}
          <Route path=":id" element={
            <ProtectedRoute allowedRole="ADMIN">
              <VisitDetails />
            </ProtectedRoute>
          }
          />

          {/* Admin -> Visit -> Prescription */}

          <Route path=":id/add-prescription/:visitId" element={
            <ProtectedRoute allowedRole="ADMIN">
              <AddPrescription />
            </ProtectedRoute>
          } />

          <Route path=":id/edit-prescription/:id" element={
            <ProtectedRoute allowedRole="ADMIN">
              <EditPrescription />
            </ProtectedRoute>
          } />

          {/* Admin -> Visit -> Referral */}
          <Route path=":visitId/add-referral" element={
            <ProtectedRoute allowedRole="ADMIN">
              <AddReferral />
            </ProtectedRoute>
          } />
          <Route path=":visitId/edit-referral/:id" element={
            <ProtectedRoute allowedRole="ADMIN">
              <EditReferral />
            </ProtectedRoute>
          } />

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

        {/* Admin - Diagnostic */}
        <Route path="/admin/diagnostics">
          <Route index element={
            <ProtectedRoute allowedRole="ADMIN">
              <Diagnostic />
            </ProtectedRoute>
          } />
          <Route path="add-diagnostic" element={
            <ProtectedRoute allowedRole="ADMIN">
              <AddDiagnostic />
            </ProtectedRoute>
          }
          />
          <Route path="edit-diagnostic/:id" element={
            <ProtectedRoute allowedRole="ADMIN">
              <EditDiagnostic />
            </ProtectedRoute>
          }
          />
        </Route>

        {/* Admin - Bill */}
        <Route path="/admin/bills">
          <Route index element={
            <ProtectedRoute allowedRole="ADMIN">
              <Bill />
            </ProtectedRoute>
          } />
          <Route path="add-bill" element={
            <ProtectedRoute allowedRole="ADMIN">
              <AddBill />
            </ProtectedRoute>
          }
          />
          <Route
            path="add/:visitId"
            element={
              <ProtectedRoute allowedRole="ADMIN">
                <AddBill />
              </ProtectedRoute>
            }
          />
          <Route path="edit-bill/:id" element={
            <ProtectedRoute allowedRole="ADMIN">
              <EditBill />
            </ProtectedRoute>
          }
          />
          <Route path="view/:id" element={
            <ProtectedRoute allowedRole="ADMIN">
              <BillDetails />
            </ProtectedRoute>
          }
          />

        </Route>

        {/* Admin - Pathology Test */}
        <Route path="/admin/pathology-tests">
          <Route index element={
            <ProtectedRoute allowedRole="ADMIN">
              <PathologyTestList />
            </ProtectedRoute>
          } />
          <Route path="add-pathology-test" element={
            <ProtectedRoute allowedRole="ADMIN">
              <AddPathologyTest />
            </ProtectedRoute>
          }
          />
          <Route path="edit-pathology-test/:id" element={
            <ProtectedRoute allowedRole="ADMIN">
              <EditPathologyTest />
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
          <Route path="edit-visit/:id" element={
            <ProtectedRoute allowedRole="DOCTOR">
              <EditVisit />
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

          {/* DOCTOR -> visit -> diagnostic */}
          <Route
            path=":visitId/add-diagnostic"
            element={
              <ProtectedRoute allowedRole="DOCTOR">
                <AddVisitDiagnostic />
              </ProtectedRoute>
            }
          />

          <Route
            path=":visitId/edit-diagnostic/:diagnosticId"
            element={
              <ProtectedRoute allowedRole="DOCTOR">
                <EditVisitDiagnostic />
              </ProtectedRoute>
            }
          />

          {/* Doctor -> visit -> pathology test */}
          <Route
            path=":visitId/add-pathology-test"
            element={
              <ProtectedRoute allowedRole="DOCTOR">
                <AddVisitPathologyTest />
              </ProtectedRoute>
            }
          />

          <Route
            path=":visitId/edit-pathology-test/:testId"
            element={
              <ProtectedRoute allowedRole="DOCTOR">
                <EditVisitPathologyTest />
              </ProtectedRoute>
            }
          />

          <Route
            path="add"
            element={
              <ProtectedRoute allowedRole="DOCTOR">
                <AddVisit />
              </ProtectedRoute>
            }
          />

          {/* DOCTOR -> Visit -> Referral */}
          <Route path=":visitId/add-referral" element={
            <ProtectedRoute allowedRole="DOCTOR">
              <AddReferral />
            </ProtectedRoute>
          } />
          <Route path=":visitId/edit-referral/:id" element={
            <ProtectedRoute allowedRole="DOCTOR">
              <EditReferral />
            </ProtectedRoute>
          } />
        </Route>

        {/* DOCTOR->FollowUp */}

        <Route
          path="/doctor/follow-ups"
          element={
            <ProtectedRoute allowedRole="DOCTOR">
              <FollowUpList />
            </ProtectedRoute>
          }
        />
        {/* RECEPTIONIST */}
        <Route
          path="/receptionist/dashboard"
          element={
            <ProtectedRoute allowedRole="RECEPTIONIST">
              <ReceptionistDashboard />
            </ProtectedRoute>
          }
        />

        {/* Receptionist - Patient */}
        <Route
          path="/receptionist/patients/"
        >
          <Route index element={
            <ProtectedRoute allowedRole="RECEPTIONIST">
              <PatientList />
            </ProtectedRoute>
          }
          />

          <Route
            path="add-patient"
            element={
              <ProtectedRoute allowedRole="RECEPTIONIST">
                <AddPatient />
              </ProtectedRoute>
            }
          />

          <Route
            path="edit-patient/:id"
            element={
              <ProtectedRoute allowedRole="RECEPTIONIST">
                <EditPatient />
              </ProtectedRoute>
            }
          />
        </Route>

        {/* RECEPTIONIST - Visit */}
        <Route path="/receptionist/visits">
          <Route index element={
            <ProtectedRoute allowedRole="RECEPTIONIST">
              <VisitList />
            </ProtectedRoute>
          }
          />
          <Route path="add-visit" element={
            <ProtectedRoute allowedRole="RECEPTIONIST">
              <AddVisit />
            </ProtectedRoute>
          }
          />
          <Route path="edit-visit/:id" element={
            <ProtectedRoute allowedRole="RECEPTIONIST">
              <EditVisit />
            </ProtectedRoute>
          }
          />
          {/* Receptionist -> visit -> diagnostic */}
          <Route
            path=":visitId/add-diagnostic"
            element={
              <ProtectedRoute allowedRole="RECEPTIONIST">
                <AddVisitDiagnostic />
              </ProtectedRoute>
            }
          />

          <Route
            path=":visitId/edit-diagnostic/:diagnosticId"
            element={
              <ProtectedRoute allowedRole="RECEPTIONIST">
                <EditVisitDiagnostic />
              </ProtectedRoute>
            }
          />

          {/* Receptionist -> visit -> pathology test */}
          <Route
            path=":visitId/add-pathology-test"
            element={
              <ProtectedRoute allowedRole="RECEPTIONIST">
                <AddVisitPathologyTest />
              </ProtectedRoute>
            }
          />

          <Route
            path=":visitId/edit-pathology-test/:testId"
            element={
              <ProtectedRoute allowedRole="RECEPTIONIST">
                <EditVisitPathologyTest />
              </ProtectedRoute>
            }
          />

          {/* RECEPTIONIST- VISIT DETAILS */}
          <Route path=":id" element={
            <ProtectedRoute allowedRole="RECEPTIONIST">
              <VisitDetails />
            </ProtectedRoute>
          }
          />

          {/* Receptionist -> Visit -> Prescription */}

          <Route path=":id/add-prescription/:visitId" element={
            <ProtectedRoute allowedRole="RECEPTIONIST">
              <AddPrescription />
            </ProtectedRoute>
          } />

          <Route path=":id/edit-prescription/:id" element={
            <ProtectedRoute allowedRole="RECEPTIONIST">
              <EditPrescription />
            </ProtectedRoute>
          } />

          {/* Receptionist -> Visit -> Referral */}
          <Route path=":visitId/add-referral" element={
            <ProtectedRoute allowedRole="RECEPTIONIST">
              <AddReferral />
            </ProtectedRoute>
          } />
          <Route path=":visitId/edit-referral/:id" element={
            <ProtectedRoute allowedRole="RECEPTIONIST">
              <EditReferral />
            </ProtectedRoute>
          } />
        </Route>

        {/* RECEPTIONIST - Bill */}
        <Route path="/receptionist/bills">
          <Route index element={
            <ProtectedRoute allowedRole="RECEPTIONIST">
              <Bill />
            </ProtectedRoute>
          } />
          <Route path="add-bill" element={
            <ProtectedRoute allowedRole="RECEPTIONIST">
              <AddBill />
            </ProtectedRoute>
          }
          />
          <Route
            path="add/:visitId"
            element={
              <ProtectedRoute allowedRole="RECEPTIONIST">
                <AddBill />
              </ProtectedRoute>
            }
          />
          <Route path="edit-bill/:id" element={
            <ProtectedRoute allowedRole="RECEPTIONIST">
              <EditBill />
            </ProtectedRoute>
          }
          />
          <Route path="view/:id" element={
            <ProtectedRoute allowedRole="RECEPTIONIST">
              <BillDetails />
            </ProtectedRoute>
          }
          />
        </Route>

        {/* Receptionist - Referrral Center */}
        <Route path="/receptionist/referral-centers">
          <Route index element={
            <ProtectedRoute allowedRole="RECEPTIONIST">
              <ReferralCenterList />
            </ProtectedRoute>
          }
          />
          <Route path="add-referral-center" element={
            <ProtectedRoute allowedRole="RECEPTIONIST">
              <AddReferralCenter />
            </ProtectedRoute>
          }
          />
          <Route path="edit-referral-center/:id" element={
            <ProtectedRoute allowedRole="RECEPTIONIST">
              <EditReferralCenter />
            </ProtectedRoute>
          }
          />
        </Route>

      </Route>
    </Routes>
  )
}

export default App