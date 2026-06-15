import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FiArrowRight, FiClock } from "react-icons/fi";

import useAuth from "../hooks/useAuth.js";
import ReviewAnswersPanel from "../components/ReviewAnswersPanel.jsx";
import { formatDate } from "../utils/formatters.js";

const performanceMessage = (percentage) => {
  if (percentage >= 90) return "Excellent";
  if (percentage >= 75) return "Very Good";
  if (percentage >= 60) return "Good";
  return "Needs Improvement";
};

const TechnicalResult = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { updateUser } = useAuth();
  const state = location.state || {};
  const { result, user, autoSubmitted } = state;

  const persistedReviewRaw = (() => {
    try {
      return sessionStorage.getItem("placementPortalLastTechnicalReview");
    } catch {
      return null;
    }
  })();

  const persistedReview = persistedReviewRaw ? JSON.parse(persistedReviewRaw) : null;

  const resolvedResult = result
    ? result
    : persistedReview
      ? {
          ...persistedReview
        }
      : null;

  const [showReview, setShowReview] = useState(false);

  useEffect(() => {
    if (user) {
      updateUser(user);
    }
  }, [user, updateUser]);

  const formatDuration = (seconds) => {
    if (seconds == null || Number.isNaN(Number(seconds))) {
      return "Not available";
    }

    const minutes = Math.floor(seconds / 60);
    const remainder = seconds % 60;
    return `${minutes}m ${remainder.toString().padStart(2, "0")}s`;
  };

  if (!resolvedResult) {

    return (
      <section className="container-page py-10">
        <div className="rounded-lg border border-slate-200 bg-white p-8 text-center shadow-soft dark:border-slate-800 dark:bg-slate-900">
          <h1 className="text-2xl font-bold text-slate-950 dark:text-white">Technical Test Result</h1>
          <p className="mt-3 text-slate-600 dark:text-slate-300">No active result was found. Please return to the dashboard and start a new test.</p>
          <div className="mt-6 flex justify-center gap-3">
            <button type="button" onClick={() => navigate('/technical-tests')} className="btn-secondary">Back to Subjects</button>
            <button type="button" onClick={() => navigate('/dashboard')} className="btn-primary">Back to Dashboard</button>
          </div>
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
              <h1 className="mt-3 text-3xl font-bold text-slate-950 dark:text-white">{resolvedResult.testName}</h1>

              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">Subject: {resolvedResult.subject || resolvedResult.testName}</p>

            </div>
            <div className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-4 py-2 text-sm font-semibold text-brand-700 dark:bg-brand-900/30 dark:text-brand-100">
              <FiClock className="h-4 w-4" aria-hidden="true" />
              {autoSubmitted ? "Auto-submitted when timer ended" : "Submitted successfully"}
            </div>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-950">
              <p className="text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Score</p>
              <p className="mt-3 text-4xl font-bold text-slate-950 dark:text-white">{resolvedResult.score}</p>

              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Correct answers</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-950">
              <p className="text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Percentage</p>
              <p className="mt-3 text-4xl font-bold text-brand-700 dark:text-brand-100">{resolvedResult.percentage}%</p>

              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Total questions: {resolvedResult.totalQuestions}</p>

            </div>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
              <p className="text-sm text-slate-500 dark:text-slate-400">Correct</p>
              <p className="mt-2 text-xl font-semibold text-slate-950 dark:text-white">{result.score}</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
              <p className="text-sm text-slate-500 dark:text-slate-400">Wrong Answers</p>
              <p className="mt-2 text-xl font-semibold text-slate-950 dark:text-white">{resolvedResult.incorrectCount}</p>

            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
              <p className="text-sm text-slate-500 dark:text-slate-400">Time Taken</p>
              <p className="mt-2 text-xl font-semibold text-slate-950 dark:text-white">{formatDuration(resolvedResult.timeTaken)}</p>

            </div>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="button"
              onClick={() => setShowReview((prev) => !prev)}
              className="btn-secondary inline-flex items-center justify-center gap-2"
            >
              {showReview ? "Hide Review" : "Review Answers"}
            </button>
            <button
              type="button"
              onClick={() => navigate('/dashboard')}
              className="btn-primary inline-flex items-center justify-center gap-2"
            >
              <FiArrowRight className="h-4 w-4" aria-hidden="true" />
              Dashboard
            </button>
          </div>

          {showReview && (
            <div className="mt-6 rounded-3xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-900">
              <h2 className="text-lg font-semibold text-slate-950 dark:text-white">Review Answers</h2>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">Check each question, your selection, and the correct answer.</p>
              <div className="mt-6">
                <ReviewAnswersPanel answers={resolvedResult.reviewAnswers || []} />

              </div>
            </div>
          )}

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            <button
              type="button"
              onClick={() => navigate(`/technical-tests/${result.subject || ''}`)}
              className="btn-secondary inline-flex items-center justify-center gap-2"
            >
              Retake Test
            </button>
            <button
              type="button"
              onClick={() => navigate('/technical-tests')}
              className="btn-secondary inline-flex items-center justify-center gap-2"
            >
              Back to Subjects
            </button>
            <button
              type="button"
              onClick={() => navigate('/dashboard')}
              className="btn-primary inline-flex items-center justify-center gap-2"
            >
              <FiArrowRight className="h-4 w-4" aria-hidden="true" />
              Dashboard
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechnicalResult;