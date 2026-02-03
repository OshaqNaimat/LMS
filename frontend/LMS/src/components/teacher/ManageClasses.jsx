import { useState } from "react";
import {
  FiUsers,
  FiCalendar,
  FiBook,
  FiPlus,
  FiEdit2,
  FiTrash2,
} from "react-icons/fi";

const ManageClasses = () => {
  const [classes, setClasses] = useState([
    {
      id: 1,
      code: "CS101",
      name: "Introduction to Computer Science",
      schedule: "Mon/Wed 9:00 AM - 10:30 AM",
      room: "Room 301",
      students: 45,
      assignments: 5,
      status: "active",
    },
    {
      id: 2,
      code: "CS102",
      name: "Data Structures & Algorithms",
      schedule: "Tue/Thu 11:00 AM - 12:30 PM",
      room: "Room 302",
      students: 38,
      assignments: 3,
      status: "active",
    },
    {
      id: 3,
      code: "CS201",
      name: "Database Systems",
      schedule: "Mon/Wed 2:00 PM - 3:30 PM",
      room: "Lab 1",
      students: 32,
      assignments: 4,
      status: "active",
    },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [editingClass, setEditingClass] = useState(null);
  const [formData, setFormData] = useState({
    code: "",
    name: "",
    schedule: "",
    room: "",
    maxStudents: 50,
  });

  const handleAddClass = () => {
    const newClass = {
      id: Date.now(),
      ...formData,
      students: 0,
      assignments: 0,
      status: "active",
    };
    setClasses([...classes, newClass]);
    setShowAddModal(false);
    setFormData({
      code: "",
      name: "",
      schedule: "",
      room: "",
      maxStudents: 50,
    });
  };

  const handleEditClass = (classItem) => {
    setEditingClass(classItem);
    setFormData(classItem);
    setShowAddModal(true);
  };

  const handleUpdateClass = () => {
    setClasses(
      classes.map((c) =>
        c.id === editingClass.id ? { ...c, ...formData } : c,
      ),
    );
    setShowAddModal(false);
    setEditingClass(null);
    setFormData({
      code: "",
      name: "",
      schedule: "",
      room: "",
      maxStudents: 50,
    });
  };

  const handleDeleteClass = (id) => {
    if (window.confirm("Are you sure you want to delete this class?")) {
      setClasses(classes.filter((c) => c.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Manage Classes</h1>
          <p className="text-gray-600">
            Manage your teaching schedule and classes
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="btn-primary flex items-center"
        >
          <FiPlus className="mr-2" />
          Add Class
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {classes.map((classItem) => (
          <div
            key={classItem.id}
            className="card hover:shadow-lg transition-shadow"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-sm font-medium">
                  {classItem.code}
                </span>
                <h3 className="text-xl font-bold mt-2">{classItem.name}</h3>
              </div>
              <span
                className={`px-2 py-1 rounded-full text-xs ${
                  classItem.status === "active"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {classItem.status}
              </span>
            </div>

            <div className="space-y-3">
              <div className="flex items-center text-gray-600">
                <FiCalendar className="mr-2" />
                <span>{classItem.schedule}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <FiBook className="mr-2" />
                <span>{classItem.room}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <FiUsers className="mr-2" />
                <span>{classItem.students} students enrolled</span>
              </div>
            </div>

            <div className="mt-6 flex space-x-2">
              <button
                onClick={() => handleEditClass(classItem)}
                className="flex-1 btn-secondary py-2"
              >
                <FiEdit2 className="inline mr-1" />
                Edit
              </button>
              <button
                onClick={() => handleDeleteClass(classItem.id)}
                className="flex-1 bg-red-100 text-red-700 hover:bg-red-200 py-2 rounded-lg"
              >
                <FiTrash2 className="inline mr-1" />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="card">
        <h2 className="text-xl font-bold mb-4">Class Statistics</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">
              {classes.length}
            </div>
            <div className="text-sm text-blue-800">Total Classes</div>
          </div>
          <div className="p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">
              {classes.reduce((sum, c) => sum + c.students, 0)}
            </div>
            <div className="text-sm text-green-800">Total Students</div>
          </div>
          <div className="p-4 bg-purple-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">
              {classes.reduce((sum, c) => sum + c.assignments, 0)}
            </div>
            <div className="text-sm text-purple-800">Total Assignments</div>
          </div>
          <div className="p-4 bg-yellow-50 rounded-lg">
            <div className="text-2xl font-bold text-yellow-600">
              {Math.round(
                classes.reduce((sum, c) => sum + c.students, 0) /
                  classes.length,
              )}
            </div>
            <div className="text-sm text-yellow-800">Avg Students/Class</div>
          </div>
        </div>
      </div>

      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">
              {editingClass ? "Edit Class" : "Add New Class"}
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Course Code
                </label>
                <input
                  type="text"
                  value={formData.code}
                  onChange={(e) =>
                    setFormData({ ...formData, code: e.target.value })
                  }
                  className="input-field"
                  placeholder="CS101"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Course Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="input-field"
                  placeholder="Introduction to Computer Science"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Schedule
                </label>
                <input
                  type="text"
                  value={formData.schedule}
                  onChange={(e) =>
                    setFormData({ ...formData, schedule: e.target.value })
                  }
                  className="input-field"
                  placeholder="Mon/Wed 9:00 AM - 10:30 AM"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Room
                </label>
                <input
                  type="text"
                  value={formData.room}
                  onChange={(e) =>
                    setFormData({ ...formData, room: e.target.value })
                  }
                  className="input-field"
                  placeholder="Room 301"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Maximum Students
                </label>
                <input
                  type="number"
                  value={formData.maxStudents}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      maxStudents: parseInt(e.target.value),
                    })
                  }
                  className="input-field"
                  min="1"
                  max="100"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setEditingClass(null);
                  setFormData({
                    code: "",
                    name: "",
                    schedule: "",
                    room: "",
                    maxStudents: 50,
                  });
                }}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={editingClass ? handleUpdateClass : handleAddClass}
                className="btn-primary px-4 py-2"
              >
                {editingClass ? "Update Class" : "Add Class"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageClasses;
