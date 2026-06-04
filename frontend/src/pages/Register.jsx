import { useState } from "react";
import { FiUserPlus } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";

import { registerUser } from "../services/authService.js";
import { getApiErrorMessage, isValidEmail } from "../utils/validators.js";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (event) => {
    setFormData((current) => ({ ...current, [event.target.name]: event.target.value }));
    setError("");
  };

  const validateForm = () => {
    if (formData.name.trim().length < 2) {
      return "Name must be at least 2 characters.";
    }

    if (!isValidEmail(formData.email)) {
      return "Enter a valid email address.";
    }

    if (formData.password.length < 6) {
      return "Password must be at least 6 characters.";
    }

    if (formData.password !== formData.confirmPassword) {
      return "Passwords do not match.";
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
      await registerUser({
        name: formData.name.trim(),
        email: formData.email.trim(),
        password: formData.password
      });
      setSuccess("Account created successfully. Redirecting to login...");
      setTimeout(() => navigate("/login"), 900);
    } catch (apiError) {
      setError(getApiErrorMessage(apiError, "Registration failed. Please try again."));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="container-page flex min-h-[calc(100vh-9rem)] items-center justify-center py-10">
      <div className="w-full max-w-lg rounded-lg border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900 sm:p-8">
        <div className="mb-8">
          <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-md bg-brand-50 text-brand-700 dark:bg-brand-900/30 dark:text-brand-100">
            <FiUserPlus className="h-5 w-5" aria-hidden="true" />
          </div>
          <h1 className="text-2xl font-bold text-slate-950 dark:text-white">Create Account</h1>
          <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
            Register as a student and begin tracking your preparation.
          </p>
        </div>

        {error && (
          <div className="mb-5 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700 dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-200">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-5 rounded-md border border-brand-100 bg-brand-50 px-4 py-3 text-sm font-medium text-brand-700 dark:border-brand-900/60 dark:bg-brand-950/40 dark:text-brand-100">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              value={formData.name}
              onChange={handleChange}
              className="form-input mt-2"
              placeholder="Your full name"
            />
          </div>

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

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                value={formData.password}
                onChange={handleChange}
                className="form-input mt-2"
                placeholder="Min 6 characters"
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="form-label">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="form-input mt-2"
                placeholder="Repeat password"
              />
            </div>
          </div>

          <button type="submit" disabled={isSubmitting} className="btn-primary w-full">
            <FiUserPlus className="h-4 w-4" aria-hidden="true" />
            {isSubmitting ? "Creating account..." : "Register"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-600 dark:text-slate-300">
          Already registered?{" "}
          <Link to="/login" className="font-semibold text-brand-700 hover:text-brand-600 dark:text-brand-100">
            Login
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Register;
