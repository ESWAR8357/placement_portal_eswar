import { FiAlertCircle, FiArrowUp, FiTrendingDown, FiZap } from "react-icons/fi";

const ReadinessCard = ({ data, isLoading, error }) => {
  if (isLoading) {
    return (
      <div className="animate-pulse rounded-lg border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900">
        <div className="h-5 w-48 rounded bg-slate-200 dark:bg-slate-800" />
        <div className="mt-6 flex items-center gap-4">
          <div className="h-16 w-16 rounded-full bg-slate-200 dark:bg-slate-800" />
          <div className="h-8 w-24 rounded bg-slate-200 dark:bg-slate-800" />
        </div>
        <div className="mt-6 space-y-3">
          <div className="h-4 w-32 rounded bg-slate-200 dark:bg-slate-800" />
          <div className="h-4 w-full rounded bg-slate-200 dark:bg-slate-800" />
          <div className="h-4 w-full rounded bg-slate-200 dark:bg-slate-800" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-6 shadow-soft dark:border-red-900/60 dark:bg-red-950/40">
        <div className="flex items-center gap-2 text-red-700 dark:text-red-300">
          <FiAlertCircle className="h-5 w-5 shrink-0" aria-hidden="true" />
          <p className="text-sm font-medium">{error}</p>
        </div>
      </div>
    );
  }

  if (!data) return null;

  const { readinessScore, strengths, weaknesses, recommendations } = data;

  const scoreColor =
    readinessScore >= 70
      ? "text-emerald-600 dark:text-emerald-400"
      : readinessScore >= 40
        ? "text-amber-600 dark:text-amber-400"
        : "text-red-600 dark:text-red-400";

  const progressColor =
    readinessScore >= 70
      ? "bg-emerald-500"
      : readinessScore >= 40
        ? "bg-amber-500"
        : "bg-red-500";

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-center gap-2">
        <FiZap className="h-5 w-5 text-brand-600 dark:text-brand-400" aria-hidden="true" />
        <h2 className="text-lg font-bold text-slate-950 dark:text-white">Placement Readiness</h2>
      </div>

      <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center">
        <div
          className="inline-flex h-20 w-20 shrink-0 items-center justify-center rounded-full border-4 border-slate-100 dark:border-slate-800"
          aria-label={`Readiness score: ${readinessScore}%`}
        >
          <span className={`text-2xl font-extrabold ${scoreColor}`}>{readinessScore}%</span>
        </div>
        <div className="flex-1">
          <p className="mb-2 text-sm font-medium text-slate-600 dark:text-slate-300">
            Overall Score
          </p>
          <div className="h-3 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
            <div
              className={`h-full rounded-full transition-all duration-700 ${progressColor}`}
              style={{ width: `${readinessScore}%` }}
              role="progressbar"
              aria-valuenow={readinessScore}
              aria-valuemin={0}
              aria-valuemax={100}
            />
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <div>
          <div className="mb-2 flex items-center gap-1.5 text-sm font-semibold text-emerald-700 dark:text-emerald-400">
            <FiArrowUp className="h-4 w-4" aria-hidden="true" />
            Strengths
          </div>
          {strengths.length ? (
            <ul className="space-y-1.5">
              {strengths.map((s) => (
                <li
                  key={s}
                  className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300"
                >
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
                  {s}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-slate-400 dark:text-slate-500">
              Complete more tests to identify strengths
            </p>
          )}
        </div>

        <div>
          <div className="mb-2 flex items-center gap-1.5 text-sm font-semibold text-amber-700 dark:text-amber-400">
            <FiTrendingDown className="h-4 w-4" aria-hidden="true" />
            Needs Improvement
          </div>
          {weaknesses.length ? (
            <ul className="space-y-1.5">
              {weaknesses.map((w) => (
                <li
                  key={w}
                  className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300"
                >
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
                  {w}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-slate-400 dark:text-slate-500">
              No weak areas detected yet
            </p>
          )}
        </div>
      </div>

      {recommendations.length > 0 && (
        <div className="mt-5 rounded-md border border-brand-100 bg-brand-50 p-4 dark:border-brand-900/40 dark:bg-brand-900/20">
          <p className="mb-2 text-sm font-semibold text-brand-700 dark:text-brand-300">
            Recommendations
          </p>
          <ul className="space-y-1.5">
            {recommendations.map((rec) => (
              <li key={rec} className="flex items-start gap-2 text-sm text-brand-800 dark:text-brand-200">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
                {rec}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ReadinessCard;
