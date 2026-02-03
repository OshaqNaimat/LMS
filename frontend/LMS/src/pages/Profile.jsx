import { useState } from "react";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiMapPin,
  FiCalendar,
  FiSave,
  FiUpload,
} from "react-icons/fi";
import { useAuth } from "../context/AuthContext";

const Profile = () => {
  const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: user?.address || "",
    bio:
      user?.bio ||
      "A dedicated student passionate about learning and technology.",
    department: user?.department || "Computer Science",
    joinDate: user?.joinDate || "2023-09-01",
  });

  const [avatar, setAvatar] = useState(
    user?.avatar || "https://ui-avatars.com/api/?name=User",
  );
  const [uploading, setUploading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile(formData);
    setIsEditing(false);
  };

  const handleAvatarUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploading(true);
      // Simulate upload
      setTimeout(() => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setAvatar(reader.result);
          updateProfile({ avatar: reader.result });
          setUploading(false);
        };
        reader.readAsDataURL(file);
      }, 1000);
    }
  };

  const ProfileField = ({
    icon,
    label,
    value,
    name,
    type = "text",
    editable = true,
  }) => (
    <div className="flex items-start space-x-3 py-3 border-b">
      <div className="p-2 bg-gray-100 rounded-lg">{icon}</div>
      <div className="flex-1">
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
        {isEditing && editable ? (
          <input
            type={type}
            name={name}
            value={formData[name]}
            onChange={(e) =>
              setFormData({ ...formData, [name]: e.target.value })
            }
            className="mt-1 input-field text-sm"
          />
        ) : (
          <p className="mt-1 text-gray-900">{value}</p>
        )}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Profile Settings</h1>
          <p className="text-gray-600">
            Manage your personal information and preferences
          </p>
        </div>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="btn-primary flex items-center"
          >
            <FiUser className="mr-2" />
            Edit Profile
          </button>
        ) : (
          <div className="flex space-x-3">
            <button
              onClick={() => {
                setIsEditing(false);
                setFormData({
                  name: user?.name || "",
                  email: user?.email || "",
                  phone: user?.phone || "",
                  address: user?.address || "",
                  bio:
                    user?.bio ||
                    "A dedicated student passionate about learning and technology.",
                  department: user?.department || "Computer Science",
                  joinDate: user?.joinDate || "2023-09-01",
                });
              }}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="btn-primary flex items-center"
            >
              <FiSave className="mr-2" />
              Save Changes
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <div className="card">
            <div className="text-center">
              <div className="relative inline-block">
                <img
                  src={avatar}
                  alt="Profile"
                  className="h-32 w-32 rounded-full mx-auto border-4 border-white shadow-lg"
                />
                {isEditing && (
                  <label className="absolute bottom-0 right-0 bg-primary-600 text-white p-2 rounded-full cursor-pointer hover:bg-primary-700">
                    <FiUpload />
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleAvatarUpload}
                    />
                  </label>
                )}
                {uploading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white"></div>
                  </div>
                )}
              </div>
              <h2 className="mt-4 text-xl font-bold">{user?.name}</h2>
              <p className="text-gray-600 capitalize">{user?.role}</p>
              <p className="text-sm text-gray-500 mt-1">{user?.email}</p>

              <div className="mt-6 space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Member Since</span>
                  <span className="font-medium">
                    {user?.createdAt || "2023-09-01"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Status</span>
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                    Active
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="card mt-6">
            <h3 className="font-bold text-lg mb-4">Security</h3>
            <button className="w-full btn-secondary mb-3">
              Change Password
            </button>
            <button className="w-full border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg py-2">
              Two-Factor Authentication
            </button>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="card">
            <h2 className="text-xl font-bold mb-6">Personal Information</h2>
            <div className="space-y-2">
              <ProfileField
                icon={<FiUser className="text-gray-600" />}
                label="Full Name"
                value={formData.name}
                name="name"
              />
              <ProfileField
                icon={<FiMail className="text-gray-600" />}
                label="Email Address"
                value={formData.email}
                name="email"
                type="email"
              />
              <ProfileField
                icon={<FiPhone className="text-gray-600" />}
                label="Phone Number"
                value={formData.phone || "Not set"}
                name="phone"
                editable={true}
              />
              <ProfileField
                icon={<FiMapPin className="text-gray-600" />}
                label="Address"
                value={formData.address || "Not set"}
                name="address"
                editable={true}
              />
              <ProfileField
                icon={<FiCalendar className="text-gray-600" />}
                label="Join Date"
                value={formData.joinDate}
                name="joinDate"
                type="date"
                editable={false}
              />
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bio
              </label>
              {isEditing ? (
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={(e) =>
                    setFormData({ ...formData, bio: e.target.value })
                  }
                  className="input-field h-32"
                  rows="4"
                />
              ) : (
                <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">
                  {formData.bio}
                </p>
              )}
            </div>
          </div>

          {user?.role === "student" && (
            <div className="card mt-6">
              <h2 className="text-xl font-bold mb-6">Academic Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Student ID
                  </label>
                  <p className="text-gray-900 font-medium">
                    {user?.studentId || "S001"}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Department
                  </label>
                  {isEditing ? (
                    <select
                      name="department"
                      value={formData.department}
                      onChange={(e) =>
                        setFormData({ ...formData, department: e.target.value })
                      }
                      className="input-field"
                    >
                      <option>Computer Science</option>
                      <option>Business Administration</option>
                      <option>Electrical Engineering</option>
                      <option>Medicine</option>
                      <option>Law</option>
                    </select>
                  ) : (
                    <p className="text-gray-900">{formData.department}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Current GPA
                  </label>
                  <p className="text-gray-900 font-medium">3.67</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Credits Completed
                  </label>
                  <p className="text-gray-900 font-medium">45/120</p>
                </div>
              </div>
            </div>
          )}

          {user?.role === "teacher" && (
            <div className="card mt-6">
              <h2 className="text-xl font-bold mb-6">Teaching Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Employee ID
                  </label>
                  <p className="text-gray-900 font-medium">T001</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Department
                  </label>
                  <p className="text-gray-900">{formData.department}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Courses Teaching
                  </label>
                  <p className="text-gray-900 font-medium">3 Courses</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Total Students
                  </label>
                  <p className="text-gray-900 font-medium">85 Students</p>
                </div>
              </div>
            </div>
          )}

          <div className="card mt-6">
            <h2 className="text-xl font-bold mb-4">Notification Preferences</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Email Notifications</p>
                  <p className="text-sm text-gray-600">
                    Receive updates via email
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    defaultChecked
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Assignment Reminders</p>
                  <p className="text-sm text-gray-600">
                    Get notified before deadlines
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    defaultChecked
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Grade Updates</p>
                  <p className="text-sm text-gray-600">
                    Notify when grades are posted
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    defaultChecked
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
