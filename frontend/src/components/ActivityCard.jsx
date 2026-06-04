import { FiCalendar, FiCheckCircle } from "react-icons/fi";

import { formatDate } from "../utils/formatters.js";

const ActivityCard = ({ activity }) => {
  return (
    <div className="flex items-center justify-between gap-4 rounded-md border border-slate-200 bg-white p-4 transition hover:border-brand-200 hover:shadow-soft dark:border-slate-800 dark:bg-slate-900 dark:hover:border-brand-900">
      <div className="flex min-w-0 items-center gap-3">
        <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-brand-50 text-brand-700 dark:bg-brand-900/30 dark:text-brand-100">
          <FiCheckCircle className="h-4 w-4" aria-hidden="true" />
        </span>
        <div className="min-w-0">
          <h3 className="truncate text-sm font-bold text-slate-950 dark:text-white">
            {activity.testName || "Practice Test"}
          </h3>
          <p className="mt-1 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <FiCalendar className="h-3.5 w-3.5" aria-hidden="true" />
            {formatDate(activity.date || activity.createdAt)}
          </p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-lg font-bold text-slate-950 dark:text-white">{activity.percentage ?? activity.score ?? 0}%</p>
        <p className="text-xs text-slate-500 dark:text-slate-400">Score</p>
      </div>
    </div>
  );
};

export default ActivityCard;
