import { useState, useEffect } from "react";
import {
  FiTrendingUp,
  FiUsers,
  FiBook,
  FiDollarSign,
  FiDownload,
} from "react-icons/fi";
import { Line, Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
);

const Analytics = () => {
  const [timeRange, setTimeRange] = useState("monthly");
  const [stats, setStats] = useState({
    totalRevenue: 0,
    newUsers: 0,
    courseEnrollments: 0,
    completionRate: 0,
  });

  useEffect(() => {
    // Mock data based on time range
    const data = {
      monthly: {
        totalRevenue: 125000,
        newUsers: 45,
        courseEnrollments: 120,
        completionRate: 85,
      },
      quarterly: {
        totalRevenue: 375000,
        newUsers: 135,
        courseEnrollments: 360,
        completionRate: 82,
      },
      yearly: {
        totalRevenue: 1500000,
        newUsers: 540,
        courseEnrollments: 1440,
        completionRate: 88,
      },
    };

    setStats(data[timeRange]);
  }, [timeRange]);

  const revenueData = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Revenue",
        data: [
          95000, 110000, 125000, 140000, 130000, 145000, 160000, 155000, 170000,
          165000, 180000, 195000,
        ],
        borderColor: "rgb(59, 130, 246)",
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        tension: 0.4,
      },
    ],
  };

  const userGrowthData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "New Users",
        data: [45, 52, 48, 65, 58, 72],
        backgroundColor: "rgba(16, 185, 129, 0.8)",
      },
      {
        label: "Active Users",
        data: [320, 335, 340, 355, 365, 380],
        backgroundColor: "rgba(59, 130, 246, 0.8)",
      },
    ],
  };

  const courseDistributionData = {
    labels: ["Computer Science", "Business", "Engineering", "Medicine", "Arts"],
    datasets: [
      {
        data: [35, 25, 20, 15, 5],
        backgroundColor: [
          "rgba(59, 130, 246, 0.8)",
          "rgba(16, 185, 129, 0.8)",
          "rgba(139, 92, 246, 0.8)",
          "rgba(245, 158, 11, 0.8)",
          "rgba(239, 68, 68, 0.8)",
        ],
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
            <span className="text-gray-500 text-sm ml-2">from last period</span>
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
          <h1 className="text-3xl font-bold text-gray-900">
            Analytics Dashboard
          </h1>
          <p className="text-gray-600">
            Comprehensive insights and performance metrics
          </p>
        </div>
        <div className="flex space-x-3">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="input-field"
          >
            <option value="monthly">Monthly</option>
            <option value="quarterly">Quarterly</option>
            <option value="yearly">Yearly</option>
          </select>
          <button className="btn-secondary flex items-center">
            <FiDownload className="mr-2" />
            Export Report
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={<FiDollarSign className="h-6 w-6 text-green-600" />}
          title="Total Revenue"
          value={`$${stats.totalRevenue.toLocaleString()}`}
          change={12}
          color="bg-green-50"
        />
        <StatCard
          icon={<FiUsers className="h-6 w-6 text-blue-600" />}
          title="New Users"
          value={stats.newUsers.toLocaleString()}
          change={8}
          color="bg-blue-50"
        />
        <StatCard
          icon={<FiBook className="h-6 w-6 text-purple-600" />}
          title="Course Enrollments"
          value={stats.courseEnrollments.toLocaleString()}
          change={15}
          color="bg-purple-50"
        />
        <StatCard
          icon={<FiTrendingUp className="h-6 w-6 text-orange-600" />}
          title="Completion Rate"
          value={`${stats.completionRate}%`}
          change={5}
          color="bg-orange-50"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h2 className="text-xl font-bold mb-4">Revenue Trend</h2>
          <Line data={revenueData} options={{ responsive: true }} />
        </div>

        <div className="card">
          <h2 className="text-xl font-bold mb-4">User Growth</h2>
          <Bar data={userGrowthData} options={{ responsive: true }} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h2 className="text-xl font-bold mb-4">Course Distribution</h2>
          <div className="h-64">
            <Pie data={courseDistributionData} options={{ responsive: true }} />
          </div>
        </div>

        <div className="card">
          <h2 className="text-xl font-bold mb-4">Key Performance Indicators</h2>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">User Satisfaction</span>
                <span className="text-sm font-medium">94%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-600 h-2 rounded-full"
                  style={{ width: "94%" }}
                ></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Platform Uptime</span>
                <span className="text-sm font-medium">99.9%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full"
                  style={{ width: "99.9%" }}
                ></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">
                  Support Response Time
                </span>
                <span className="text-sm font-medium">2.4 hours</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-purple-600 h-2 rounded-full"
                  style={{ width: "80%" }}
                ></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Mobile App Usage</span>
                <span className="text-sm font-medium">65%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-orange-600 h-2 rounded-full"
                  style={{ width: "65%" }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <h2 className="text-xl font-bold mb-4">Top Performing Metrics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">98%</div>
            <div className="text-sm text-green-800">Student Retention</div>
            <div className="text-xs text-green-600 mt-1">
              +3% from last quarter
            </div>
          </div>
          <div className="p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">4.7/5</div>
            <div className="text-sm text-blue-800">Instructor Rating</div>
            <div className="text-xs text-blue-600 mt-1">
              Average across all courses
            </div>
          </div>
          <div className="p-4 bg-purple-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">85%</div>
            <div className="text-sm text-purple-800">Assignment Completion</div>
            <div className="text-xs text-purple-600 mt-1">
              +8% from last month
            </div>
          </div>
          <div className="p-4 bg-orange-50 rounded-lg">
            <div className="text-2xl font-bold text-orange-600">92%</div>
            <div className="text-sm text-orange-800">Attendance Rate</div>
            <div className="text-xs text-orange-600 mt-1">
              Consistently high
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <h2 className="text-xl font-bold mb-4">Recommendations & Insights</h2>
        <div className="space-y-4">
          <div className="p-4 bg-blue-50 rounded-lg">
            <h3 className="font-medium text-blue-800 mb-2">
              📈 Growth Opportunity
            </h3>
            <p className="text-sm text-blue-600">
              Computer Science courses show 35% higher enrollment rates.
              Consider expanding this department with additional courses and
              instructors.
            </p>
          </div>

          <div className="p-4 bg-green-50 rounded-lg">
            <h3 className="font-medium text-green-800 mb-2">
              🎯 Retention Strategy
            </h3>
            <p className="text-sm text-green-600">
              Student satisfaction is highest in courses with interactive
              content. Encourage instructors to incorporate more interactive
              elements.
            </p>
          </div>

          <div className="p-4 bg-yellow-50 rounded-lg">
            <h3 className="font-medium text-yellow-800 mb-2">
              ⚠️ Attention Required
            </h3>
            <p className="text-sm text-yellow-600">
              Arts department shows lowest enrollment (5%). Consider promotional
              campaigns or curriculum updates to boost interest.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
