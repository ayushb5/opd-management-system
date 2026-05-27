import { BrowserRouter, Route, Routes } from "react-router-dom"
import Dashboard from "../pages/dashboard/Dashboard"
import PatientList from "../pages/patient/PatientList"
import AddPatient from "../pages/patient/AddPatient"
import MainLayout from "../layouts/MainLayout"
import DoctorList from "../pages/doctor/DoctorList"
import AddDoctor from "../pages/doctor/AddDoctor"
import EditDoctor from "../pages/doctor/EditDoctor"
import EditPatient from "../pages/patient/EditPatient"
import Login from "../pages/auth/login/Login"
import Signup from "../pages/auth/signup/Signup"
import ResetPassword from "../pages/auth/login/ResetPassword"
function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<MainLayout />}>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/patients" element={<PatientList />} />
                    <Route path="/patients/add-patient" element={<AddPatient />} />
                    <Route path="/patients/edit-patient/:id" element={<EditPatient />} />
                    <Route path="/doctors" element={<DoctorList />} />
                    <Route path="/doctors/add-doctor" element={<AddDoctor />} />
                    <Route path="/doctors/edit-doctor/:id" element={<EditDoctor />} />
                </Route>
                <Route path="/auth/login" element={<Login />} />
                <Route path="auth/login/reset-password" element={<ResetPassword />} />
                <Route path="/auth/signup" element={<Signup />} />
            </Routes >
        </BrowserRouter >
    )
}

export default AppRoutes