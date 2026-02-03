import { useState } from "react";
import {
  FiCalendar,
  FiCheckCircle,
  FiXCircle,
  FiUsers,
  FiDownload,
} from "react-icons/fi";

const TeacherAttendance = () => {
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0],
  );
  const [selectedClass, setSelectedClass] = useState("CS101");
  const [attendance, setAttendance] = useState([
    {
      id: 1,
      studentName: "John Doe",
      studentId: "S001",
      status: "present",
      checkInTime: "08:55 AM",
      notes: "",
    },
    {
      id: 2,
      studentName: "Jane Smith",
      studentId: "S002",
      status: "present",
      checkInTime: "09:00 AM",
      notes: "",
    },
    {
      id: 3,
      studentName: "Bob Johnson",
      studentId: "S003",
      status: "absent",
      checkInTime: "",
      notes: "Excused - medical",
    },
    {
      id: 4,
      studentName: "Alice Brown",
      studentId: "S004",
      status: "late",
      checkInTime: "09:15 AM",
      notes: "Traffic delay",
    },
    {
      id: 5,
      studentName: "Charlie Wilson",
      studentId: "S005",
      status: "present",
      checkInTime: "08:50 AM",
      notes: "",
    },
  ]);

  const classes = [
    { id: "CS101", name: "Introduction to Computer Science", students: 45 },
    { id: "CS102", name: "Data Structures & Algorithms", students: 38 },
    { id: "CS201", name: "Database Systems", students: 32 },
  ];

  const handleStatusChange = (studentId, newStatus) => {
    setAttendance(
      attendance.map((student) =>
        student.id === studentId ? { ...student, status: newStatus } : student,
      ),
    );
  };

  const handleMarkAllPresent = () => {
    setAttendance(
      attendance.map((student) => ({ ...student, status: "present" })),
    );
  };

  const calculateStats = () => {
    const total = attendance.length;
    const present = attendance.filter((s) => s.status === "present").length;
    const absent = attendance.filter((s) => s.status === "absent").length;
    const late = attendance.filter((s) => s.status === "late").length;

    return {
      total,
      present,
      absent,
      late,
      attendanceRate: Math.round((present / total) * 100),
    };
  };

  const stats = calculateStats();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Attendance</h1>
          <p className="text-gray-600">Track and manage student attendance</p>
        </div>
        <div className="flex space-x-3">
          <button className="btn-secondary flex items-center">
            <FiDownload className="mr-2" />
            Export
          </button>
          <button className="btn-primary" onClick={handleMarkAllPresent}>
            Mark All Present
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-lg mr-4">
              <FiCheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{stats.present}</p>
              <p className="text-sm text-gray-600">Present</p>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="flex items-center">
            <div className="p-3 bg-red-100 rounded-lg mr-4">
              <FiXCircle className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{stats.absent}</p>
              <p className="text-sm text-gray-600">Absent</p>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="flex items-center">
            <div className="p-3 bg-yellow-100 rounded-lg mr-4">
              <FiCalendar className="h-6 w-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{stats.late}</p>
              <p className="text-sm text-gray-600">Late</p>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-lg mr-4">
              <FiUsers className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{stats.attendanceRate}%</p>
              <p className="text-sm text-gray-600">Attendance Rate</p>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="flex justify-between items-center mb-6">
          <div className="flex space-x-4">
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="input-field"
            >
              {classes.map((cls) => (
                <option key={cls.id} value={cls.id}>
                  {cls.id} - {cls.name} ({cls.students} students)
                </option>
              ))}
            </select>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="input-field"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="table-header">Student</th>
                <th className="table-header">Status</th>
                <th className="table-header">Check-in Time</th>
                <th className="table-header">Notes</th>
                <th className="table-header">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {attendance.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium">{student.studentName}</p>
                      <p className="text-sm text-gray-500">
                        {student.studentId}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        student.status === "present"
                          ? "bg-green-100 text-green-800"
                          : student.status === "absent"
                            ? "bg-red-100 text-red-800"
                            : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {student.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">{student.checkInTime || "--"}</td>
                  <td className="px-6 py-4">
                    <input
                      type="text"
                      value={student.notes}
                      onChange={(e) => {
                        setAttendance(
                          attendance.map((s) =>
                            s.id === student.id
                              ? { ...s, notes: e.target.value }
                              : s,
                          ),
                        );
                      }}
                      className="input-field text-sm"
                      placeholder="Add notes..."
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <button
                        onClick={() =>
                          handleStatusChange(student.id, "present")
                        }
                        className={`px-3 py-1 rounded text-sm ${
                          student.status === "present"
                            ? "bg-green-600 text-white"
                            : "bg-green-100 text-green-800 hover:bg-green-200"
                        }`}
                      >
                        Present
                      </button>
                      <button
                        onClick={() => handleStatusChange(student.id, "absent")}
                        className={`px-3 py-1 rounded text-sm ${
                          student.status === "absent"
                            ? "bg-red-600 text-white"
                            : "bg-red-100 text-red-800 hover:bg-red-200"
                        }`}
                      >
                        Absent
                      </button>
                      <button
                        onClick={() => handleStatusChange(student.id, "late")}
                        className={`px-3 py-1 rounded text-sm ${
                          student.status === "late"
                            ? "bg-yellow-600 text-white"
                            : "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
                        }`}
                      >
                        Late
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h2 className="text-xl font-bold mb-4">Attendance Summary</h2>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Attendance Rate</span>
                <span className="text-sm font-medium">
                  {stats.attendanceRate}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-600 h-2 rounded-full"
                  style={{ width: `${stats.attendanceRate}%` }}
                ></div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">Total Students</p>
                <p className="text-xl font-bold">{stats.total}</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">Class Average</p>
                <p className="text-xl font-bold">92%</p>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <h2 className="text-xl font-bold mb-4">Attendance Policy</h2>
          <div className="space-y-3">
            <div className="p-3 bg-blue-50 rounded-lg">
              <h3 className="font-medium text-blue-800">Minimum Attendance</h3>
              <p className="text-sm text-blue-600">
                Students must maintain at least 75% attendance to be eligible
                for exams.
              </p>
            </div>
            <div className="p-3 bg-yellow-50 rounded-lg">
              <h3 className="font-medium text-yellow-800">Late Policy</h3>
              <p className="text-sm text-yellow-600">
                Students arriving after 15 minutes will be marked as late.
              </p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <h3 className="font-medium text-green-800">Excused Absences</h3>
              <p className="text-sm text-green-600">
                Medical certificates must be submitted within 3 days of absence.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherAttendance;
