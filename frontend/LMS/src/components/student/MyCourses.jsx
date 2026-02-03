import { useState } from "react";
import {
  FiBook,
  FiClock,
  FiUsers,
  FiCalendar,
  FiDownload,
} from "react-icons/fi";

const MyCourses = () => {
  const [courses, setCourses] = useState([
    {
      id: 1,
      code: "CS101",
      name: "Introduction to Computer Science",
      instructor: "Dr. John Smith",
      schedule: "Mon/Wed 9:00 AM - 10:30 AM",
      room: "Room 301",
      credits: 3,
      progress: 85,
      assignments: 5,
      nextClass: "Today, 9:00 AM",
    },
    {
      id: 2,
      code: "MATH101",
      name: "Calculus I",
      instructor: "Prof. Sarah Johnson",
      schedule: "Tue/Thu 11:00 AM - 12:30 PM",
      room: "Room 205",
      credits: 4,
      progress: 72,
      assignments: 3,
      nextClass: "Tomorrow, 11:00 AM",
    },
    {
      id: 3,
      code: "ENG101",
      name: "English Composition",
      instructor: "Dr. Emily Wilson",
      schedule: "Mon/Wed 2:00 PM - 3:30 PM",
      room: "Room 112",
      credits: 3,
      progress: 90,
      assignments: 2,
      nextClass: "Today, 2:00 PM",
    },
    {
      id: 4,
      code: "PHY101",
      name: "Physics I",
      instructor: "Dr. Robert Brown",
      schedule: "Tue/Thu 1:00 PM - 2:30 PM",
      room: "Lab 3",
      credits: 4,
      progress: 65,
      assignments: 4,
      nextClass: "Tomorrow, 1:00 PM",
    },
  ]);

  const [selectedCourse, setSelectedCourse] = useState(null);

  const CourseCard = ({ course }) => (
    <div className="card hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <span className="px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-sm font-medium">
            {course.code}
          </span>
          <h3 className="text-xl font-bold mt-2">{course.name}</h3>
          <p className="text-gray-600">Instructor: {course.instructor}</p>
        </div>
        <div className="text-right">
          <span className="text-lg font-bold">{course.credits} Credits</span>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center text-gray-600">
          <FiCalendar className="mr-2" />
          <span>{course.schedule}</span>
        </div>
        <div className="flex items-center text-gray-600">
          <FiClock className="mr-2" />
          <span>Next: {course.nextClass}</span>
        </div>
        <div className="flex items-center text-gray-600">
          <FiUsers className="mr-2" />
          <span>{course.assignments} Assignments</span>
        </div>
      </div>

      <div className="mt-4">
        <div className="flex justify-between text-sm mb-1">
          <span>Progress</span>
          <span>{course.progress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-green-600 h-2 rounded-full"
            style={{ width: `${course.progress}%` }}
          ></div>
        </div>
      </div>

      <div className="mt-6 flex space-x-3">
        <button className="flex-1 btn-primary py-2">View Course</button>
        <button className="flex-1 btn-secondary py-2">Materials</button>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Courses</h1>
          <p className="text-gray-600">View and manage your enrolled courses</p>
        </div>
        <button className="btn-secondary flex items-center">
          <FiDownload className="mr-2" />
          Export Schedule
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>

      <div className="card">
        <h2 className="text-xl font-bold mb-4">Weekly Schedule</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="table-header">Time</th>
                <th className="table-header">Monday</th>
                <th className="table-header">Tuesday</th>
                <th className="table-header">Wednesday</th>
                <th className="table-header">Thursday</th>
                <th className="table-header">Friday</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {["9:00 AM", "11:00 AM", "2:00 PM", "4:00 PM"].map((time) => (
                <tr key={time}>
                  <td className="px-6 py-4 font-medium">{time}</td>
                  {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map(
                    (day) => (
                      <td key={day} className="px-6 py-4">
                        {time === "9:00 AM" && day === "Monday" && (
                          <div className="bg-blue-50 p-2 rounded">
                            <p className="font-medium text-blue-800">CS101</p>
                            <p className="text-sm text-blue-600">Room 301</p>
                          </div>
                        )}
                        {time === "11:00 AM" && day === "Tuesday" && (
                          <div className="bg-green-50 p-2 rounded">
                            <p className="font-medium text-green-800">
                              MATH101
                            </p>
                            <p className="text-sm text-green-600">Room 205</p>
                          </div>
                        )}
                        {time === "2:00 PM" && day === "Monday" && (
                          <div className="bg-purple-50 p-2 rounded">
                            <p className="font-medium text-purple-800">
                              ENG101
                            </p>
                            <p className="text-sm text-purple-600">Room 112</p>
                          </div>
                        )}
                        {time === "1:00 PM" && day === "Tuesday" && (
                          <div className="bg-orange-50 p-2 rounded">
                            <p className="font-medium text-orange-800">
                              PHY101
                            </p>
                            <p className="text-sm text-orange-600">Lab 3</p>
                          </div>
                        )}
                      </td>
                    ),
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card">
        <h2 className="text-xl font-bold mb-4">Course Materials</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border rounded-lg p-4 hover:bg-gray-50">
            <div className="flex items-center mb-3">
              <FiBook className="text-blue-600 mr-2" />
              <h3 className="font-medium">CS101 Syllabus</h3>
            </div>
            <p className="text-sm text-gray-600 mb-2">
              Course outline and requirements
            </p>
            <button className="text-primary-600 text-sm hover:text-primary-700">
              Download PDF
            </button>
          </div>
          <div className="border rounded-lg p-4 hover:bg-gray-50">
            <div className="flex items-center mb-3">
              <FiBook className="text-green-600 mr-2" />
              <h3 className="font-medium">Lecture Notes</h3>
            </div>
            <p className="text-sm text-gray-600 mb-2">
              Week 1-5 lecture materials
            </p>
            <button className="text-primary-600 text-sm hover:text-primary-700">
              View Notes
            </button>
          </div>
          <div className="border rounded-lg p-4 hover:bg-gray-50">
            <div className="flex items-center mb-3">
              <FiBook className="text-purple-600 mr-2" />
              <h3 className="font-medium">Assignment Guide</h3>
            </div>
            <p className="text-sm text-gray-600 mb-2">
              Assignment submission guidelines
            </p>
            <button className="text-primary-600 text-sm hover:text-primary-700">
              View Guide
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyCourses;
