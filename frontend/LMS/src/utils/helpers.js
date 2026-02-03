// Format date to readable string
export const formatDate = (dateString) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

// Format time
export const formatTime = (timeString) => {
  const [hours, minutes] = timeString.split(":");
  const hour = parseInt(hours);
  const ampm = hour >= 12 ? "PM" : "AM";
  const formattedHour = hour % 12 || 12;
  return `${formattedHour}:${minutes} ${ampm}`;
};

// Calculate grade percentage
export const calculateGrade = (score, maxScore) => {
  return Math.round((score / maxScore) * 100);
};

// Get grade letter
export const getGradeLetter = (percentage) => {
  if (percentage >= 90) return "A";
  if (percentage >= 80) return "B";
  if (percentage >= 70) return "C";
  if (percentage >= 60) return "D";
  return "F";
};

// Calculate GPA
export const calculateGPA = (grades) => {
  const gradePoints = {
    A: 4.0,
    "A-": 3.7,
    "B+": 3.3,
    B: 3.0,
    "B-": 2.7,
    "C+": 2.3,
    C: 2.0,
    "C-": 1.7,
    "D+": 1.3,
    D: 1.0,
    F: 0,
  };

  const totalCredits = grades.reduce((sum, grade) => sum + grade.credits, 0);
  const weightedSum = grades.reduce((sum, grade) => {
    return sum + (gradePoints[grade.grade] || 0) * grade.credits;
  }, 0);

  return totalCredits > 0 ? (weightedSum / totalCredits).toFixed(2) : "0.00";
};

// Generate random ID
export const generateId = () => {
  return Math.random().toString(36).substr(2, 9);
};

// Validate email
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Capitalize first letter
export const capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

// Truncate text
export const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) return text;
  return text.substr(0, maxLength) + "...";
};

// Format file size
export const formatFileSize = (bytes) => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

// Get status color
export const getStatusColor = (status) => {
  const colors = {
    active: "bg-green-100 text-green-800",
    inactive: "bg-red-100 text-red-800",
    pending: "bg-yellow-100 text-yellow-800",
    completed: "bg-blue-100 text-blue-800",
    submitted: "bg-purple-100 text-purple-800",
    graded: "bg-green-100 text-green-800",
    late: "bg-orange-100 text-orange-800",
  };
  return colors[status] || "bg-gray-100 text-gray-800";
};

// Get role color
export const getRoleColor = (role) => {
  const colors = {
    admin: "bg-purple-100 text-purple-800",
    teacher: "bg-green-100 text-green-800",
    student: "bg-blue-100 text-blue-800",
  };
  return colors[role] || "bg-gray-100 text-gray-800";
};
