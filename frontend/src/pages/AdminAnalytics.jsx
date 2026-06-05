import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import { FiActivity, FiArrowLeft, FiAward, FiBarChart2, FiShield, FiUser, FiUsers } from "react-icons/fi";

import Loader from "../components/Loader.jsx";
import useAuth from "../hooks/useAuth.js";
import { getAnalyticsOverview, getAnalyticsTests, getAnalyticsUsers } from "../services/analyticsService.js";
import { formatDate } from "../utils/formatters.js";
import { getApiErrorMessage } from "../utils/validators.js";

const PIE_COLORS = ["#0d9672", "#14b88a", "#6366f1", "#f59e0b"];

const metricItems = [
  { key: "totalUsers", label: "Total Users", icon: <FiUsers className="h-5 w-5" /> },
  { key: "totalStudents", label: "Students", icon: <FiUser className="h-5 w-5" /> },
  { key: "totalAdmins", label: "Admins", icon: <FiShield className="h-5 w-5" /> },
  { key: "totalTests", label: "Total Tests", icon: <FiActivity className="h-5 w-5" /> },
  { key: "averageScore", label: "Average Score", icon: <FiBarChart2 className="h-5 w-5" />, suffix: "%" },
  { key: "highestScore", label: "Highest Score", icon: <FiAward className="h-5 w-5" />, suffix: "%" }
];

const chartCardClass =
  "rounded-2xl border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900";

const chartTooltipStyle = {
  contentStyle: {
    backgroundColor: "var(--tooltip-bg, #fff)",
    border: "1px solid #e2e8f0",
    borderRadius: "8px",
    fontSize: "13px"
  }
};

const SectionTitle = ({ children }) => (
  <h2 className="text-lg font-bold text-slate-950 dark:text-white">{children}</h2>
);

