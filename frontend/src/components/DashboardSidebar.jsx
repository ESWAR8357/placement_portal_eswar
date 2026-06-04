import {
  FiBarChart2,
  FiBookOpen,
  FiCode,
  FiCpu,
  FiFileText,
  FiGrid,
  FiLogOut,
  FiUser,
  FiX
} from "react-icons/fi";
import { NavLink, useNavigate } from "react-router-dom";

import useAuth from "../hooks/useAuth.js";

const links = [
  { label: "Dashboard", path: "/dashboard", icon: FiGrid },
  { label: "Aptitude Tests", path: "/aptitude-tests", icon: FiBarChart2 },
  { label: "Technical Tests", path: "/technical-tests", icon: FiCpu },
  { label: "Coding Questions", path: "/coding-questions", icon: FiCode },
  { label: "Interview Questions", path: "/interview-questions", icon: FiFileText },
  { label: "Profile", path: "/profile", icon: FiUser }
];

const linkClass = ({ isActive }) =>
  `flex min-h-11 items-center gap-3 rounded-md px-3 text-sm font-semibold transition ${
    isActive
      ? "bg-brand-50 text-brand-700 dark:bg-brand-900/30 dark:text-brand-100"
      : "text-slate-600 hover:bg-slate-100 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
  }`;

const DashboardSidebar = ({ isOpen = false, onClose }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    onClose?.();
    navigate("/");
  };

  return (
    <>
      {isOpen && (
        <button
          type="button"
          aria-label="Close sidebar"
          className="fixed inset-0 z-40 bg-slate-950/40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 border-r border-slate-200 bg-white p-5 shadow-soft transition-transform dark:border-slate-800 dark:bg-slate-950 lg:static lg:z-auto lg:block lg:w-full lg:translate-x-0 lg:rounded-lg lg:border lg:shadow-soft ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between gap-3 lg:hidden">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-brand-600 text-white">
              <FiBookOpen className="h-5 w-5" aria-hidden="true" />
            </span>
            <span className="font-bold text-slate-950 dark:text-white">Student Panel</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-slate-300 text-slate-700 dark:border-slate-700 dark:text-slate-200"
            aria-label="Close menu"
          >
            <FiX className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <div className="hidden lg:block">
          <p className="text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">Workspace</p>
        </div>

        <nav className="mt-5 flex flex-col gap-2">
          {links.map(({ label, path, icon: Icon }) => (
            <NavLink key={path} to={path} className={linkClass} onClick={onClose}>
              <Icon className="h-4 w-4" aria-hidden="true" />
              {label}
            </NavLink>
          ))}
        </nav>

        <button type="button" onClick={handleLogout} className="btn-secondary mt-6 w-full justify-start">
          <FiLogOut className="h-4 w-4" aria-hidden="true" />
          Logout
        </button>
      </aside>
    </>
  );
};

export default DashboardSidebar;
