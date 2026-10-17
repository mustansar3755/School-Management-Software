import { Route, Routes } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout";
import DashboardLayout from "./layouts/DashboardLayout";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";
import AddStudent from "./pages/AddStudent";
import Teachers from "./pages/Teachers";
import AddTeacher from "./pages/AddTeacher";
import Attendance from "./pages/Attendance";
import Fees from "./pages/Fees";
import Diary from "./pages/Diary";

export default function App() {
  return (
    <Routes>
      {/* Login: AuthLayout ke andar */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
      </Route>

      {/* Baaki pages: DashboardLayout (sidebar + topbar) ke andar */}
      <Route element={<DashboardLayout />}>
        {/* Temporary: jab Dashboard page banayenge tab isko replace karenge */}
        <Route path="/" element={<Dashboard />} />
        <Route path="/students" element={<Students />} />
        <Route path="/students/add" element={<AddStudent />} />
        {/* Teacher ROUTES */}
        <Route path="/teachers" element={<Teachers />} />
        <Route path="/teachers/add" element={<AddTeacher />} />
        {/* OTHERS ROUTES */}
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/fees" element={<Fees />} />
        <Route path="/diary" element={<Diary />} />
      </Route>
    </Routes>
  );
}
