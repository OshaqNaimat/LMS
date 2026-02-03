export const ROLES = {
  ADMIN: "admin",
  TEACHER: "teacher",
  STUDENT: "student",
};

export const PERMISSIONS = {
  // Admin permissions
  ADMIN: {
    VIEW_DASHBOARD: true,
    MANAGE_USERS: true,
    MANAGE_COURSES: true,
    MANAGE_ATTENDANCE: true,
    MANAGE_GRADES: true,
    VIEW_REPORTS: true,
    SYSTEM_SETTINGS: true,
    MANAGE_ENROLLMENTS: true,
    VIEW_ALL_DATA: true,
  },

  // Teacher permissions
  TEACHER: {
    VIEW_DASHBOARD: true,
    MANAGE_USERS: false,
    MANAGE_COURSES: true, // Only their courses
    MANAGE_ATTENDANCE: true, // Only their classes
    MANAGE_GRADES: true, // Only their students
    VIEW_REPORTS: true, // Only their classes
    SYSTEM_SETTINGS: false,
    MANAGE_ENROLLMENTS: false,
    VIEW_ALL_DATA: false,
  },

  // Student permissions
  STUDENT: {
    VIEW_DASHBOARD: true,
    MANAGE_USERS: false,
    MANAGE_COURSES: false,
    MANAGE_ATTENDANCE: false,
    MANAGE_GRADES: false,
    VIEW_REPORTS: true, // Only their own
    SYSTEM_SETTINGS: false,
    MANAGE_ENROLLMENTS: false,
    VIEW_ALL_DATA: false,
  },
};

export const NAVIGATION = {
  ADMIN: [
    { path: "/admin/dashboard", label: "Dashboard", icon: "FiHome" },
    { path: "/admin/students", label: "Students", icon: "FiUsers" },
    { path: "/admin/teachers", label: "Teachers", icon: "FiUserCheck" },
    { path: "/admin/courses", label: "Courses", icon: "FiBook" },
    { path: "/admin/attendance", label: "Attendance", icon: "FiCalendar" },
    { path: "/admin/grades", label: "Grades", icon: "FiClipboard" },
    { path: "/admin/reports", label: "Reports", icon: "FiBarChart2" },
    { path: "/admin/settings", label: "Settings", icon: "FiSettings" },
  ],
  TEACHER: [
    { path: "/teacher/dashboard", label: "Dashboard", icon: "FiHome" },
    { path: "/teacher/classes", label: "My Classes", icon: "FiBookOpen" },
    { path: "/teacher/attendance", label: "Attendance", icon: "FiCalendar" },
    { path: "/teacher/assignments", label: "Assignments", icon: "FiFileText" },
    { path: "/teacher/grades", label: "Grades", icon: "FiClipboard" },
    { path: "/teacher/students", label: "Students", icon: "FiUsers" },
  ],
  STUDENT: [
    { path: "/student/dashboard", label: "Dashboard", icon: "FiHome" },
    { path: "/student/courses", label: "My Courses", icon: "FiBook" },
    { path: "/student/schedule", label: "Schedule", icon: "FiCalendar" },
    { path: "/student/assignments", label: "Assignments", icon: "FiFileText" },
    { path: "/student/grades", label: "Grades", icon: "FiClipboard" },
    { path: "/student/profile", label: "Profile", icon: "FiUser" },
  ],
};
