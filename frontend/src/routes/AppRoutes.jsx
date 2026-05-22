import { BrowserRouter, Route, Routes } from "react-router-dom"
import Dashboard from "../pages/dashboard/Dashboard"
function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Dashboard />}></Route>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes