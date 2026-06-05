import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiActivity, FiAward, FiBarChart2, FiClock, FiPieChart, FiPlus, FiShield, FiStar, FiUser, FiUsers } from "react-icons/fi";

import Loader from "../components/Loader.jsx";
import useAuth from "../hooks/useAuth.js";
import { getAdminDashboard } from "../services/adminService.js";
import { getApiErrorMessage } from "../utils/validators.js";

const metricItems = [
  { key: "totalUsers", label: "Total Users", icon: <FiUsers className="h-5 w-5" /> },
  { key: "totalStudents", label: "Total Students", icon: <FiUser className="h-5 w-5" /> },
  { key: "totalAdmins", label: "Total Admins", icon: <FiShield className="h-5 w-5" /> },
  { key: "totalTests", label: "Total Tests", icon: <FiActivity className="h-5 w-5" /> },
  { key: "averageScore", label: "Average Score", icon: <FiBarChart2 className="h-5 w-5" /> },
  { key: "highestScore", label: "Highest Score", icon: <FiStar className="h-5 w-5" /> }
];

const adminActionClass =
  "inline-flex items-center gap-2 rounded-full bg-brand-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-700 dark:bg-brand-500 dark:hover:bg-brand-400";

const AdminDashboard = () => {
  const { user } = useAuth();
  const [dashboardData, setDashboardData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [unauthorized, setUnauthorized] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.role !== "admin") {
      setUnauthorized(true);
      const timer = window.setTimeout(() => {
        navigate("/dashboard", { replace: true });
      }, 1800);
      return () => window.clearTimeout(timer);
    }

    const loadDashboard = async () => {
      setIsLoading(true);
      setError("");

      try {
        const response = await getAdminDashboard();
        setDashboardData(response);
      } catch (apiError) {
        setError(getApiErrorMessage(apiError, "Unable to load admin dashboard."));
      } finally {
        setIsLoading(false);
      }
    };

    if (user?.role === "admin") {
      loadDashboard();
    }
  }, [user, navigate]);

  const testsByCategory = dashboardData?.testsByCategory || [];
  const recentRegistrations = dashboardData?.recentRegistrations || [];
  const topPerformers = dashboardData?.topPerformers || [];

  const formattedMetrics = useMemo(() => {
    if (!dashboardData) return {};
    return {
      totalUsers: dashboardData.metrics.totalUsers,
      totalStudents: dashboardData.metrics.totalStudents,
      totalAdmins: dashboardData.metrics.totalAdmins,
      totalTests: dashboardData.metrics.totalTests,
      averageScore: `${dashboardData.metrics.averageScore}%`,
      highestScore: `${dashboardData.metrics.highestScore}%`
    };
  }, [dashboardData]);

  if (unauthorized) {
    return (
      <section className="container-page py-6 sm:py-8">
        <div className="rounded-lg border border-amber-200 bg-amber-50 p-6 text-slate-900 shadow-soft dark:border-amber-900/40 dark:bg-amber-950/20 dark:text-amber-100">
          <h1 className="text-xl font-bold">Unauthorized Access</h1>
          <p className="mt-2 text-sm">You do not have admin access. Redirecting to your dashboard...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="container-page py-6 sm:py-8">
      <div className="space-y-6">
        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-soft dark:border-slate-800 dark:bg-slate-900">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-wide text-brand-700 dark:text-brand-100">Admin Dashboard</p>
              <h1 className="mt-1 text-2xl font-bold text-slate-950 dark:text-white">Welcome, {user?.name}</h1>
              <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={() => navigate("/admin/aptitude-questions")}
                  className={adminActionClass}
                >
                  <FiPlus className="h-4 w-4" />
                  Manage Aptitude Questions
                </button>
                <button
                  type="button"
                  onClick={() => navigate("/admin/technical-questions")}
                  className={adminActionClass}
                >
                  <FiPlus className="h-4 w-4" />
                  Manage Technical Questions
                </button>
                <button
                  type="button"
                  onClick={() => navigate("/admin/coding-questions")}
                  className={adminActionClass}
                >
                  <FiPlus className="h-4 w-4" />
                  Manage Coding Questions
                </button>
                <button
                  type="button"
                  onClick={() => navigate("/admin/analytics")}
                  className={adminActionClass}
                >
                  <FiPieChart className="h-4 w-4" />
                  View Analytics
                </button>
              </div>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-800 dark:bg-slate-800 dark:text-slate-200">
              <FiClock className="h-4 w-4" />
              Admin only
            </div>
          </div>
        </div>

        {error && (
          <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700 dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-200">
            {error}
          </div>
        )}

        {isLoading ? (
          <Loader label="Loading admin metrics" />
        ) : (
          <>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {metricItems.map((item) => (
                <div key={item.key} className="rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-950">
                  <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-brand-700 shadow-sm dark:bg-slate-900 dark:text-brand-100">
                      {item.icon}
                    </span>
                    <p className="text-sm font-semibold uppercase tracking-wide">{item.label}</p>
                  </div>
                  <p className="mt-4 text-3xl font-bold text-slate-950 dark:text-white">{formattedMetrics[item.key]}</p>
                </div>
              ))}
            </div>

            <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-semibold text-slate-950 dark:text-white">Recent Registrations</h2>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Latest users who joined the platform.</p>
                  </div>
                </div>
                <div className="space-y-4">
                  {recentRegistrations.length ? (
                    recentRegistrations.map((userItem) => (
                      <div key={userItem._id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950">
                        <p className="font-semibold text-slate-950 dark:text-white">{userItem.name}</p>
                        <p className="text-sm text-slate-600 dark:text-slate-400">{userItem.email}</p>
                        <p className="mt-2 text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">{userItem.role}</p>
                      </div>
                    ))
                  ) : (
                    <div className="rounded-2xl border border-dashed border-slate-300 p-6 text-sm text-slate-500 dark:border-slate-700 dark:text-slate-400">
                      No recent registrations available.
                    </div>
                  )}
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900">
                <div className="mb-4">
                  <h2 className="text-xl font-semibold text-slate-950 dark:text-white">Top Performers</h2>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Students with the strongest aggregated performance.</p>
                </div>
                <div className="space-y-3">
                  {topPerformers.length ? (
                    topPerformers.map((performer) => (
                      <div key={performer._id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950">
                        <div className="flex items-center justify-between gap-3">
                          <div>
                            <p className="font-semibold text-slate-950 dark:text-white">{performer.name}</p>
                            <p className="text-sm text-slate-600 dark:text-slate-400">{performer.email}</p>
                          </div>
                          <FiAward className="h-5 w-5 text-brand-600" />
                        </div>
                        <div className="mt-3 grid gap-2 text-sm text-slate-600 dark:text-slate-400 sm:grid-cols-3">
                          <div>
                            <p className="font-semibold text-slate-950 dark:text-white">Avg Score</p>
                            <p>{performer.averageScore}%</p>
                          </div>
                          <div>
                            <p className="font-semibold text-slate-950 dark:text-white">Highest</p>
                            <p>{performer.highestScore}%</p>
                          </div>
                          <div>
                            <p className="font-semibold text-slate-950 dark:text-white">Tests</p>
                            <p>{performer.testsTaken}</p>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="rounded-2xl border border-dashed border-slate-300 p-6 text-sm text-slate-500 dark:border-slate-700 dark:text-slate-400">
                      No top performers available.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default AdminDashboard;
