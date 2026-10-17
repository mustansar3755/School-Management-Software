import { Route, Routes } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout";
import DashboardLayout from "./layouts/DashboardLayout";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

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
      </Route>
    </Routes>
  );
}
