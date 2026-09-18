import { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FiArrowLeft, FiRefreshCcw } from "react-icons/fi";

const CodingAssessmentResult = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const result = location?.state?.result;

  const derived = useMemo(() => {
    if (!result) return null;
    return {
      totalQuestions: result.totalQuestions ?? 0,
      solvedCount: result.solvedCount ?? 0,
      attemptedCount: result.attemptedCount ?? 0,
      notAttemptedCount: result.notAttemptedCount ?? (result.totalQuestions ?? 0) - (result.solvedCount ?? 0) - (result.attemptedCount ?? 0),
      score: result.score ?? 0,
      percentage: result.percentage ?? 0,
      reviewData: result.reviewData || []
    };
  }, [result]);

  if (!derived) {
    return (
      <section className="container-page py-6 sm:py-8">
        <div className="mx-auto max-w-3xl rounded-lg border border-slate-200 bg-white p-6 text-center shadow-soft dark:border-slate-800 dark:bg-slate-900">
          <h1 className="text-xl font-bold text-slate-950 dark:text-white">No result to display</h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            Submit a coding assessment to see your summary here.
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <button type="button" className="btn-primary" onClick={() => navigate("/coding-assessment")}>
              Start Coding Assessment
            </button>
            <button type="button" className="btn-secondary" onClick={() => navigate("/dashboard")}>
              Back to Dashboard
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="container-page py-6 sm:py-8">
      <div className="mx-auto max-w-3xl space-y-6">
        <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900">
          <h1 className="text-2xl font-bold text-slate-950 dark:text-white">Coding Assessment Result</h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">Overall score (no code execution): {derived.score}</p>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg bg-slate-50 p-4 text-sm dark:bg-slate-950">
              <p className="text-slate-500">Total Questions</p>
              <p className="mt-1 text-xl font-bold text-slate-900 dark:text-white">{derived.totalQuestions}</p>
            </div>
            <div className="rounded-lg bg-slate-50 p-4 text-sm dark:bg-slate-950">
              <p className="text-slate-500">Percentage</p>
              <p className="mt-1 text-xl font-bold text-slate-900 dark:text-white">{derived.percentage}%</p>
            </div>
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-sm dark:border-emerald-900/50 dark:bg-emerald-900/20">
              <p className="font-semibold text-emerald-800 dark:text-emerald-200">Solved</p>
              <p className="mt-1 text-2xl font-bold text-emerald-900 dark:text-emerald-200">{derived.solvedCount}</p>
            </div>
            <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm dark:border-amber-900/50 dark:bg-amber-900/20">
              <p className="font-semibold text-amber-800 dark:text-amber-200">Attempted</p>
              <p className="mt-1 text-2xl font-bold text-amber-900 dark:text-amber-200">{derived.attemptedCount}</p>
            </div>
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm dark:border-slate-800 dark:bg-slate-950">
              <p className="font-semibold text-slate-800 dark:text-slate-200">Not Attempted</p>
              <p className="mt-1 text-2xl font-bold text-slate-900 dark:text-slate-200">{derived.notAttemptedCount}</p>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="button"
              className="btn-secondary inline-flex items-center gap-2"
              onClick={() => navigate("/dashboard")}
            >
              <FiArrowLeft className="h-4 w-4" aria-hidden="true" />
              Back to Dashboard
            </button>

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                className="btn-primary"
                onClick={() =>
                  navigate("/coding-assessment/review", {
                    state: { reviewData: derived.reviewData, result: derived }
                  })
                }
              >
                Review Answers
              </button>

              <button
                type="button"
                className="btn-secondary inline-flex items-center gap-2"
                onClick={() => navigate("/coding-assessment")}
              >
                <FiRefreshCcw className="h-4 w-4" aria-hidden="true" />
                Retake
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CodingAssessmentResult;

