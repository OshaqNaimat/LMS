import { useState } from "react";
import {
  FiFilter,
  FiDownload,
  FiTrendingUp,
  FiTrendingDown,
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

const MyGrades = () => {
  const [grades, setGrades] = useState([
    {
      id: 1,
      course: "CS101",
      courseName: "Computer Science",
      grade: "A",
      percentage: 95,
      credits: 3,
      gpa: 4.0,
    },
    {
      id: 2,
      course: "MATH101",
      courseName: "Calculus I",
      grade: "B+",
      percentage: 88,
      credits: 4,
      gpa: 3.3,
    },
    {
      id: 3,
      course: "ENG101",
      courseName: "English Composition",
      grade: "A-",
      percentage: 92,
      credits: 3,
      gpa: 3.7,
    },
    {
      id: 4,
      course: "PHY101",
      courseName: "Physics I",
      grade: "B",
      percentage: 85,
      credits: 4,
      gpa: 3.0,
    },
    {
      id: 5,
      course: "HIST101",
      courseName: "World History",
      grade: "A",
      percentage: 96,
      credits: 3,
      gpa: 4.0,
    },
    {
      id: 6,
      course: "CHEM101",
      courseName: "Chemistry",
      grade: "B-",
      percentage: 82,
      credits: 4,
      gpa: 2.7,
    },
  ]);

  const [selectedSemester, setSelectedSemester] = useState("all");
  const [overallGPA, setOverallGPA] = useState(3.45);

  const chartData = {
    labels: grades.map((g) => g.course),
    datasets: [
      {
        label: "Percentage",
        data: grades.map((g) => g.percentage),
        backgroundColor: "rgba(59, 130, 246, 0.8)",
        borderColor: "rgb(59, 130, 246)",
        borderWidth: 1,
      },
    ],
  };

  const getGradeColor = (grade) => {
    switch (grade[0]) {
      case "A":
        return "bg-green-100 text-green-800";
      case "B":
        return "bg-blue-100 text-blue-800";
      case "C":
        return "bg-yellow-100 text-yellow-800";
      case "D":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-red-100 text-red-800";
    }
  };

  const calculateGPA = () => {
    const totalCredits = grades.reduce(
      (sum, course) => sum + course.credits,
      0,
    );
    const weightedSum = grades.reduce(
      (sum, course) => sum + course.gpa * course.credits,
      0,
    );
    return (weightedSum / totalCredits).toFixed(2);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Grades</h1>
          <p className="text-gray-600">
            View your academic performance and grades
          </p>
        </div>
        <div className="flex space-x-3">
          <button className="btn-secondary flex items-center">
            <FiDownload className="mr-2" />
            Export Grades
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card">
          <h3 className="text-lg font-bold mb-4">Overall GPA</h3>
          <div className="text-center">
            <div className="text-5xl font-bold text-primary-600 mb-2">
              {calculateGPA()}
            </div>
            <div className="flex items-center justify-center">
              <FiTrendingUp className="text-green-500 mr-1" />
              <span className="text-green-600">+0.15 from last semester</span>
            </div>
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-bold mb-4">Credit Summary</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span>Completed Credits</span>
              <span className="font-bold">18</span>
            </div>
            <div className="flex justify-between">
              <span>Current Credits</span>
              <span className="font-bold">15</span>
            </div>
            <div className="flex justify-between">
              <span>Required for Graduation</span>
              <span className="font-bold">120</span>
            </div>
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-bold mb-4">Grade Distribution</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>A Grades</span>
              <span className="font-bold text-green-600">2</span>
            </div>
            <div className="flex justify-between">
              <span>B Grades</span>
              <span className="font-bold text-blue-600">3</span>
            </div>
            <div className="flex justify-between">
              <span>C Grades</span>
              <span className="font-bold text-yellow-600">1</span>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="flex justify-between items-center mb-6">
          <div className="flex space-x-4">
            <select
              value={selectedSemester}
              onChange={(e) => setSelectedSemester(e.target.value)}
              className="input-field"
            >
              <option value="all">All Semesters</option>
              <option value="fall2023">Fall 2023</option>
              <option value="spring2024">Spring 2024</option>
            </select>
            <button className="btn-secondary flex items-center">
              <FiFilter className="mr-2" />
              Filter
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="table-header">Course Code</th>
                <th className="table-header">Course Name</th>
                <th className="table-header">Grade</th>
                <th className="table-header">Percentage</th>
                <th className="table-header">Credits</th>
                <th className="table-header">GPA Points</th>
                <th className="table-header">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {grades.map((course) => (
                <tr key={course.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium">{course.course}</td>
                  <td className="px-6 py-4">{course.courseName}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${getGradeColor(course.grade)}`}
                    >
                      {course.grade}
                    </span>
                  </td>
                  <td className="px-6 py-4">{course.percentage}%</td>
                  <td className="px-6 py-4">{course.credits}</td>
                  <td className="px-6 py-4">{course.gpa}</td>
                  <td className="px-6 py-4">
                    <span className="text-green-600 font-medium">
                      Completed
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h2 className="text-xl font-bold mb-4">Performance Chart</h2>
          <Bar data={chartData} options={{ responsive: true }} />
        </div>

        <div className="card">
          <h2 className="text-xl font-bold mb-4">Academic Standing</h2>
          <div className="space-y-4">
            <div className="p-4 bg-green-50 rounded-lg">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium text-green-800">Good Standing</h3>
                  <p className="text-sm text-green-600">
                    Your academic performance meets all requirements
                  </p>
                </div>
                <FiTrendingUp className="text-green-600 text-2xl" />
              </div>
            </div>

            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium text-blue-800">Attendance</h3>
                  <p className="text-sm text-blue-600">
                    92% attendance rate this semester
                  </p>
                </div>
                <span className="text-blue-600 font-bold">92%</span>
              </div>
            </div>

            <div className="p-4 bg-yellow-50 rounded-lg">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium text-yellow-800">
                    Next Evaluation
                  </h3>
                  <p className="text-sm text-yellow-600">
                    Mid-term evaluation in 2 weeks
                  </p>
                </div>
                <span className="text-yellow-600 font-bold">2 weeks</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyGrades;
