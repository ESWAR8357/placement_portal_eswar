import { useState } from "react";
import { FiBookOpen, FiLogIn, FiLogOut, FiMenu, FiMoon, FiSun, FiUserPlus, FiX } from "react-icons/fi";
import { NavLink, useNavigate } from "react-router-dom";

import useAuth from "../hooks/useAuth.js";

const navLinkClass = ({ isActive }) =>
  `rounded-md px-3 py-2 text-sm font-semibold transition ${
    isActive
      ? "bg-brand-50 text-brand-700 dark:bg-brand-900/30 dark:text-brand-100"
      : "text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
  }`;

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
    navigate("/");
  };

  const toggleTheme = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);
    document.documentElement.classList.toggle("dark", nextDark);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur dark:border-slate-800 dark:bg-slate-950/95">
      <nav className="container-page flex min-h-16 items-center justify-between gap-4">
        <NavLink to="/" className="flex items-center gap-3" onClick={() => setIsMenuOpen(false)}>
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-brand-600 text-white">
            <FiBookOpen className="h-5 w-5" aria-hidden="true" />
          </span>
          <span className="text-base font-bold text-slate-900 dark:text-white">Placement Portal</span>
        </NavLink>

        <div className="hidden items-center gap-2 md:flex">
          <NavLink to="/" className={navLinkClass}>
            Home
          </NavLink>
          {isAuthenticated && (
            <NavLink to="/dashboard" className={navLinkClass}>
              Dashboard
            </NavLink>
          )}
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <button
            type="button"
            onClick={toggleTheme}
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-slate-300 text-slate-700 transition hover:border-brand-500 hover:text-brand-700 dark:border-slate-700 dark:text-slate-200"
            aria-label="Toggle dark mode"
            title="Toggle dark mode"
          >
            {isDark ? <FiSun className="h-4 w-4" /> : <FiMoon className="h-4 w-4" />}
          </button>

          {isAuthenticated ? (
            <button type="button" onClick={handleLogout} className="btn-secondary">
              <FiLogOut className="h-4 w-4" aria-hidden="true" />
              Logout
            </button>
          ) : (
            <>
              <NavLink to="/login" className="btn-secondary">
                <FiLogIn className="h-4 w-4" aria-hidden="true" />
                Login
              </NavLink>
              <NavLink to="/register" className="btn-primary">
                <FiUserPlus className="h-4 w-4" aria-hidden="true" />
                Register
              </NavLink>
            </>
          )}
        </div>

        <button
          type="button"
          onClick={() => setIsMenuOpen((value) => !value)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-slate-300 text-slate-700 md:hidden dark:border-slate-700 dark:text-slate-200"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <FiX className="h-5 w-5" /> : <FiMenu className="h-5 w-5" />}
        </button>
      </nav>

      {isMenuOpen && (
        <div className="border-t border-slate-200 bg-white md:hidden dark:border-slate-800 dark:bg-slate-950">
          <div className="container-page flex flex-col gap-2 py-4">
            <NavLink to="/" className={navLinkClass} onClick={() => setIsMenuOpen(false)}>
              Home
            </NavLink>
            {isAuthenticated && (
              <NavLink to="/dashboard" className={navLinkClass} onClick={() => setIsMenuOpen(false)}>
                Dashboard
              </NavLink>
            )}
            <button type="button" onClick={toggleTheme} className="btn-secondary justify-start">
              {isDark ? <FiSun className="h-4 w-4" /> : <FiMoon className="h-4 w-4" />}
              Dark Mode
            </button>
            {isAuthenticated ? (
              <button type="button" onClick={handleLogout} className="btn-secondary justify-start">
                <FiLogOut className="h-4 w-4" />
                Logout
              </button>
            ) : (
              <>
                <NavLink to="/login" className="btn-secondary justify-start" onClick={() => setIsMenuOpen(false)}>
                  <FiLogIn className="h-4 w-4" />
                  Login
                </NavLink>
                <NavLink to="/register" className="btn-primary justify-start" onClick={() => setIsMenuOpen(false)}>
                  <FiUserPlus className="h-4 w-4" />
                  Register
                </NavLink>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
