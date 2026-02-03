import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ROLES } from "./utils/constants";
import ProtectedRoute from "./components/common/ProtectedRoute";
import Layout from "./components/layout/Layout";

// Auth Pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";

// Admin Pages
import AdminDashboard from "./components/admin/AdminDashboard";
import ManageUsers from "./components/admin/ManageUsers";
import SystemSettings from "./components/admin/SystemSettings";

// Teacher Pages
import TeacherDashboard from "./components/teacher/TeacherDashboard";
import ManageClasses from "./components/teacher/ManageClasses";
import GradeAssignments from "./components/teacher/GradeAssignments";

// Student Pages
import StudentDashboard from "./components/student/StudentDashboard";
import MyCourses from "./components/student/MyCourses";
import MyGrades from "./components/student/MyGrades";

// Common Pages
import Profile from "./pages/Profile";

function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Protected Routes */}
        <Route
          element={
            <ProtectedRoute
              allowedRoles={[ROLES.ADMIN, ROLES.TEACHER, ROLES.STUDENT]}
            />
          }
        >
          <Route element={<Layout />}>
            {/* Redirect based on role */}
            <Route index element={<Navigate to="/admin/dashboard" replace />} />

            {/* Admin Routes */}
            <Route element={<ProtectedRoute allowedRoles={[ROLES.ADMIN]} />}>
              <Route path="admin/dashboard" element={<AdminDashboard />} />
              <Route path="admin/users" element={<ManageUsers />} />
              <Route path="admin/settings" element={<SystemSettings />} />
            </Route>

            {/* Teacher Routes */}
            <Route element={<ProtectedRoute allowedRoles={[ROLES.TEACHER]} />}>
              <Route path="teacher/dashboard" element={<TeacherDashboard />} />
              <Route path="teacher/classes" element={<ManageClasses />} />
              <Route path="teacher/grades" element={<GradeAssignments />} />
            </Route>

            {/* Student Routes */}
            <Route element={<ProtectedRoute allowedRoles={[ROLES.STUDENT]} />}>
              <Route path="student/dashboard" element={<StudentDashboard />} />
              <Route path="student/courses" element={<MyCourses />} />
              <Route path="student/grades" element={<MyGrades />} />
            </Route>

            {/* Common Routes */}
            <Route path="profile" element={<Profile />} />
          </Route>
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
