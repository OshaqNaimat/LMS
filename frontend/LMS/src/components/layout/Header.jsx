import { useState, useEffect } from "react";
import { FiBell, FiSearch, FiUser, FiMenu, FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Header = ({ onMenuClick }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // Mock notifications
    setNotifications([
      {
        id: 1,
        title: "New Assignment Posted",
        message: "Data Structures Assignment #3 has been posted",
        time: "2 hours ago",
        read: false,
        type: "assignment",
      },
      {
        id: 2,
        title: "Grade Updated",
        message: "Your grade for Calculus I has been updated",
        time: "1 day ago",
        read: true,
        type: "grade",
      },
      {
        id: 3,
        title: "Announcement",
        message: "Midterm schedule has been released",
        time: "2 days ago",
        read: true,
        type: "announcement",
      },
    ]);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // In a real app, this would search across the system
      console.log("Searching for:", searchQuery);
    }
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left side - Menu button and search */}
          <div className="flex items-center">
            <button
              onClick={onMenuClick}
              className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
            >
              <FiMenu className="h-6 w-6" />
            </button>

            <form onSubmit={handleSearch} className="ml-4 hidden md:block">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiSearch className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search students, courses, assignments..."
                  className="block w-64 pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                />
              </div>
            </form>
          </div>

          {/* Right side - User menu and notifications */}
          <div className="flex items-center space-x-4">
            {/* Notifications dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(false)}
                className="p-1 rounded-full text-gray-400 hover:text-gray-500 relative"
              >
                <FiBell className="h-6 w-6" />
                {unreadCount > 0 && (
                  <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white"></span>
                )}
              </button>

              {/* Notifications dropdown content */}
              <div className="hidden group-hover:block absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg py-1 z-10">
                <div className="px-4 py-2 border-b">
                  <h3 className="text-sm font-semibold text-gray-900">
                    Notifications
                  </h3>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.length > 0 ? (
                    notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`px-4 py-3 hover:bg-gray-50 ${!notification.read ? "bg-blue-50" : ""}`}
                      >
                        <div className="flex items-start">
                          <div className="flex-shrink-0">
                            {notification.type === "assignment" && (
                              <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                                <span className="text-blue-600 text-sm font-medium">
                                  A
                                </span>
                              </div>
                            )}
                            {notification.type === "grade" && (
                              <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                                <span className="text-green-600 text-sm font-medium">
                                  G
                                </span>
                              </div>
                            )}
                            {notification.type === "announcement" && (
                              <div className="h-8 w-8 rounded-full bg-yellow-100 flex items-center justify-center">
                                <span className="text-yellow-600 text-sm font-medium">
                                  N
                                </span>
                              </div>
                            )}
                          </div>
                          <div className="ml-3 flex-1">
                            <p className="text-sm font-medium text-gray-900">
                              {notification.title}
                            </p>
                            <p className="mt-1 text-sm text-gray-500">
                              {notification.message}
                            </p>
                            <p className="mt-1 text-xs text-gray-400">
                              {notification.time}
                            </p>
                          </div>
                          {!notification.read && (
                            <div className="ml-3">
                              <span className="h-2 w-2 bg-blue-600 rounded-full"></span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="px-4 py-3 text-center text-gray-500">
                      No notifications
                    </div>
                  )}
                </div>
                <div className="border-t px-4 py-2">
                  <button className="text-sm text-primary-600 hover:text-primary-700">
                    View all notifications
                  </button>
                </div>
              </div>
            </div>

            {/* User profile dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center space-x-3 p-1 rounded-full hover:bg-gray-100"
              >
                <div className="flex items-center space-x-3">
                  <img
                    src={
                      user?.avatar || "https://ui-avatars.com/api/?name=User"
                    }
                    alt="Profile"
                    className="h-8 w-8 rounded-full"
                  />
                  <div className="hidden md:block text-left">
                    <p className="text-sm font-medium text-gray-700">
                      {user?.name || "User"}
                    </p>
                    <p className="text-xs text-gray-500 capitalize">
                      {user?.role || "Student"}
                    </p>
                  </div>
                </div>
              </button>

              {/* Profile dropdown menu */}
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 border">
                  <div className="px-4 py-2 border-b">
                    <p className="text-sm font-medium text-gray-900">
                      {user?.name}
                    </p>
                    <p className="text-xs text-gray-500">{user?.email}</p>
                  </div>
                  <a
                    href="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Profile Settings
                  </a>
                  <a
                    href="/settings"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Account Settings
                  </a>
                  <a
                    href="/help"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Help & Support
                  </a>
                  <div className="border-t">
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <FiLogOut className="mr-2" />
                      Sign out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile search bar */}
        <div className="md:hidden pb-4">
          <form onSubmit={handleSearch}>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              />
            </div>
          </form>
        </div>
      </div>
    </header>
  );
};

export default Header;
