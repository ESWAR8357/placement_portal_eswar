import { FiLoader } from "react-icons/fi";

const Loader = ({ label = "Loading" }) => {
  return (
    <div className="flex min-h-40 items-center justify-center gap-3 text-slate-600 dark:text-slate-300">
      <FiLoader className="h-5 w-5 animate-spin text-brand-600" aria-hidden="true" />
      <span className="text-sm font-medium">{label}</span>
    </div>
  );
};

export default Loader;
