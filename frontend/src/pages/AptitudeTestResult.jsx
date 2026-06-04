import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FiAward, FiArrowRight, FiCheckCircle, FiClock } from "react-icons/fi";

import useAuth from "../hooks/useAuth.js";
import { formatDate } from "../utils/formatters.js";

const AptitudeTestResult = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { updateUser } = useAuth();
  const state = location.state || {};
  const { result, user, autoSubmitted } = state;

  useEffect(() => {
    if (user) {
      updateUser(user);
    }
  }, [user, updateUser]);

  if (!result) {
    return (
      <section className="container-page py-10">
        <div className="rounded-lg border border-slate-200 bg-white p-8 text-center shadow-soft dark:border-slate-800 dark:bg-slate-900">
          <h1 className="text-2xl font-bold text-slate-950 dark:text-white">Aptitude Test Result</h1>
          <p className="mt-3 text-slate-600 dark:text-slate-300">
            No active result was found. Please return to the dashboard and start a new test.
          </p>
          <button
            type="button"
            onClick={() => navigate("/dashboard")}
            className="btn-primary mt-6"
          >
            Back to Dashboard
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="container-page py-10">
      <div className="mx-auto max-w-3xl space-y-6">
        <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-soft dark:border-slate-800 dark:bg-slate-900">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-brand-700 dark:text-brand-100">Result Summary</p>
              <h1 className="mt-3 text-3xl font-bold text-slate-950 dark:text-white">{result.testName}</h1>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-4 py-2 text-sm font-semibold text-brand-700 dark:bg-brand-900/30 dark:text-brand-100">
              <FiClock className="h-4 w-4" aria-hidden="true" />
              {autoSubmitted ? "Auto-submitted when timer ended" : "Submitted successfully"}
            </div>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-950">
              <p className="text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Score</p>
              <p className="mt-3 text-4xl font-bold text-slate-950 dark:text-white">{result.score}</p>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Correct answers</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-950">
              <p className="text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Percentage</p>
              <p className="mt-3 text-4xl font-bold text-brand-700 dark:text-brand-100">{result.percentage}%</p>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Total questions: {result.totalQuestions}</p>
            </div>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
              <p className="text-sm text-slate-500 dark:text-slate-400">Answered</p>
              <p className="mt-2 text-xl font-semibold text-slate-950 dark:text-white">{result.answeredCount}</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
              <p className="text-sm text-slate-500 dark:text-slate-400">Incorrect</p>
              <p className="mt-2 text-xl font-semibold text-slate-950 dark:text-white">{result.incorrectCount}</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
              <p className="text-sm text-slate-500 dark:text-slate-400">Taken on</p>
              <p className="mt-2 text-xl font-semibold text-slate-950 dark:text-white">{formatDate(result.date)}</p>
            </div>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => navigate("/dashboard")}
              className="btn-primary inline-flex items-center justify-center gap-2"
            >
              <FiArrowRight className="h-4 w-4" aria-hidden="true" />
              Back to Dashboard
            </button>
            <div className="rounded-2xl border border-brand-200 bg-brand-50 p-5 text-sm text-brand-700 dark:border-brand-900/30 dark:bg-brand-900/30 dark:text-brand-100">
              <p className="font-semibold">Updated Profile Statistics</p>
              <p className="mt-2">Your dashboard now reflects the latest average and highest score.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AptitudeTestResult;
