import { createContext, useContext, useState, useEffect } from "react";
import { ROLES } from "../utils/constants";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

// Mock users data
const MOCK_USERS = [
  {
    id: "1",
    email: "admin@lms.com",
    password: "admin123",
    name: "Admin User",
    role: ROLES.ADMIN,
    avatar:
      "https://ui-avatars.com/api/?name=Admin+User&background=3B82F6&color=fff",
    department: "Administration",
    createdAt: "2023-01-01",
  },
  {
    id: "2",
    email: "teacher@lms.com",
    password: "teacher123",
    name: "John Smith",
    role: ROLES.TEACHER,
    avatar:
      "https://ui-avatars.com/api/?name=John+Smith&background=10B981&color=fff",
    department: "Computer Science",
    courses: ["CS101", "CS102"],
    createdAt: "2023-02-15",
  },
  {
    id: "3",
    email: "student@lms.com",
    password: "student123",
    name: "Alice Johnson",
    role: ROLES.STUDENT,
    avatar:
      "https://ui-avatars.com/api/?name=Alice+Johnson&background=8B5CF6&color=fff",
    studentId: "S001",
    enrollmentDate: "2023-09-01",
    courses: ["CS101", "MATH101"],
  },
];

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem("lms_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    // Find user in mock data
    const foundUser = MOCK_USERS.find(
      (u) => u.email === email && u.password === password,
    );

    if (foundUser) {
      // Remove password from user object before storing
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      localStorage.setItem("lms_user", JSON.stringify(userWithoutPassword));
      return { success: true, user: userWithoutPassword };
    }

    return { success: false, message: "Invalid credentials" };
  };

  const register = (userData) => {
    // In a real app, this would be an API call
    const newUser = {
      id: Date.now().toString(),
      ...userData,
      role: ROLES.STUDENT, // Default role for registration
      avatar: `https://ui-avatars.com/api/?name=${userData.name}&background=8B5CF6&color=fff`,
      createdAt: new Date().toISOString().split("T")[0],
    };

    // Remove password from stored object
    const { password, ...userWithoutPassword } = newUser;
    setUser(userWithoutPassword);
    localStorage.setItem("lms_user", JSON.stringify(userWithoutPassword));
    return { success: true, user: userWithoutPassword };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("lms_user");
  };

  const updateProfile = (updates) => {
    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
    localStorage.setItem("lms_user", JSON.stringify(updatedUser));
  };

  const hasPermission = (permission) => {
    if (!user) return false;
    // In a real app, this would check user's role permissions
    return user.role === ROLES.ADMIN; // Admin has all permissions
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        updateProfile,
        hasPermission,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
