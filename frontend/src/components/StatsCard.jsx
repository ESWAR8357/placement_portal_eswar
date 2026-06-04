const StatsCard = ({ icon, label, value, tone = "brand" }) => {
  const tones = {
    brand: "bg-brand-50 text-brand-700 dark:bg-brand-900/30 dark:text-brand-100",
    blue: "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-100",
    amber: "bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-100"
  };

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-soft dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{label}</p>
          <p className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">{value}</p>
        </div>
        <div className={`inline-flex h-12 w-12 items-center justify-center rounded-md ${tones[tone]}`}>
          {icon}
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
