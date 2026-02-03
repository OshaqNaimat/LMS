import { useState } from "react";
import {
  FiSearch,
  FiFilter,
  FiCheckCircle,
  FiXCircle,
  FiDownload,
} from "react-icons/fi";

const GradeAssignments = () => {
  const [assignments, setAssignments] = useState([
    {
      id: 1,
      studentName: "John Doe",
      studentId: "S001",
      assignment: "Data Structures Project",
      course: "CS101",
      submittedDate: "2024-01-15",
      status: "submitted",
      score: null,
      maxScore: 100,
      file: "project.pdf",
    },
    {
      id: 2,
      studentName: "Jane Smith",
      studentId: "S002",
      assignment: "Data Structures Project",
      course: "CS101",
      submittedDate: "2024-01-16",
      status: "graded",
      score: 95,
      maxScore: 100,
      file: "project_jane.pdf",
    },
    {
      id: 3,
      studentName: "Bob Johnson",
      studentId: "S003",
      assignment: "Calculus Problem Set 3",
      course: "MATH101",
      submittedDate: "2024-01-14",
      status: "submitted",
      score: null,
      maxScore: 50,
      file: "calculus_ps3.pdf",
    },
    {
      id: 4,
      studentName: "Alice Brown",
      studentId: "S004",
      assignment: "Physics Lab Report",
      course: "PHY101",
      submittedDate: "2024-01-13",
      status: "graded",
      score: 88,
      maxScore: 100,
      file: "lab_report.pdf",
    },
  ]);

  const [selectedCourse, setSelectedCourse] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [grading, setGrading] = useState({});

  const handleGradeSubmit = (assignmentId, score) => {
    setAssignments(
      assignments.map((a) =>
        a.id === assignmentId
          ? { ...a, score: parseInt(score), status: "graded" }
          : a,
      ),
    );
    setGrading({ ...grading, [assignmentId]: false });
  };

  const filteredAssignments = assignments.filter((assignment) => {
    if (selectedCourse !== "all" && assignment.course !== selectedCourse)
      return false;
    if (selectedStatus !== "all" && assignment.status !== selectedStatus)
      return false;
    return true;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "graded":
        return "bg-green-100 text-green-800";
      case "submitted":
        return "bg-blue-100 text-blue-800";
      case "late":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Grade Assignments
          </h1>
          <p className="text-gray-600">Review and grade student submissions</p>
        </div>
        <button className="btn-secondary flex items-center">
          <FiDownload className="mr-2" />
          Export Grades
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card">
          <div className="text-2xl font-bold text-blue-600">
            {assignments.length}
          </div>
          <div className="text-sm text-blue-800">Total Submissions</div>
        </div>
        <div className="card">
          <div className="text-2xl font-bold text-green-600">
            {assignments.filter((a) => a.status === "graded").length}
          </div>
          <div className="text-sm text-green-800">Graded</div>
        </div>
        <div className="card">
          <div className="text-2xl font-bold text-yellow-600">
            {assignments.filter((a) => a.status === "submitted").length}
          </div>
          <div className="text-sm text-yellow-800">Pending</div>
        </div>
        <div className="card">
          <div className="text-2xl font-bold text-purple-600">
            {assignments.filter((a) => a.status === "late").length}
          </div>
          <div className="text-sm text-purple-800">Late</div>
        </div>
      </div>

      <div className="card">
        <div className="flex justify-between items-center mb-6">
          <div className="flex space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search assignments..."
                className="input-field pl-10"
              />
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            <select
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              className="input-field"
            >
              <option value="all">All Courses</option>
              <option value="CS101">CS101</option>
              <option value="MATH101">MATH101</option>
              <option value="PHY101">PHY101</option>
            </select>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="input-field"
            >
              <option value="all">All Status</option>
              <option value="submitted">Pending</option>
              <option value="graded">Graded</option>
              <option value="late">Late</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="table-header">Student</th>
                <th className="table-header">Assignment</th>
                <th className="table-header">Course</th>
                <th className="table-header">Submitted</th>
                <th className="table-header">Status</th>
                <th className="table-header">Score</th>
                <th className="table-header">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredAssignments.map((assignment) => (
                <tr key={assignment.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium">{assignment.studentName}</p>
                      <p className="text-sm text-gray-500">
                        {assignment.studentId}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-medium">
                    {assignment.assignment}
                  </td>
                  <td className="px-6 py-4">{assignment.course}</td>
                  <td className="px-6 py-4">{assignment.submittedDate}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${getStatusColor(assignment.status)}`}
                    >
                      {assignment.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {assignment.score !== null ? (
                      <span className="font-bold">
                        {assignment.score}/{assignment.maxScore}
                      </span>
                    ) : (
                      <span className="text-gray-500">Not graded</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <button
                        onClick={() =>
                          window.open(`/files/${assignment.file}`, "_blank")
                        }
                        className="text-primary-600 hover:text-primary-700 text-sm"
                      >
                        View
                      </button>
                      {assignment.status === "submitted" && (
                        <button
                          onClick={() =>
                            setGrading({ ...grading, [assignment.id]: true })
                          }
                          className="text-green-600 hover:text-green-700 text-sm"
                        >
                          Grade
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {Object.keys(grading).map((assignmentId) => {
        const assignment = assignments.find(
          (a) => a.id === parseInt(assignmentId),
        );
        if (!assignment || !grading[assignmentId]) return null;

        return (
          <div
            key={assignmentId}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
              <h2 className="text-xl font-bold mb-4">Grade Assignment</h2>
              <div className="space-y-4">
                <div>
                  <p className="font-medium">
                    Student: {assignment.studentName}
                  </p>
                  <p className="text-gray-600">
                    Assignment: {assignment.assignment}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Score (out of {assignment.maxScore})
                  </label>
                  <input
                    type="number"
                    min="0"
                    max={assignment.maxScore}
                    defaultValue={assignment.score || 0}
                    id={`score-${assignmentId}`}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Feedback (optional)
                  </label>
                  <textarea
                    className="input-field h-32"
                    placeholder="Add comments or feedback for the student..."
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() =>
                    setGrading({ ...grading, [assignmentId]: false })
                  }
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    const score = document.getElementById(
                      `score-${assignmentId}`,
                    ).value;
                    handleGradeSubmit(parseInt(assignmentId), score);
                  }}
                  className="btn-primary px-4 py-2"
                >
                  Submit Grade
                </button>
              </div>
            </div>
          </div>
        );
      })}

      <div className="card">
        <h2 className="text-xl font-bold mb-4">Grading Guidelines</h2>
        <div className="space-y-4">
          <div className="p-4 bg-blue-50 rounded-lg">
            <h3 className="font-medium text-blue-800 mb-2">Grading Rubric</h3>
            <ul className="text-sm text-blue-600 list-disc pl-5 space-y-1">
              <li>90-100: Excellent (A)</li>
              <li>80-89: Good (B)</li>
              <li>70-79: Satisfactory (C)</li>
              <li>60-69: Needs Improvement (D)</li>
              <li>Below 60: Unsatisfactory (F)</li>
            </ul>
          </div>

          <div className="p-4 bg-green-50 rounded-lg">
            <h3 className="font-medium text-green-800 mb-2">Feedback Tips</h3>
            <ul className="text-sm text-green-600 list-disc pl-5 space-y-1">
              <li>Be specific about strengths and weaknesses</li>
              <li>Provide actionable suggestions for improvement</li>
              <li>Maintain a constructive and supportive tone</li>
              <li>Return graded work within 7 days of submission</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GradeAssignments;
