import { useState, useEffect } from "react";
import {
  FiBook,
  FiCalendar,
  FiFileText,
  FiClock,
  FiBell,
} from "react-icons/fi";

const StudentDashboard = () => {
  const [studentData, setStudentData] = useState({
    enrolledCourses: 0,
    pendingAssignments: 0,
    upcomingExams: 0,
    attendanceRate: 0,
  });

  const [upcomingAssignments, setUpcomingAssignments] = useState([]);
  const [grades, setGrades] = useState([]);

  useEffect(() => {
    // Mock data
    setStudentData({
      enrolledCourses: 5,
      pendingAssignments: 3,
      upcomingExams: 2,
      attendanceRate: 92,
    });

    setUpcomingAssignments([
      {
        id: 1,
        course: "CS101",
        title: "Data Structures Assignment",
        dueDate: "2024-01-20",
        status: "pending",
      },
      {
        id: 2,
        course: "MATH101",
        title: "Calculus Problem Set",
        dueDate: "2024-01-22",
        status: "in-progress",
      },
      {
        id: 3,
        course: "PHY101",
        title: "Physics Lab Report",
        dueDate: "2024-01-25",
        status: "pending",
      },
    ]);

    setGrades([
      { course: "CS101", grade: "A", percentage: 95, credits: 3 },
      { course: "MATH101", grade: "B+", percentage: 88, credits: 4 },
      { course: "ENG101", grade: "A-", percentage: 92, credits: 3 },
    ]);
  }, []);

  const StatCard = ({ icon, title, value, subtitle, color }) => (
    <div className="card">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <p className="text-2xl font-bold mt-2">{value}</p>
          {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
        </div>
        <div className={`p-3 rounded-lg ${color}`}>{icon}</div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Student Dashboard
          </h1>
          <p className="text-gray-600">
            Welcome back! Here's your academic overview
          </p>
        </div>
        <div className="flex space-x-3">
          <button className="relative p-2 hover:bg-gray-100 rounded-full">
            <FiBell className="h-6 w-6 text-gray-600" />
            <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
          </button>
          <button className="btn-primary">View Schedule</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={<FiBook className="h-6 w-6 text-blue-600" />}
          title="Enrolled Courses"
          value={studentData.enrolledCourses}
          color="bg-blue-50"
        />
        <StatCard
          icon={<FiFileText className="h-6 w-6 text-orange-600" />}
          title="Pending Assignments"
          value={studentData.pendingAssignments}
          color="bg-orange-50"
        />
        <StatCard
          icon={<FiCalendar className="h-6 w-6 text-purple-600" />}
          title="Upcoming Exams"
          value={studentData.upcomingExams}
          color="bg-purple-50"
        />
        <StatCard
          icon={<FiClock className="h-6 w-6 text-green-600" />}
          title="Attendance Rate"
          value={`${studentData.attendanceRate}%`}
          subtitle="Current semester"
          color="bg-green-50"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Upcoming Assignments</h2>
            <button className="text-primary-600 hover:text-primary-700 text-sm">
              View All
            </button>
          </div>
          <div className="space-y-4">
            {upcomingAssignments.map((assignment) => (
              <div
                key={assignment.id}
                className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50"
              >
                <div>
                  <h3 className="font-medium">{assignment.title}</h3>
                  <p className="text-sm text-gray-500">{assignment.course}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">
                    Due: {assignment.dueDate}
                  </p>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      assignment.status === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {assignment.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <h2 className="text-xl font-bold mb-4">Current Grades</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr>
                  <th className="table-header">Course</th>
                  <th className="table-header">Grade</th>
                  <th className="table-header">Percentage</th>
                  <th className="table-header">Credits</th>
                </tr>
              </thead>
              <tbody>
                {grades.map((grade, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium">{grade.course}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm ${
                          grade.grade === "A"
                            ? "bg-green-100 text-green-800"
                            : grade.grade.includes("B")
                              ? "bg-blue-100 text-blue-800"
                              : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {grade.grade}
                      </span>
                    </td>
                    <td className="px-6 py-4">{grade.percentage}%</td>
                    <td className="px-6 py-4">{grade.credits}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
            <div className="flex justify-between">
              <span className="font-medium">GPA</span>
              <span className="font-bold text-primary-600">3.67</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="card">
          <h2 className="text-xl font-bold mb-4">Today's Schedule</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium">CS101 Lecture</p>
                <p className="text-sm text-gray-500">Data Structures</p>
              </div>
              <p className="font-medium">9:00 AM</p>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium">MATH101</p>
                <p className="text-sm text-gray-500">Calculus</p>
              </div>
              <p className="font-medium">11:00 AM</p>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium">Study Session</p>
                <p className="text-sm text-gray-500">Library</p>
              </div>
              <p className="font-medium">2:00 PM</p>
            </div>
          </div>
        </div>

        <div className="card lg:col-span-2">
          <h2 className="text-xl font-bold mb-4">Announcements</h2>
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-blue-800">
                    Midterm Exam Schedule
                  </h3>
                  <p className="text-sm text-blue-600 mt-1">
                    Midterm exams will begin next week. Check the exam schedule
                    on the portal.
                  </p>
                </div>
                <span className="text-xs text-blue-500">Today</span>
              </div>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-green-800">
                    Library Extended Hours
                  </h3>
                  <p className="text-sm text-green-600 mt-1">
                    Library will remain open until midnight during exam week.
                  </p>
                </div>
                <span className="text-xs text-green-500">Yesterday</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
