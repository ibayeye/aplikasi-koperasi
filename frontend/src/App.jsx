import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import RolebasedRoute from "./components/RolebasedRoute";
import LoginPage from "./pages/LoginPage";
import MainLayout from "./layouts/MainLayout";
import Dashboard from "./pages/Dashboard";
import LoansPage from "./pages/employee/LoansPage";
import SavingsPage from "./pages/employee/SavingsPage";
import SettlementsPage from "./pages/employee/SettlementsPage";
import SavingsAdmin from "./pages/admin/SavingsAdmin";
import LoansAdmin from "./pages/admin/LoansAdmin";
import SettlementsAdmin from "./pages/admin/SettlementsAdmin";
import ListLoansPage from "./pages/employee/ListLoansPage";
import AddSavingsAdmin from "./pages/admin/AddSavingsAdmin";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { restoreAuthHeaders } from "./store/slices/authSlice";

function App() {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(restoreAuthHeaders());
  }, [dispatch]);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={
            isAuthenticated ? <Navigate to="/" replace /> : <LoginPage />
          }
        />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />

          {/* KARYAWAN */}
          <Route
            path="employee/add-loans"
            element={
              <RolebasedRoute allowedRoles={["karyawan"]}>
                <LoansPage />
              </RolebasedRoute>
            }
          />
          <Route
            path="employee/add-loans"
            element={
              <RolebasedRoute allowedRoles={["karyawan"]}>
                <LoansPage />
              </RolebasedRoute>
            }
          />
          <Route
            path="employee/loans"
            element={
              <RolebasedRoute allowedRoles={["karyawan"]}>
                <ListLoansPage />
              </RolebasedRoute>
            }
          />
          <Route
            path="employee/savings"
            element={
              <RolebasedRoute allowedRoles={["karyawan"]}>
                <SavingsPage />
              </RolebasedRoute>
            }
          />
          <Route
            path="employee/settlements"
            element={
              <RolebasedRoute allowedRoles={["karyawan"]}>
                <SettlementsPage />
              </RolebasedRoute>
            }
          />

          {/* ADMIN */}
          <Route
            path="admin/savings"
            element={
              <RolebasedRoute allowedRoles={["admin"]}>
                <SavingsAdmin />
              </RolebasedRoute>
            }
          />
          <Route
            path="add-savings"
            element={
              <RolebasedRoute allowedRoles={["admin"]}>
                <AddSavingsAdmin />
              </RolebasedRoute>
            }
          />

          <Route
            path="admin/loans"
            element={
              <RolebasedRoute allowedRoles={["admin"]}>
                <LoansAdmin />
              </RolebasedRoute>
            }
          />
          <Route
            path="admin/settlements"
            element={
              <RolebasedRoute allowedRoles={["admin"]}>
                <SettlementsAdmin />
              </RolebasedRoute>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
