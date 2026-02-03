import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { NAVIGATION, ROLES } from "../../utils/constants";
import * as Icons from "react-icons/fi";

const getIcon = (iconName) => {
  const IconComponent = Icons[iconName];
  return IconComponent ? <IconComponent /> : <Icons.FiHelpCircle />;
};

const Sidebar = ({ mobile, onClose }) => {
  const { user, logout } = useAuth();

  const getNavigation = () => {
    if (!user) return [];

    switch (user.role) {
      case ROLES.ADMIN:
        return NAVIGATION.ADMIN;
      case ROLES.TEACHER:
        return NAVIGATION.TEACHER;
      case ROLES.STUDENT:
        return NAVIGATION.STUDENT;
      default:
        return [];
    }
  };

  const navigation = getNavigation();

  const handleNavClick = () => {
    if (mobile && onClose) {
      onClose();
    }
  };

  const SidebarContent = () => (
    <>
      {/* Logo and user info */}
      <div className="p-6 border-b">
        <h1 className="text-2xl font-bold text-primary-600">LMS Pro</h1>
        <p className="text-gray-500 text-sm capitalize mt-1">
          {user?.role} Panel
        </p>

        {user && (
          <div className="mt-6 flex items-center space-x-3">
            <img
              src={user.avatar}
              alt={user.name}
              className="h-10 w-10 rounded-full border-2 border-white shadow"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {user.name}
              </p>
              <p className="text-xs text-gray-500 truncate capitalize">
                {user.role}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
        {navigation.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={handleNavClick}
            className={({ isActive }) =>
              `flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                isActive
                  ? "bg-primary-50 text-primary-600"
                  : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              }`
            }
            end={item.path === "/dashboard"}
          >
            <span className="mr-3 text-lg">{getIcon(item.icon)}</span>
            {item.label}
          </NavLink>
        ))}
      </nav>

      {/* Help section */}
      <div className="p-6 border-t">
        <div className="bg-gradient-to-r from-primary-50 to-primary-100 rounded-lg p-4">
          <h3 className="font-semibold text-primary-700 text-sm">Need Help?</h3>
          <p className="text-xs text-primary-600 mt-1">
            Contact our support team
          </p>
          <a
            href="mailto:support@lmspro.edu"
            className="mt-3 inline-block text-xs bg-primary-600 hover:bg-primary-700 text-white px-3 py-1 rounded-md transition-colors"
          >
            Get Help
          </a>
        </div>
      </div>
    </>
  );

  if (mobile) {
    return <SidebarContent />;
  }

  return (
    <aside className="w-64 bg-white shadow-lg h-screen sticky top-0 flex flex-col">
      <SidebarContent />

      {/* Logout button at bottom */}
      <div className="p-4 border-t">
        <button
          onClick={logout}
          className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <Icons.FiLogOut className="mr-2" />
          Sign Out
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
