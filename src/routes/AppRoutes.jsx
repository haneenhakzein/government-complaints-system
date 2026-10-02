import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login/Login";
import DashboardLayout from "../layout/DashboardLayout";
import Complaints from "../pages/Complaints/Complaints";
import Employees from "../pages/Employees/Employees";
import Entities from "../pages/Entities/Entities";
import Reports from "../pages/Reports/Reports";
import Settings from "../pages/Settings/Settings";
import ProtectedRoute from "./ProtectedRoute";
import GuestRoute from "./GuestRoute";

export default function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <GuestRoute>
            <Login />
          </GuestRoute>
        }
      />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route path="complaints" element={<Complaints />} />
        <Route
          path="employees"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <Employees />
            </ProtectedRoute>
          }
        />
        <Route path="entities" element={<Entities />} />
        <Route path="reports" element={<Reports />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}
