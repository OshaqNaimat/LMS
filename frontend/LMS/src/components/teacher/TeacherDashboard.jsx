import { useState, useEffect } from "react";
import {
  FiUsers,
  FiBookOpen,
  FiCalendar,
  FiClipboard,
  FiTrendingUp,
} from "react-icons/fi";

const TeacherDashboard = () => {
  const [teacherData, setTeacherData] = useState({
    totalStudents: 0,
    totalClasses: 0,
    upcomingClasses: 0,
    assignmentsToGrade: 0,
  });

  const [schedule, setSchedule] = useState([]);

  useEffect(() => {
    // Mock data
    setTeacherData({
      totalStudents: 85,
      totalClasses: 6,
      upcomingClasses: 3,
      assignmentsToGrade: 12,
    });

    setSchedule([
      {
        id: 1,
        time: "09:00 AM",
        course: "CS101",
        topic: "Data Structures",
        room: "Room 301",
      },
      {
        id: 2,
        time: "11:00 AM",
        course: "CS102",
        topic: "Algorithms",
        room: "Room 302",
      },
      {
        id: 3,
        time: "02:00 PM",
        course: "CS101 Lab",
        topic: "Linked Lists",
        room: "Lab 3",
      },
      {
        id: 4,
        time: "04:00 PM",
        course: "Office Hours",
        topic: "Student Consultations",
        room: "Office 205",
      },
    ]);
  }, []);

  const StatCard = ({ icon, title, value, color }) => (
    <div className="card">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <p className="text-2xl font-bold mt-2">{value}</p>
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
            Teacher Dashboard
          </h1>
          <p className="text-gray-600">
            Welcome back! Here's your teaching overview
          </p>
        </div>
        <div className="flex space-x-3">
          <button className="btn-primary">Create Assignment</button>
          <button className="btn-secondary">View Calendar</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={<FiUsers className="h-6 w-6 text-blue-600" />}
          title="Total Students"
          value={teacherData.totalStudents}
          color="bg-blue-50"
        />
        <StatCard
          icon={<FiBookOpen className="h-6 w-6 text-green-600" />}
          title="Total Classes"
          value={teacherData.totalClasses}
          color="bg-green-50"
        />
        <StatCard
          icon={<FiCalendar className="h-6 w-6 text-purple-600" />}
          title="Upcoming Today"
          value={teacherData.upcomingClasses}
          color="bg-purple-50"
        />
        <StatCard
          icon={<FiClipboard className="h-6 w-6 text-yellow-600" />}
          title="Assignments to Grade"
          value={teacherData.assignmentsToGrade}
          color="bg-yellow-50"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Today's Schedule</h2>
            <button className="text-primary-600 hover:text-primary-700 text-sm">
              View Full Schedule
            </button>
          </div>
          <div className="space-y-4">
            {schedule.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50"
              >
                <div className="flex items-center space-x-3">
                  <div className="bg-primary-50 p-2 rounded-lg">
                    <FiCalendar className="text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">{item.course}</h3>
                    <p className="text-sm text-gray-500">{item.topic}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">{item.time}</p>
                  <p className="text-sm text-gray-500">{item.room}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <h2 className="text-xl font-bold mb-4">Recent Announcements</h2>
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h3 className="font-medium text-blue-800">Midterm Schedule</h3>
              <p className="text-sm text-blue-600 mt-1">
                Midterm exams will be held next week. Please prepare
                accordingly.
              </p>
              <p className="text-xs text-blue-500 mt-2">Posted 2 days ago</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <h3 className="font-medium text-green-800">
                Assignment Deadline
              </h3>
              <p className="text-sm text-green-600 mt-1">
                Assignment #3 submission deadline extended to Friday.
              </p>
              <p className="text-xs text-green-500 mt-2">Posted 1 day ago</p>
            </div>
            <div className="p-4 bg-yellow-50 rounded-lg">
              <h3 className="font-medium text-yellow-800">Lab Session</h3>
              <p className="text-sm text-yellow-600 mt-1">
                Extra lab session this Saturday for practical demonstrations.
              </p>
              <p className="text-xs text-yellow-500 mt-2">Posted 3 days ago</p>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <h2 className="text-xl font-bold mb-4">My Classes</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="table-header">Course Code</th>
                <th className="table-header">Course Name</th>
                <th className="table-header">Students</th>
                <th className="table-header">Schedule</th>
                <th className="table-header">Status</th>
                <th className="table-header">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium">CS101</td>
                <td className="px-6 py-4">Introduction to Computer Science</td>
                <td className="px-6 py-4">45 Students</td>
                <td className="px-6 py-4">Mon/Wed 9:00 AM</td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                    Active
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button className="text-primary-600 hover:text-primary-700 text-sm">
                    Manage Class
                  </button>
                </td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium">CS102</td>
                <td className="px-6 py-4">Data Structures & Algorithms</td>
                <td className="px-6 py-4">38 Students</td>
                <td className="px-6 py-4">Tue/Thu 11:00 AM</td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                    Active
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button className="text-primary-600 hover:text-primary-700 text-sm">
                    Manage Class
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
