import { FiHome } from "react-icons/fi";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <section className="container-page flex min-h-[calc(100vh-9rem)] items-center justify-center py-10 text-center">
      <div className="max-w-lg">
        <p className="text-sm font-bold uppercase tracking-wide text-brand-700 dark:text-brand-100">404</p>
        <h1 className="mt-3 text-4xl font-bold text-slate-950 dark:text-white">Page not found</h1>
        <p className="mt-4 text-slate-600 dark:text-slate-300">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link to="/" className="btn-primary mt-8">
          <FiHome className="h-4 w-4" aria-hidden="true" />
          Back Home
        </Link>
      </div>
    </section>
  );
};

export default NotFound;
