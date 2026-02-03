import { useLocation, Link } from "react-router-dom";
import { FiChevronRight, FiHome } from "react-icons/fi";

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  const getBreadcrumbName = (path) => {
    const names = {
      dashboard: "Dashboard",
      admin: "Admin",
      teacher: "Teacher",
      student: "Student",
      students: "Students",
      courses: "Courses",
      attendance: "Attendance",
      grades: "Grades",
      reports: "Reports",
      calendar: "Calendar",
      settings: "Settings",
      profile: "Profile",
      users: "Users",
      analytics: "Analytics",
      classes: "Classes",
      assignments: "Assignments",
      "my-courses": "My Courses",
      "my-grades": "My Grades",
      system: "System",
    };

    return names[path] || path.charAt(0).toUpperCase() + path.slice(1);
  };

  return (
    <nav className="flex mb-6" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        <li>
          <Link to="/dashboard" className="text-gray-400 hover:text-gray-500">
            <FiHome className="h-5 w-5" />
          </Link>
        </li>

        {pathnames.map((value, index) => {
          const to = `/${pathnames.slice(0, index + 1).join("/")}`;
          const isLast = index === pathnames.length - 1;

          return (
            <li key={to} className="flex items-center">
              <FiChevronRight className="h-4 w-4 text-gray-400 mx-2" />
              {isLast ? (
                <span className="text-sm font-medium text-gray-500">
                  {getBreadcrumbName(value)}
                </span>
              ) : (
                <Link
                  to={to}
                  className="text-sm font-medium text-gray-500 hover:text-gray-700"
                >
                  {getBreadcrumbName(value)}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
