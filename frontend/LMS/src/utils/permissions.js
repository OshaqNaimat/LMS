import { ROLES } from "./constants";

export const checkPermission = (user, requiredPermission) => {
  if (!user) return false;

  const permissions = {
    [ROLES.ADMIN]: {
      canViewAll: true,
      canEditAll: true,
      canDeleteAll: true,
      canManageUsers: true,
      canManageCourses: true,
      canManageGrades: true,
      canViewReports: true,
      canManageSystem: true,
    },
    [ROLES.TEACHER]: {
      canViewAll: false,
      canEditAll: false,
      canDeleteAll: false,
      canManageUsers: false,
      canManageCourses: true, // Only their courses
      canManageGrades: true, // Only their students
      canViewReports: true, // Only their classes
      canManageSystem: false,
    },
    [ROLES.STUDENT]: {
      canViewAll: false,
      canEditAll: false,
      canDeleteAll: false,
      canManageUsers: false,
      canManageCourses: false,
      canManageGrades: false,
      canViewReports: true, // Only their own
      canManageSystem: false,
    },
  };

  return permissions[user.role]?.[requiredPermission] || false;
};

export const filterDataByRole = (user, data) => {
  if (!user) return [];

  switch (user.role) {
    case ROLES.ADMIN:
      return data; // Admin sees everything
    case ROLES.TEACHER:
      // Teacher only sees their own classes/students
      return data.filter(
        (item) => item.teacherId === user.id || item.assignedTo === user.id,
      );
    case ROLES.STUDENT:
      // Student only sees their own data
      return data.filter(
        (item) => item.studentId === user.id || item.enrolledBy === user.id,
      );
    default:
      return [];
  }
};
