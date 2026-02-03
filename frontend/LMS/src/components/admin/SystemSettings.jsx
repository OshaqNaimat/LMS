import { useState } from "react";
import {
  FiSave,
  FiRefreshCw,
  FiDatabase,
  FiMail,
  FiLock,
  FiBell,
} from "react-icons/fi";

const SystemSettings = () => {
  const [settings, setSettings] = useState({
    // General Settings
    siteName: "LMS Pro",
    siteUrl: "https://lmspro.edu",
    timezone: "UTC-5",
    dateFormat: "MM/DD/YYYY",
    language: "English",

    // Email Settings
    smtpHost: "smtp.gmail.com",
    smtpPort: "587",
    smtpUsername: "noreply@lmspro.edu",
    notificationEmail: "notifications@lmspro.edu",

    // Security Settings
    passwordExpiry: "90", // days
    maxLoginAttempts: "5",
    sessionTimeout: "30", // minutes
    twoFactorAuth: true,

    // System Settings
    maintenanceMode: false,
    backupFrequency: "daily",
    maxUploadSize: "10", // MB
    enableApi: true,
  });

  const [activeTab, setActiveTab] = useState("general");
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      alert("Settings saved successfully!");
    }, 1000);
  };

  const handleReset = () => {
    if (
      window.confirm("Are you sure you want to reset all settings to default?")
    ) {
      setSettings({
        siteName: "LMS Pro",
        siteUrl: "https://lmspro.edu",
        timezone: "UTC-5",
        dateFormat: "MM/DD/YYYY",
        language: "English",
        smtpHost: "smtp.gmail.com",
        smtpPort: "587",
        smtpUsername: "noreply@lmspro.edu",
        notificationEmail: "notifications@lmspro.edu",
        passwordExpiry: "90",
        maxLoginAttempts: "5",
        sessionTimeout: "30",
        twoFactorAuth: true,
        maintenanceMode: false,
        backupFrequency: "daily",
        maxUploadSize: "10",
        enableApi: true,
      });
    }
  };

  const tabs = [
    { id: "general", label: "General", icon: <FiDatabase /> },
    { id: "email", label: "Email", icon: <FiMail /> },
    { id: "security", label: "Security", icon: <FiLock /> },
    { id: "notifications", label: "Notifications", icon: <FiBell /> },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">System Settings</h1>
          <p className="text-gray-600">
            Configure system preferences and settings
          </p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={handleReset}
            className="btn-secondary flex items-center"
          >
            <FiRefreshCw className="mr-2" />
            Reset to Default
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="btn-primary flex items-center"
          >
            <FiSave className="mr-2" />
            {isSaving ? "Saving..." : "Save Settings"}
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="border-b">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center ${
                  activeTab === tab.id
                    ? "border-primary-500 text-primary-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === "general" && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold">General Settings</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Site Name
                  </label>
                  <input
                    type="text"
                    value={settings.siteName}
                    onChange={(e) =>
                      setSettings({ ...settings, siteName: e.target.value })
                    }
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Site URL
                  </label>
                  <input
                    type="url"
                    value={settings.siteUrl}
                    onChange={(e) =>
                      setSettings({ ...settings, siteUrl: e.target.value })
                    }
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Timezone
                  </label>
                  <select
                    value={settings.timezone}
                    onChange={(e) =>
                      setSettings({ ...settings, timezone: e.target.value })
                    }
                    className="input-field"
                  >
                    <option value="UTC-5">Eastern Time (UTC-5)</option>
                    <option value="UTC-6">Central Time (UTC-6)</option>
                    <option value="UTC-7">Mountain Time (UTC-7)</option>
                    <option value="UTC-8">Pacific Time (UTC-8)</option>
                    <option value="UTC">GMT (UTC)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date Format
                  </label>
                  <select
                    value={settings.dateFormat}
                    onChange={(e) =>
                      setSettings({ ...settings, dateFormat: e.target.value })
                    }
                    className="input-field"
                  >
                    <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                    <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                    <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Language
                  </label>
                  <select
                    value={settings.language}
                    onChange={(e) =>
                      setSettings({ ...settings, language: e.target.value })
                    }
                    className="input-field"
                  >
                    <option value="English">English</option>
                    <option value="Spanish">Spanish</option>
                    <option value="French">French</option>
                    <option value="German">German</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Maximum Upload Size (MB)
                  </label>
                  <input
                    type="number"
                    value={settings.maxUploadSize}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        maxUploadSize: e.target.value,
                      })
                    }
                    className="input-field"
                    min="1"
                    max="100"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === "email" && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold">Email Settings</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    SMTP Host
                  </label>
                  <input
                    type="text"
                    value={settings.smtpHost}
                    onChange={(e) =>
                      setSettings({ ...settings, smtpHost: e.target.value })
                    }
                    className="input-field"
                    placeholder="smtp.gmail.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    SMTP Port
                  </label>
                  <input
                    type="number"
                    value={settings.smtpPort}
                    onChange={(e) =>
                      setSettings({ ...settings, smtpPort: e.target.value })
                    }
                    className="input-field"
                    placeholder="587"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    SMTP Username
                  </label>
                  <input
                    type="text"
                    value={settings.smtpUsername}
                    onChange={(e) =>
                      setSettings({ ...settings, smtpUsername: e.target.value })
                    }
                    className="input-field"
                    placeholder="noreply@lmspro.edu"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Notification Email
                  </label>
                  <input
                    type="email"
                    value={settings.notificationEmail}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        notificationEmail: e.target.value,
                      })
                    }
                    className="input-field"
                    placeholder="notifications@lmspro.edu"
                  />
                </div>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-medium text-blue-800 mb-2">
                  Email Configuration
                </h3>
                <p className="text-sm text-blue-600">
                  Configure SMTP settings to enable email notifications for
                  users. Test your configuration after saving.
                </p>
              </div>
            </div>
          )}

          {activeTab === "security" && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold">Security Settings</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Password Expiry (days)
                  </label>
                  <input
                    type="number"
                    value={settings.passwordExpiry}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        passwordExpiry: e.target.value,
                      })
                    }
                    className="input-field"
                    min="30"
                    max="365"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Max Login Attempts
                  </label>
                  <input
                    type="number"
                    value={settings.maxLoginAttempts}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        maxLoginAttempts: e.target.value,
                      })
                    }
                    className="input-field"
                    min="1"
                    max="10"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Session Timeout (minutes)
                  </label>
                  <input
                    type="number"
                    value={settings.sessionTimeout}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        sessionTimeout: e.target.value,
                      })
                    }
                    className="input-field"
                    min="5"
                    max="120"
                  />
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="twoFactorAuth"
                    checked={settings.twoFactorAuth}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        twoFactorAuth: e.target.checked,
                      })
                    }
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="twoFactorAuth"
                    className="ml-2 block text-sm text-gray-900"
                  >
                    Enable Two-Factor Authentication
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="maintenanceMode"
                    checked={settings.maintenanceMode}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        maintenanceMode: e.target.checked,
                      })
                    }
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="maintenanceMode"
                    className="ml-2 block text-sm text-gray-900"
                  >
                    Maintenance Mode
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="enableApi"
                    checked={settings.enableApi}
                    onChange={(e) =>
                      setSettings({ ...settings, enableApi: e.target.checked })
                    }
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="enableApi"
                    className="ml-2 block text-sm text-gray-900"
                  >
                    Enable API Access
                  </label>
                </div>
              </div>
            </div>
          )}

          {activeTab === "notifications" && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold">Notification Settings</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h3 className="font-medium">Email Notifications</h3>
                    <p className="text-sm text-gray-600">
                      Receive notifications via email
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

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h3 className="font-medium">Assignment Deadlines</h3>
                    <p className="text-sm text-gray-600">
                      Notify before assignment deadlines
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

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h3 className="font-medium">Grade Updates</h3>
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

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h3 className="font-medium">Attendance Alerts</h3>
                    <p className="text-sm text-gray-600">
                      Notify about attendance issues
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h2 className="text-xl font-bold mb-4">System Information</h2>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">System Version</span>
              <span className="font-medium">v2.1.0</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Last Backup</span>
              <span className="font-medium">2024-01-15 02:00 AM</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Database Size</span>
              <span className="font-medium">245 MB</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Active Users</span>
              <span className="font-medium">142</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Server Status</span>
              <span className="font-medium text-green-600">Online</span>
            </div>
          </div>
        </div>

        <div className="card">
          <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <button className="w-full btn-primary text-left px-4 py-3">
              Run System Backup
            </button>
            <button className="w-full btn-secondary text-left px-4 py-3">
              Clear Cache
            </button>
            <button className="w-full border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg text-left px-4 py-3">
              View Logs
            </button>
            <button className="w-full border border-red-300 text-red-700 hover:bg-red-50 rounded-lg text-left px-4 py-3">
              Emergency Maintenance
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemSettings;
