import { useState } from "react";
import {
  FiEdit2,
  FiTrash2,
  FiUserPlus,
  FiFilter,
  FiDownload,
} from "react-icons/fi";
import { ROLES } from "../../utils/constants";

const ManageUsers = () => {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Admin User",
      email: "admin@lms.com",
      role: ROLES.ADMIN,
      status: "active",
      joinDate: "2023-01-01",
    },
    {
      id: 2,
      name: "John Smith",
      email: "teacher@lms.com",
      role: ROLES.TEACHER,
      status: "active",
      department: "CS",
      joinDate: "2023-02-15",
    },
    {
      id: 3,
      name: "Alice Johnson",
      email: "student@lms.com",
      role: ROLES.STUDENT,
      status: "active",
      studentId: "S001",
      joinDate: "2023-09-01",
    },
    {
      id: 4,
      name: "Bob Wilson",
      email: "bob@example.com",
      role: ROLES.STUDENT,
      status: "inactive",
      studentId: "S002",
      joinDate: "2023-08-15",
    },
    {
      id: 5,
      name: "Sarah Davis",
      email: "sarah@example.com",
      role: ROLES.TEACHER,
      status: "active",
      department: "Math",
      joinDate: "2023-03-10",
    },
  ]);

  const [selectedRole, setSelectedRole] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const handleDeleteUser = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setUsers(users.filter((user) => user.id !== id));
    }
  };

  const handleRoleChange = (id, newRole) => {
    setUsers(
      users.map((user) => (user.id === id ? { ...user, role: newRole } : user)),
    );
  };

  const filteredUsers = users.filter((user) => {
    if (selectedRole !== "all" && user.role !== selectedRole) return false;
    if (selectedStatus !== "all" && user.status !== selectedStatus)
      return false;
    return true;
  });

  const getRoleColor = (role) => {
    switch (role) {
      case ROLES.ADMIN:
        return "bg-purple-100 text-purple-800";
      case ROLES.TEACHER:
        return "bg-green-100 text-green-800";
      case ROLES.STUDENT:
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Manage Users</h1>
          <p className="text-gray-600">
            Manage all system users and their permissions
          </p>
        </div>
        <div className="flex space-x-3">
          <button className="btn-secondary flex items-center">
            <FiDownload className="mr-2" />
            Export
          </button>
          <button className="btn-primary flex items-center">
            <FiUserPlus className="mr-2" />
            Add User
          </button>
        </div>
      </div>

      <div className="card">
        <div className="flex justify-between items-center mb-6">
          <div className="flex space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search users..."
                className="input-field pl-10"
              />
              <FiFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="input-field"
            >
              <option value="all">All Roles</option>
              <option value={ROLES.ADMIN}>Admin</option>
              <option value={ROLES.TEACHER}>Teacher</option>
              <option value={ROLES.STUDENT}>Student</option>
            </select>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="input-field"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="suspended">Suspended</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="table-header">User</th>
                <th className="table-header">Role</th>
                <th className="table-header">Details</th>
                <th className="table-header">Status</th>
                <th className="table-header">Join Date</th>
                <th className="table-header">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredUsers.map((user) => (
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
                    <select
                      value={user.role}
                      onChange={(e) =>
                        handleRoleChange(user.id, e.target.value)
                      }
                      className={`px-3 py-1 rounded-full text-sm font-medium ${getRoleColor(user.role)} border-none focus:ring-0 focus:outline-none`}
                    >
                      <option value={ROLES.ADMIN}>Admin</option>
                      <option value={ROLES.TEACHER}>Teacher</option>
                      <option value={ROLES.STUDENT}>Student</option>
                    </select>
                  </td>
                  <td className="px-6 py-4">
                    {user.role === ROLES.STUDENT && (
                      <p className="text-sm">ID: {user.studentId}</p>
                    )}
                    {user.role === ROLES.TEACHER && (
                      <p className="text-sm">Dept: {user.department}</p>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        user.status === "active"
                          ? "bg-green-100 text-green-800"
                          : user.status === "inactive"
                            ? "bg-red-100 text-red-800"
                            : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-900">{user.joinDate}</td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                        <FiEdit2 />
                      </button>
                      <button
                        onClick={() => handleDeleteUser(user.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card">
          <h3 className="font-bold text-lg mb-4">User Statistics</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span>Total Users</span>
              <span className="font-bold">{users.length}</span>
            </div>
            <div className="flex justify-between">
              <span>Active Users</span>
              <span className="font-bold text-green-600">
                {users.filter((u) => u.status === "active").length}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Admins</span>
              <span className="font-bold text-purple-600">
                {users.filter((u) => u.role === ROLES.ADMIN).length}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Teachers</span>
              <span className="font-bold text-green-600">
                {users.filter((u) => u.role === ROLES.TEACHER).length}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Students</span>
              <span className="font-bold text-blue-600">
                {users.filter((u) => u.role === ROLES.STUDENT).length}
              </span>
            </div>
          </div>
        </div>

        <div className="card md:col-span-2">
          <h3 className="font-bold text-lg mb-4">Quick User Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button className="border border-gray-300 rounded-lg p-4 hover:bg-gray-50 text-left">
              <h4 className="font-medium">Bulk Import Users</h4>
              <p className="text-sm text-gray-500 mt-1">
                Import multiple users via CSV
              </p>
            </button>
            <button className="border border-gray-300 rounded-lg p-4 hover:bg-gray-50 text-left">
              <h4 className="font-medium">Reset Passwords</h4>
              <p className="text-sm text-gray-500 mt-1">
                Reset passwords for selected users
              </p>
            </button>
            <button className="border border-gray-300 rounded-lg p-4 hover:bg-gray-50 text-left">
              <h4 className="font-medium">Permission Manager</h4>
              <p className="text-sm text-gray-500 mt-1">
                Manage user permissions and roles
              </p>
            </button>
            <button className="border border-gray-300 rounded-lg p-4 hover:bg-gray-50 text-left">
              <h4 className="font-medium">Export Users</h4>
              <p className="text-sm text-gray-500 mt-1">
                Export user data to Excel/PDF
              </p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;
