import { useEffect, useMemo, useState } from "react";
import { FiActivity, FiAward, FiBarChart2, FiCode, FiCpu, FiFileText, FiMenu, FiTarget, FiUser } from "react-icons/fi";

import ActivityCard from "../components/ActivityCard.jsx";
import DashboardSidebar from "../components/DashboardSidebar.jsx";
import DashboardSkeleton from "../components/DashboardSkeleton.jsx";
import QuickActionCard from "../components/QuickActionCard.jsx";
import ReadinessCard from "../components/ReadinessCard.jsx";
import StatsCard from "../components/StatsCard.jsx";
import useAuth from "../hooks/useAuth.js";
import { getProfile, getReadinessScore, getTestHistory } from "../services/dashboardService.js";
import { formatDate } from "../utils/formatters.js";
import { getApiErrorMessage } from "../utils/validators.js";

const quickActions = [
  {
    title: "Start Aptitude Test",
    description: "Practice quantitative, logical, and verbal questions.",
    to: "/aptitude-tests",
    icon: <FiBarChart2 className="h-5 w-5" aria-hidden="true" />
  },
  {
    title: "Start Technical Test",
    description: "Attempt MCQs across Java, React, DBMS, OS, and CN.",
    to: "/technical-tests",
    icon: <FiCpu className="h-5 w-5" aria-hidden="true" />
  },
  {
    title: "View Coding Questions",
    description: "Prepare with structured programming problems.",
    to: "/coding-questions",
    icon: <FiCode className="h-5 w-5" aria-hidden="true" />
  },
  {
    title: "View Interview Questions",
    description: "Review company and HR interview preparation prompts.",
    to: "/interview-questions",
    icon: <FiFileText className="h-5 w-5" aria-hidden="true" />
  }
];

const Dashboard = () => {
  const { user: authUser, updateUser } = useAuth();
  const [profile, setProfile] = useState(authUser);
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [readiness, setReadiness] = useState(null);
  const [readinessLoading, setReadinessLoading] = useState(true);
  const [readinessError, setReadinessError] = useState("");

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const [profileResponse, historyResponse] = await Promise.all([getProfile(), getTestHistory()]);
        setProfile(profileResponse.user);
        updateUser(profileResponse.user);
        setHistory(historyResponse.history || []);
      } catch (apiError) {
        setError(getApiErrorMessage(apiError, "Unable to load dashboard data."));
      } finally {
        setIsLoading(false);
      }

      try {
        const readinessData = await getReadinessScore();
        setReadiness(readinessData);
      } catch (readinessApiError) {
        setReadinessError(getApiErrorMessage(readinessApiError, "Unable to load readiness score."));
      } finally {
        setReadinessLoading(false);
      }
    };

    loadDashboard();
  }, [updateUser]);

  const stats = useMemo(() => {
    const testsTaken = profile?.testsTaken ?? history.length ?? 0;
    const averageScore =
      profile?.averageScore ||
      (history.length
        ? Math.round(history.reduce((sum, item) => sum + (item.percentage || 0), 0) / history.length)
        : 0);
    const highestScore =
      profile?.highestScore || (history.length ? Math.max(...history.map((item) => item.percentage || 0)) : 0);
    const totalPoints = history.length
      ? history.reduce((sum, item) => sum + (item.score || 0), 0)
      : testsTaken * 100;

    return { averageScore, highestScore, testsTaken, totalPoints };
  }, [history, profile]);

  return (
    <section className="container-page py-6 sm:py-8">
      <div className="grid gap-6 lg:grid-cols-[17rem_1fr]">
        <DashboardSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

        <div className="min-w-0 space-y-6">
          <div className="flex flex-col gap-4 rounded-lg border border-slate-200 bg-white p-5 shadow-soft dark:border-slate-800 dark:bg-slate-900 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <button
                type="button"
                className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-slate-300 text-slate-700 lg:hidden dark:border-slate-700 dark:text-slate-200"
                onClick={() => setIsSidebarOpen(true)}
                aria-label="Open dashboard menu"
              >
                <FiMenu className="h-5 w-5" aria-hidden="true" />
              </button>
              <div>
                <p className="text-sm font-bold uppercase tracking-wide text-brand-700 dark:text-brand-100">
                  Student Dashboard
                </p>
                <h1 className="mt-1 text-2xl font-bold text-slate-950 dark:text-white">
                  Welcome, {profile?.name || "Student"}
                </h1>
              </div>
            </div>
            <div className="text-sm text-slate-500 dark:text-slate-400">
              Joined {formatDate(profile?.createdAt)}
            </div>
          </div>

          {error && (
            <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700 dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-200">
              {error}
            </div>
          )}

          {isLoading ? (
            <DashboardSkeleton />
          ) : (
            <>
              <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                  <div className="inline-flex h-16 w-16 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-2xl font-bold text-brand-700 dark:bg-brand-900/30 dark:text-brand-100">
                    {(profile?.name || "S").charAt(0).toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <h2 className="text-xl font-bold text-slate-950 dark:text-white">{profile?.name || "Student"}</h2>
                    <div className="mt-3 grid gap-2 text-sm text-slate-600 dark:text-slate-300 sm:grid-cols-2">
                      <p className="truncate">
                        <span className="font-semibold text-slate-800 dark:text-slate-100">Email:</span>{" "}
                        {profile?.email || "N/A"}
                      </p>
                      <p>
                        <span className="font-semibold text-slate-800 dark:text-slate-100">Role:</span>{" "}
                        <span className="capitalize">{profile?.role || "student"}</span>
                      </p>
                      <p>
                        <span className="font-semibold text-slate-800 dark:text-slate-100">Registration:</span>{" "}
                        {formatDate(profile?.createdAt)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
                <StatsCard icon={<FiActivity className="h-5 w-5" />} label="Tests Taken" value={stats.testsTaken} />
                <StatsCard
                  icon={<FiTarget className="h-5 w-5" />}
                  label="Average Score"
                  value={`${stats.averageScore}%`}
                  tone="blue"
                />
                <StatsCard
                  icon={<FiAward className="h-5 w-5" />}
                  label="Highest Score"
                  value={`${stats.highestScore}%`}
                  tone="amber"
                />
                <StatsCard
                  icon={<FiUser className="h-5 w-5" />}
                  label="Total Points"
                  value={stats.totalPoints}
                  tone="brand"
                />
              </div>

              <ReadinessCard data={readiness} isLoading={readinessLoading} error={readinessError} />

              <div className="grid gap-6 xl:grid-cols-[1fr_0.9fr]">
                <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900">
                  <div className="flex items-center justify-between gap-4">
                    <h2 className="text-lg font-bold text-slate-950 dark:text-white">Recent Activity</h2>
                    <span className="text-sm text-slate-500 dark:text-slate-400">{history.length} attempts</span>
                  </div>
                  <div className="mt-5 space-y-3">
                    {history.length ? (
                      history.map((activity) => <ActivityCard key={activity._id} activity={activity} />)
                    ) : (
                      <div className="rounded-md border border-dashed border-slate-300 p-5 text-sm text-slate-500 dark:border-slate-700 dark:text-slate-400">
                        No tests attempted yet
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <h2 className="mb-4 text-lg font-bold text-slate-950 dark:text-white">Quick Actions</h2>
                  <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
                    {quickActions.map((action) => (
                      <QuickActionCard key={action.to} {...action} />
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
