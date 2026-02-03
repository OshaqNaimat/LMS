import { useState, useEffect } from "react";
import {
  FiUsers,
  FiUserCheck,
  FiBook,
  FiDollarSign,
  FiTrendingUp,
  FiPlus,
} from "react-icons/fi";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalTeachers: 0,
    totalCourses: 0,
    revenue: 0,
  });

  const [recentUsers, setRecentUsers] = useState([]);

  useEffect(() => {
    // Mock data
    setStats({
      totalStudents: 450,
      totalTeachers: 25,
      totalCourses: 38,
      revenue: 1250000,
    });

    setRecentUsers([
      {
        id: 1,
        name: "John Doe",
        email: "john@example.com",
        role: "student",
        status: "active",
        date: "2024-01-15",
      },
      {
        id: 2,
        name: "Jane Smith",
        email: "jane@example.com",
        role: "teacher",
        status: "active",
        date: "2024-01-14",
      },
      {
        id: 3,
        name: "Robert Johnson",
        email: "robert@example.com",
        role: "student",
        status: "pending",
        date: "2024-01-13",
      },
      {
        id: 4,
        name: "Sarah Williams",
        email: "sarah@example.com",
        role: "admin",
        status: "active",
        date: "2024-01-12",
      },
      {
        id: 5,
        name: "Mike Brown",
        email: "mike@example.com",
        role: "student",
        status: "active",
        date: "2024-01-11",
      },
    ]);
  }, []);

  const chartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Students",
        data: [65, 78, 66, 81, 95, 110],
        backgroundColor: "rgba(59, 130, 246, 0.8)",
      },
      {
        label: "Teachers",
        data: [15, 18, 16, 20, 22, 25],
        backgroundColor: "rgba(16, 185, 129, 0.8)",
      },
    ],
  };

  const StatCard = ({ icon, title, value, change, color }) => (
    <div className="card">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <p className="text-2xl font-bold mt-2">{value}</p>
          <div className="flex items-center mt-2">
            <FiTrendingUp
              className={`${change > 0 ? "text-green-500" : "text-red-500"} mr-1`}
            />
            <span
              className={`text-sm ${change > 0 ? "text-green-500" : "text-red-500"}`}
            >
              {change}%
            </span>
            <span className="text-gray-500 text-sm ml-2">from last month</span>
          </div>
        </div>
        <div className={`p-3 rounded-lg ${color}`}>{icon}</div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600">Welcome to the administration panel</p>
        </div>
        <div className="flex space-x-3">
          <button className="btn-primary flex items-center">
            <FiPlus className="mr-2" />
            Add User
          </button>
          <button className="btn-secondary">Generate Report</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={<FiUsers className="h-6 w-6 text-blue-600" />}
          title="Total Students"
          value={stats.totalStudents.toLocaleString()}
          change={12}
          color="bg-blue-50"
        />
        <StatCard
          icon={<FiUserCheck className="h-6 w-6 text-green-600" />}
          title="Total Teachers"
          value={stats.totalTeachers}
          change={8}
          color="bg-green-50"
        />
        <StatCard
          icon={<FiBook className="h-6 w-6 text-purple-600" />}
          title="Total Courses"
          value={stats.totalCourses}
          change={5}
          color="bg-purple-50"
        />
        <StatCard
          icon={<FiDollarSign className="h-6 w-6 text-yellow-600" />}
          title="Revenue"
          value={`$${(stats.revenue / 1000).toFixed(0)}K`}
          change={18}
          color="bg-yellow-50"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h2 className="text-xl font-bold mb-4">User Growth</h2>
          <Bar data={chartData} options={{ responsive: true }} />
        </div>

        <div className="card">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Recent Users</h2>
            <button className="text-primary-600 hover:text-primary-700 text-sm">
              View All
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr>
                  <th className="table-header">Name</th>
                  <th className="table-header">Role</th>
                  <th className="table-header">Status</th>
                  <th className="table-header">Date</th>
                  <th className="table-header">Actions</th>
                </tr>
              </thead>
              <tbody>
                {recentUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                          <span className="font-medium">
                            {user.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <p className="text-sm text-gray-500">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs capitalize ${
                          user.role === "admin"
                            ? "bg-purple-100 text-purple-800"
                            : user.role === "teacher"
                              ? "bg-green-100 text-green-800"
                              : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          user.status === "active"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-900">{user.date}</td>
                    <td className="px-6 py-4">
                      <button className="text-primary-600 hover:text-primary-700 text-sm">
                        Manage
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="card lg:col-span-2">
          <h2 className="text-xl font-bold mb-4">System Overview</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span>Server Status</span>
              <span className="text-green-600 font-medium">Online</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span>Database Usage</span>
              <span className="text-blue-600 font-medium">65%</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span>Active Sessions</span>
              <span className="text-purple-600 font-medium">142</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span>Pending Tasks</span>
              <span className="text-yellow-600 font-medium">8</span>
            </div>
          </div>
        </div>

        <div className="card">
          <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <button className="w-full btn-primary text-left px-4 py-3">
              Create New Course
            </button>
            <button className="w-full btn-secondary text-left px-4 py-3">
              Manage Enrollments
            </button>
            <button className="w-full border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg text-left px-4 py-3">
              System Backup
            </button>
            <button className="w-full border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg text-left px-4 py-3">
              View Audit Log
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
