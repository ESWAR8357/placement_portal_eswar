import { useEffect, useState } from "react";
import { FiMenu, FiSave, FiUser } from "react-icons/fi";

import DashboardSidebar from "../components/DashboardSidebar.jsx";
import Loader from "../components/Loader.jsx";
import useAuth from "../hooks/useAuth.js";
import { getProfile, updateProfile } from "../services/dashboardService.js";
import { formatDate } from "../utils/formatters.js";
import { getApiErrorMessage, isValidEmail } from "../utils/validators.js";

const Profile = () => {
  const { updateUser } = useAuth();
  const [profile, setProfile] = useState(null);
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await getProfile();
        setProfile(data.user);
        setFormData({ name: data.user.name || "", email: data.user.email || "" });
        updateUser(data.user);
      } catch (apiError) {
        setError(getApiErrorMessage(apiError, "Unable to load profile."));
      } finally {
        setIsLoading(false);
      }
    };

    loadProfile();
  }, [updateUser]);

  const handleChange = (event) => {
    setFormData((current) => ({ ...current, [event.target.name]: event.target.value }));
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.name.trim()) {
      setError("Name is required.");
      return;
    }

    if (!isValidEmail(formData.email)) {
      setError("Enter a valid email address.");
      return;
    }

    setIsSubmitting(true);

    try {
      const data = await updateProfile({
        name: formData.name.trim(),
        email: formData.email.trim()
      });
      setProfile(data.user);
      updateUser(data.user);
      setSuccess("Profile updated successfully.");
    } catch (apiError) {
      setError(getApiErrorMessage(apiError, "Unable to update profile."));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="container-page py-6 sm:py-8">
      <div className="grid gap-6 lg:grid-cols-[17rem_1fr]">
        <DashboardSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

        <div className="min-w-0">
          <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center gap-3">
              <button
                type="button"
                className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-slate-300 text-slate-700 lg:hidden dark:border-slate-700 dark:text-slate-200"
                onClick={() => setIsSidebarOpen(true)}
                aria-label="Open dashboard menu"
              >
                <FiMenu className="h-5 w-5" aria-hidden="true" />
              </button>
              <div>
                <p className="text-sm font-bold uppercase tracking-wide text-brand-700 dark:text-brand-100">Profile</p>
                <h1 className="mt-2 text-2xl font-bold text-slate-950 dark:text-white">Manage Profile</h1>
              </div>
            </div>
          </div>

          {isLoading ? (
            <Loader label="Loading profile" />
          ) : (
            <div className="mt-6 grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
              <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900">
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-lg bg-brand-50 text-2xl font-bold text-brand-700 dark:bg-brand-900/30 dark:text-brand-100">
                  {(profile?.name || "S").charAt(0).toUpperCase()}
                </div>
                <h2 className="mt-5 text-xl font-bold text-slate-950 dark:text-white">{profile?.name}</h2>
                <div className="mt-4 space-y-3 text-sm text-slate-600 dark:text-slate-300">
                  <p>
                    <span className="font-semibold text-slate-800 dark:text-slate-100">Email:</span> {profile?.email}
                  </p>
                  <p>
                    <span className="font-semibold text-slate-800 dark:text-slate-100">Role:</span>{" "}
                    <span className="capitalize">{profile?.role}</span>
                  </p>
                  <p>
                    <span className="font-semibold text-slate-800 dark:text-slate-100">Joined:</span>{" "}
                    {formatDate(profile?.createdAt)}
                  </p>
                </div>
              </div>

              <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900">
                <div className="mb-6 flex items-center gap-3">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-md bg-brand-50 text-brand-700 dark:bg-brand-900/30 dark:text-brand-100">
                    <FiUser className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <h2 className="text-lg font-bold text-slate-950 dark:text-white">Edit Profile</h2>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Update your display name and email.</p>
                  </div>
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
                      value={formData.name}
                      onChange={handleChange}
                      className="form-input mt-2"
                      placeholder="Your name"
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
                      value={formData.email}
                      onChange={handleChange}
                      className="form-input mt-2"
                      placeholder="student@example.com"
                    />
                  </div>

                  <button type="submit" disabled={isSubmitting} className="btn-primary">
                    <FiSave className="h-4 w-4" aria-hidden="true" />
                    {isSubmitting ? "Updating..." : "Update Profile"}
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Profile;
