const ReviewAnswersPanel = ({ answers = [] }) => {
  if (!answers.length) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 text-sm text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
        No review data is available for this attempt.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {answers.map((item, index) => {
        const isCorrect = item.status === "correct";
        return (
          <div
            key={item.id || index}
            className={`rounded-3xl border p-5 shadow-soft transition ${
              isCorrect
                ? "border-emerald-200 bg-emerald-50 text-emerald-900 dark:border-emerald-900/40 dark:bg-emerald-950/30 dark:text-emerald-100"
                : "border-rose-200 bg-rose-50 text-rose-900 dark:border-rose-900/40 dark:bg-rose-950/30 dark:text-rose-100"
            }`}
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0">
                <p className="text-sm font-semibold uppercase tracking-wide text-slate-700 dark:text-slate-200">Question {index + 1}</p>
                <p className="mt-2 text-sm leading-6 text-slate-700 dark:text-slate-200">{item.questionText}</p>
              </div>
              <span className={`rounded-full px-3 py-1 text-xs font-semibold uppercase ${isCorrect ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-800 dark:text-emerald-200" : "bg-rose-100 text-rose-700 dark:bg-rose-800 dark:text-rose-200"}`}>
                {isCorrect ? "Correct" : "Incorrect"}
              </span>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-current/10 bg-white p-4 text-sm dark:bg-slate-950">
                <p className="text-xs uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">Your Answer</p>
                <p className="mt-2 text-sm font-medium text-slate-900 dark:text-slate-100">
                  {item.selectedAnswer || "Unanswered"}
                </p>
              </div>
              <div className="rounded-2xl border border-current/10 bg-white p-4 text-sm dark:bg-slate-950">
                <p className="text-xs uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">Correct Answer</p>
                <p className="mt-2 text-sm font-medium text-slate-900 dark:text-slate-100">{item.correctAnswer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ReviewAnswersPanel;
