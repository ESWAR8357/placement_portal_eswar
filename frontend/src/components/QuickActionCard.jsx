import { FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";

const QuickActionCard = ({ description, icon, title, to }) => {
  return (
    <Link
      to={to}
      className="group rounded-lg border border-slate-200 bg-white p-5 shadow-soft transition hover:-translate-y-0.5 hover:border-brand-200 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-brand-900"
    >
      <div className="flex items-start justify-between gap-4">
        <span className="inline-flex h-11 w-11 items-center justify-center rounded-md bg-brand-50 text-brand-700 dark:bg-brand-900/30 dark:text-brand-100">
          {icon}
        </span>
        <FiArrowRight className="h-4 w-4 text-slate-400 transition group-hover:translate-x-1 group-hover:text-brand-700" />
      </div>
      <h3 className="mt-5 text-base font-bold text-slate-950 dark:text-white">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{description}</p>
    </Link>
  );
};

export default QuickActionCard;