const AdminAnalytics = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [overview, setOverview] = useState(null);
  const [testsData, setTestsData] = useState(null);
  const [usersData, setUsersData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (user && user.role !== "admin") {
      navigate("/dashboard", { replace: true });
      return;
    }

    if (!user?.role) return;

    const load = async () => {
      setIsLoading(true);
      setError("");
      try {
        const [ov, td, ud] = await Promise.all([
          getAnalyticsOverview(),
          getAnalyticsTests(),
          getAnalyticsUsers()
        ]);
        setOverview(ov);
        setTestsData(td);
        setUsersData(ud);
      } catch (err) {
        setError(getApiErrorMessage(err, "Unable to load analytics data."));
      } finally {
        setIsLoading(false);
      }
    };

    load();
  }, [user, navigate]);

  return (
    <section className="container-page py-6 sm:py-8">
      <div className="space-y-6">
        {/* Header */}
        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-soft dark:border-slate-800 dark:bg-slate-900">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-wide text-brand-700 dark:text-brand-100">
                Admin
              </p>
              <h1 className="mt-1 text-2xl font-bold text-slate-950 dark:text-white">
                Analytics Dashboard
              </h1>
            </div>
            <button
              type="button"
              onClick={() => navigate("/admin")}
              className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-brand-500 hover:text-brand-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
            >
              <FiArrowLeft className="h-4 w-4" />
              Back to Admin
            </button>
          </div>
        </div>

        {error && (
          <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700 dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-200">
            {error}
          </div>
        )}

        {isLoading ? (
          <Loader label="Loading analytics" />
        ) : (
          <>
            {/* Overview Metrics */}
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {metricItems.map((item) => (
                <div
                  key={item.key}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-950"
                >
                  <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-brand-700 shadow-sm dark:bg-slate-900 dark:text-brand-100">
                      {item.icon}
                    </span>
                    <p className="text-sm font-semibold uppercase tracking-wide">{item.label}</p>
                  </div>
                  <p className="mt-4 text-3xl font-bold text-slate-950 dark:text-white">
                    {overview?.[item.key] ?? 0}
                    {item.suffix ?? ""}
                  </p>
                </div>
              ))}
            </div>

            {/* Charts Row 1: User Growth + Tests by Category */}
            <div className="grid gap-6 xl:grid-cols-2">
              {/* User Growth Line Chart */}
              <div className={chartCardClass}>
                <div className="mb-5">
                  <SectionTitle>User Growth</SectionTitle>
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    New registrations over the last 6 months
                  </p>
                </div>
                {usersData?.userGrowth?.length ? (
                  <ResponsiveContainer width="100%" height={240}>
                    <LineChart data={usersData.userGrowth} margin={{ top: 4, right: 16, left: -16, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#64748b" }} />
                      <YAxis allowDecimals={false} tick={{ fontSize: 12, fill: "#64748b" }} />
                      <Tooltip {...chartTooltipStyle} />
                      <Line
                        type="monotone"
                        dataKey="users"
                        stroke="#0d9672"
                        strokeWidth={2.5}
                        dot={{ r: 4, fill: "#0d9672" }}
                        activeDot={{ r: 6 }}
                        name="New Users"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                ) : (
                  <EmptyChart message="No registration data available" />
                )}
              </div>

              {/* Tests by Category Bar Chart */}
              <div className={chartCardClass}>
                <div className="mb-5">
                  <SectionTitle>Tests by Category</SectionTitle>
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    Number of tests attempted per category
                  </p>
                </div>
                {testsData?.testsByCategory?.length ? (
                  <ResponsiveContainer width="100%" height={240}>
                    <BarChart
                      data={testsData.testsByCategory}
                      margin={{ top: 4, right: 16, left: -16, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis
                        dataKey="category"
                        tick={{ fontSize: 12, fill: "#64748b" }}
                        tickFormatter={(v) => v.charAt(0).toUpperCase() + v.slice(1)}
                      />
                      <YAxis allowDecimals={false} tick={{ fontSize: 12, fill: "#64748b" }} />
                      <Tooltip
                        {...chartTooltipStyle}
                        formatter={(value, name) => [value, name === "count" ? "Tests" : "Avg %"]}
                        labelFormatter={(label) => label.charAt(0).toUpperCase() + label.slice(1)}
                      />
                      <Legend
                        formatter={(value) => (value === "count" ? "Tests Taken" : "Avg Score %")}
                        wrapperStyle={{ fontSize: "12px" }}
                      />
                      <Bar dataKey="count" fill="#0d9672" radius={[4, 4, 0, 0]} name="count" />
                      <Bar dataKey="averagePercentage" fill="#6366f1" radius={[4, 4, 0, 0]} name="averagePercentage" />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <EmptyChart message="No test category data available" />
                )}
              </div>
            </div>

            {/* Charts Row 2: Score Distribution Pie */}
            <div className="grid gap-6 xl:grid-cols-[1fr_1.4fr]">
              {/* Score Distribution Pie Chart */}
              <div className={chartCardClass}>
                <div className="mb-5">
                  <SectionTitle>Score Distribution</SectionTitle>
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    Tests grouped by score range
                  </p>
                </div>
                {testsData?.scoreDistribution?.some((s) => s.count > 0) ? (
                  <ResponsiveContainer width="100%" height={240}>
                    <PieChart>
                      <Pie
                        data={testsData.scoreDistribution.filter((s) => s.count > 0)}
                        dataKey="count"
                        nameKey="range"
                        cx="50%"
                        cy="50%"
                        outerRadius={90}
                        label={({ range, percent }) =>
                          `${range} (${(percent * 100).toFixed(0)}%)`
                        }
                        labelLine={false}
                      >
                        {testsData.scoreDistribution
                          .filter((s) => s.count > 0)
                          .map((_, idx) => (
                            <Cell key={idx} fill={PIE_COLORS[idx % PIE_COLORS.length]} />
                          ))}
                      </Pie>
                      <Tooltip
                        {...chartTooltipStyle}
                        formatter={(value) => [value, "Tests"]}
                      />
                      <Legend wrapperStyle={{ fontSize: "12px" }} />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <EmptyChart message="No score data available" />
                )}
              </div>

              {/* Recent Test Attempts */}
              <div className={chartCardClass}>
                <div className="mb-5">
                  <SectionTitle>Recent Test Attempts</SectionTitle>
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    Latest test submissions across all students
                  </p>
                </div>
                <div className="space-y-3">
                  {usersData?.recentTests?.length ? (
                    usersData.recentTests.map((test) => (
                      <div
                        key={test._id}
                        className="flex items-center justify-between gap-4 rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950"
                      >
                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold text-slate-950 dark:text-white">
                            {test.testName}
                          </p>
                          <p className="mt-0.5 truncate text-xs text-slate-500 dark:text-slate-400">
                            {test.userName} · {formatDate(test.createdAt)}
                          </p>
                        </div>
                        <div className="text-right shrink-0">
                          <p className="text-sm font-bold text-slate-950 dark:text-white">
                            {test.percentage}%
                          </p>
                          <p className="text-xs capitalize text-slate-500 dark:text-slate-400">
                            {test.category}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="rounded-xl border border-dashed border-slate-300 p-6 text-sm text-slate-500 dark:border-slate-700 dark:text-slate-400">
                      No recent test attempts.
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Recent Registrations Table */}
            <div className={chartCardClass}>
              <div className="mb-5">
                <SectionTitle>Recent Registrations</SectionTitle>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  Latest users who joined the platform
                </p>
              </div>
              {usersData?.recentRegistrations?.length ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-slate-200 dark:border-slate-800">
                        <th className="pb-3 text-left font-semibold text-slate-700 dark:text-slate-300">
                          Name
                        </th>
                        <th className="pb-3 text-left font-semibold text-slate-700 dark:text-slate-300">
                          Email
                        </th>
                        <th className="pb-3 text-left font-semibold text-slate-700 dark:text-slate-300">
                          Role
                        </th>
                        <th className="pb-3 text-left font-semibold text-slate-700 dark:text-slate-300">
                          Joined
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                      {usersData.recentRegistrations.map((u) => (
                        <tr key={u._id}>
                          <td className="py-3 font-medium text-slate-950 dark:text-white">{u.name}</td>
                          <td className="py-3 text-slate-600 dark:text-slate-400">{u.email}</td>
                          <td className="py-3">
                            <span
                              className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize ${
                                u.role === "admin"
                                  ? "bg-brand-50 text-brand-700 dark:bg-brand-900/30 dark:text-brand-100"
                                  : "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300"
                              }`}
                            >
                              {u.role}
                            </span>
                          </td>
                          <td className="py-3 text-slate-600 dark:text-slate-400">
                            {formatDate(u.createdAt)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="rounded-xl border border-dashed border-slate-300 p-6 text-sm text-slate-500 dark:border-slate-700 dark:text-slate-400">
                  No recent registrations.
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

const EmptyChart = ({ message }) => (
  <div className="flex h-60 items-center justify-center rounded-xl border border-dashed border-slate-300 text-sm text-slate-500 dark:border-slate-700 dark:text-slate-400">
    {message}
  </div>
);

export default AdminAnalytics;
