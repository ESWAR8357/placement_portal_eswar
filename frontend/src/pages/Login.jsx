import { useState } from "react";
import { FiLogIn } from "react-icons/fi";
import { Link, useLocation, useNavigate } from "react-router-dom";

import useAuth from "../hooks/useAuth.js";
import { getApiErrorMessage, isValidEmail } from "../utils/validators.js";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const redirectTo = location.state?.from?.pathname || "/dashboard";

  const handleChange = (event) => {
    setFormData((current) => ({ ...current, [event.target.name]: event.target.value }));
    setError("");
  };

  const validateForm = () => {
    if (!isValidEmail(formData.email)) {
      return "Enter a valid email address.";
    }

    if (formData.password.length < 6) {
      return "Password must be at least 6 characters.";
    }

    return "";
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationError = validateForm();

    if (validationError) {
      setError(validationError);
      return;
    }

    setIsSubmitting(true);

    try {
      await login(formData);
      navigate(redirectTo, { replace: true });
    } catch (apiError) {
      setError(getApiErrorMessage(apiError, "Login failed. Please try again."));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="container-page flex min-h-[calc(100vh-9rem)] items-center justify-center py-10">
      <div className="w-full max-w-md rounded-lg border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900 sm:p-8">
        <div className="mb-8">
          <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-md bg-brand-50 text-brand-700 dark:bg-brand-900/30 dark:text-brand-100">
            <FiLogIn className="h-5 w-5" aria-hidden="true" />
          </div>
          <h1 className="text-2xl font-bold text-slate-950 dark:text-white">Login</h1>
          <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
            Access your preparation dashboard.
          </p>
        </div>

        {error && (
          <div className="mb-5 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700 dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
              className="form-input mt-2"
              placeholder="student@example.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              value={formData.password}
              onChange={handleChange}
              className="form-input mt-2"
              placeholder="Enter password"
            />
          </div>

          <button type="submit" disabled={isSubmitting} className="btn-primary w-full">
            <FiLogIn className="h-4 w-4" aria-hidden="true" />
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-600 dark:text-slate-300">
          New here?{" "}
          <Link to="/register" className="font-semibold text-brand-700 hover:text-brand-600 dark:text-brand-100">
            Create an account
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Login;
