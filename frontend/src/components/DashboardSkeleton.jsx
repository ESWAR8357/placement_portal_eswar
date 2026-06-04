const DashboardSkeleton = () => {
  return (
    <div className="animate-pulse space-y-6">
      <div className="rounded-lg border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
        <div className="h-4 w-32 rounded bg-slate-200 dark:bg-slate-800" />
        <div className="mt-4 h-8 w-72 max-w-full rounded bg-slate-200 dark:bg-slate-800" />
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <div className="h-4 rounded bg-slate-200 dark:bg-slate-800" />
          <div className="h-4 rounded bg-slate-200 dark:bg-slate-800" />
        </div>
      </div>
      <div className="grid gap-5 md:grid-cols-4">
        {[1, 2, 3, 4].map((item) => (
          <div key={item} className="h-32 rounded-lg border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900" />
        ))}
      </div>
      <div className="h-64 rounded-lg border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900" />
    </div>
  );
};

export default DashboardSkeleton;
