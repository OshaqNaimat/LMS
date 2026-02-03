import { useState } from "react";
import {
  FiX,
  FiHome,
  FiUsers,
  FiBook,
  FiCalendar,
  FiClipboard,
  FiBarChart2,
  FiSettings,
  FiUser,
  FiLogOut,
} from "react-icons/fi";
import { useAuth } from "../../context/AuthContext";
import { NavLink } from "react-router-dom";

const MobileMenu = ({ isOpen, onClose }) => {
  const { user, logout } = useAuth();

  const menuItems = [
    { icon: <FiHome />, label: "Dashboard", path: "/dashboard" },
    { icon: <FiUsers />, label: "Students", path: "/students" },
    { icon: <FiBook />, label: "Courses", path: "/courses" },
    { icon: <FiCalendar />, label: "Calendar", path: "/calendar" },
    { icon: <FiClipboard />, label: "Grades", path: "/grades" },
    { icon: <FiBarChart2 />, label: "Reports", path: "/reports" },
    { icon: <FiSettings />, label: "Settings", path: "/settings" },
    { icon: <FiUser />, label: "Profile", path: "/profile" },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-gray-600 bg-opacity-75 transition-opacity"
        onClick={onClose}
      />

      {/* Menu panel */}
      <div className="fixed inset-y-0 left-0 max-w-xs w-full bg-white shadow-xl transition-transform transform translate-x-0">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-6 border-b">
            <div className="flex items-center">
              <img
                src={user?.avatar || "https://ui-avatars.com/api/?name=User"}
                alt="Profile"
                className="h-10 w-10 rounded-full"
              />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">
                  {user?.name}
                </p>
                <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
            >
              <FiX className="h-6 w-6" />
            </button>
          </div>

          {/* Menu items */}
          <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
            {menuItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center px-3 py-3 text-base font-medium rounded-md ${
                    isActive
                      ? "bg-primary-50 text-primary-600"
                      : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  }`
                }
              >
                <span className="mr-3 text-lg">{item.icon}</span>
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* Footer */}
          <div className="border-t p-4">
            <div className="p-3 bg-blue-50 rounded-lg mb-4">
              <p className="text-sm text-blue-800">
                <span className="font-medium">Need help?</span> Our support team
                is available 24/7.
              </p>
              <a
                href="mailto:support@lmspro.edu"
                className="mt-2 inline-block text-sm text-blue-600 hover:text-blue-700"
              >
                Contact support →
              </a>
            </div>
            <button
              onClick={() => {
                logout();
                onClose();
              }}
              className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              <FiLogOut className="mr-2" />
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
