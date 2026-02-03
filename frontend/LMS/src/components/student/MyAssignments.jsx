import { useState } from "react";
import {
  FiCalendar,
  FiUpload,
  FiFileText,
  FiCheckCircle,
  FiClock,
} from "react-icons/fi";

const MyAssignments = () => {
  const [assignments, setAssignments] = useState([
    {
      id: 1,
      title: "Data Structures Project",
      course: "CS101",
      dueDate: "2024-01-20",
      status: "pending",
      type: "Project",
      maxScore: 100,
      submitted: false,
      description: "Implement linked list operations",
    },
    {
      id: 2,
      title: "Calculus Problem Set 3",
      course: "MATH101",
      dueDate: "2024-01-22",
      status: "in-progress",
      type: "Assignment",
      maxScore: 50,
      submitted: false,
      description: "Solve derivatives and integrals",
    },
    {
      id: 3,
      title: "Physics Lab Report",
      course: "PHY101",
      dueDate: "2024-01-25",
      status: "pending",
      type: "Lab Report",
      maxScore: 75,
      submitted: false,
      description: "Newton's laws experiment",
    },
    {
      id: 4,
      title: "English Essay",
      course: "ENG101",
      dueDate: "2024-01-18",
      status: "submitted",
      type: "Essay",
      maxScore: 100,
      submitted: true,
      score: 92,
      description: "Argumentative essay on modern literature",
    },
    {
      id: 5,
      title: "History Research Paper",
      course: "HIST101",
      dueDate: "2024-01-30",
      status: "pending",
      type: "Research Paper",
      maxScore: 100,
      submitted: false,
      description: "World War II causes and effects",
    },
  ]);

  const [selectedStatus, setSelectedStatus] = useState("all");
  const [submissionFile, setSubmissionFile] = useState(null);

  const handleFileUpload = (assignmentId) => {
    // In a real app, this would upload to a server
    setAssignments(
      assignments.map((a) =>
        a.id === assignmentId
          ? { ...a, submitted: true, status: "submitted" }
          : a,
      ),
    );
    setSubmissionFile(null);
    alert("Assignment submitted successfully!");
  };

  const filteredAssignments = assignments.filter((assignment) => {
    if (selectedStatus === "all") return true;
    return assignment.status === selectedStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "submitted":
        return "bg-green-100 text-green-800";
      case "in-progress":
        return "bg-blue-100 text-blue-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getDaysLeft = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Assignments</h1>
          <p className="text-gray-600">
            View and submit your course assignments
          </p>
        </div>
        <div className="flex space-x-3">
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="input-field"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="submitted">Submitted</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="card">
          <h3 className="text-lg font-bold mb-4">Assignment Summary</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Total Assignments</span>
              <span className="font-bold">{assignments.length}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Pending</span>
              <span className="font-bold text-yellow-600">
                {assignments.filter((a) => a.status === "pending").length}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Submitted</span>
              <span className="font-bold text-green-600">
                {assignments.filter((a) => a.submitted).length}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Overdue</span>
              <span className="font-bold text-red-600">0</span>
            </div>
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-bold mb-4">Upcoming Deadlines</h3>
          <div className="space-y-3">
            {assignments
              .filter((a) => !a.submitted)
              .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
              .slice(0, 3)
              .map((assignment) => (
                <div
                  key={assignment.id}
                  className="flex justify-between items-center p-2 hover:bg-gray-50 rounded"
                >
                  <div>
                    <p className="font-medium">{assignment.title}</p>
                    <p className="text-sm text-gray-500">{assignment.course}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">
                      {getDaysLeft(assignment.dueDate)} days
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-bold mb-4">Recently Graded</h3>
          <div className="space-y-3">
            {assignments
              .filter((a) => a.submitted && a.score)
              .map((assignment) => (
                <div
                  key={assignment.id}
                  className="p-2 hover:bg-gray-50 rounded"
                >
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{assignment.title}</span>
                    <span className="font-bold text-green-600">
                      {assignment.score}/{assignment.maxScore}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">{assignment.course}</p>
                </div>
              ))}
          </div>
        </div>
      </div>

      <div className="card">
        <h2 className="text-xl font-bold mb-4">All Assignments</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="table-header">Assignment</th>
                <th className="table-header">Course</th>
                <th className="table-header">Type</th>
                <th className="table-header">Due Date</th>
                <th className="table-header">Status</th>
                <th className="table-header">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredAssignments.map((assignment) => (
                <tr key={assignment.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium">{assignment.title}</p>
                      <p className="text-sm text-gray-500">
                        {assignment.description}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-medium">{assignment.course}</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">
                      {assignment.type}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <FiCalendar className="mr-2 text-gray-400" />
                      <span>{assignment.dueDate}</span>
                      <span className="ml-2 text-sm text-gray-500">
                        ({getDaysLeft(assignment.dueDate)} days left)
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${getStatusColor(assignment.status)}`}
                    >
                      {assignment.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {assignment.submitted ? (
                      <div className="flex items-center text-green-600">
                        <FiCheckCircle className="mr-1" />
                        <span>Submitted</span>
                        {assignment.score && (
                          <span className="ml-2 font-medium">
                            {assignment.score}/{assignment.maxScore}
                          </span>
                        )}
                      </div>
                    ) : (
                      <div className="flex space-x-2">
                        <button className="text-primary-600 hover:text-primary-700 text-sm">
                          <FiFileText className="inline mr-1" />
                          View Details
                        </button>
                        <button
                          onClick={() =>
                            document
                              .getElementById(`file-input-${assignment.id}`)
                              ?.click()
                          }
                          className="text-green-600 hover:text-green-700 text-sm"
                        >
                          <FiUpload className="inline mr-1" />
                          Submit
                        </button>
                        <input
                          id={`file-input-${assignment.id}`}
                          type="file"
                          className="hidden"
                          onChange={(e) => {
                            if (e.target.files[0]) {
                              setSubmissionFile(e.target.files[0]);
                              handleFileUpload(assignment.id);
                            }
                          }}
                        />
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card">
        <h2 className="text-xl font-bold mb-4">Submission Guidelines</h2>
        <div className="space-y-4">
          <div className="p-4 bg-blue-50 rounded-lg">
            <h3 className="font-medium text-blue-800 mb-2">
              File Requirements
            </h3>
            <ul className="text-sm text-blue-600 list-disc pl-5 space-y-1">
              <li>Submit files in PDF, DOC, or DOCX format only</li>
              <li>Maximum file size: 10MB</li>
              <li>Include your name and student ID in the file</li>
              <li>Use the naming convention: Course_Assignment_LastName.pdf</li>
            </ul>
          </div>

          <div className="p-4 bg-green-50 rounded-lg">
            <h3 className="font-medium text-green-800 mb-2">
              Late Submission Policy
            </h3>
            <ul className="text-sm text-green-600 list-disc pl-5 space-y-1">
              <li>Late submissions accepted with 10% penalty per day</li>
              <li>No submissions accepted after 5 days past deadline</li>
              <li>Extensions available with prior approval</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyAssignments;
