import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { NAVIGATION, ROLES } from "../../utils/constants";
import * as Icons from "react-icons/fi";

const getIcon = (iconName) => {
  const IconComponent = Icons[iconName];
  return IconComponent ? <IconComponent /> : <Icons.FiHelpCircle />;
};

const Sidebar = () => {
  const { user, logout } = useAuth();

  const getNavigation = () => {
    switch (user?.role) {
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

  return (
    <aside className="w-64 bg-white shadow-md h-screen sticky top-0">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-primary-600">LMS Pro</h1>
        <p className="text-gray-500 text-sm capitalize">{user?.role} Panel</p>
        <div className="mt-4 flex items-center space-x-3">
          <img
            src={user?.avatar}
            alt={user?.name}
            className="h-10 w-10 rounded-full"
          />
          <div>
            <p className="font-medium">{user?.name}</p>
            <p className="text-sm text-gray-500 capitalize">{user?.role}</p>
          </div>
        </div>
      </div>

      <nav className="px-4">
        <ul className="space-y-2">
          {navigation.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? "bg-primary-50 text-primary-600"
                      : "text-gray-700 hover:bg-gray-100"
                  }`
                }
              >
                <span className="text-lg">{getIcon(item.icon)}</span>
                <span>{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="absolute bottom-0 w-full p-4 border-t">
        <button
          onClick={logout}
          className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-100 w-full rounded-lg"
        >
          <Icons.FiLogOut />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
