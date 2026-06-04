import { FiClock } from "react-icons/fi";
import { Link } from "react-router-dom";

const ModulePlaceholder = ({ title }) => {
  return (
    <section className="container-page py-10">
      <div className="rounded-lg border border-slate-200 bg-white p-8 text-center shadow-soft dark:border-slate-800 dark:bg-slate-900">
        <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-md bg-brand-50 text-brand-700 dark:bg-brand-900/30 dark:text-brand-100">
          <FiClock className="h-5 w-5" aria-hidden="true" />
        </div>
        <h1 className="mt-5 text-2xl font-bold text-slate-950 dark:text-white">{title}</h1>
        <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-600 dark:text-slate-300">
          This module will be implemented in the upcoming phases. The route is protected and ready for integration.
        </p>
        <Link to="/dashboard" className="btn-primary mt-6">
          Back to Dashboard
        </Link>
      </div>
    </section>
  );
};

export default ModulePlaceholder;
