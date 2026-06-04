import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiBook, FiMenu } from "react-icons/fi";

import DashboardSidebar from "../components/DashboardSidebar.jsx";
import Loader from "../components/Loader.jsx";
import { getTechnicalSubjects } from "../services/technicalService.js";
import { getApiErrorMessage } from "../utils/validators.js";

const subjectIcons = {
  java: <FiBook className="h-6 w-6" aria-hidden="true" />,
  react: <FiBook className="h-6 w-6" aria-hidden="true" />,
  javascript: <FiBook className="h-6 w-6" aria-hidden="true" />,
  dbms: <FiBook className="h-6 w-6" aria-hidden="true" />,
  "operating-systems": <FiBook className="h-6 w-6" aria-hidden="true" />,
  "computer-networks": <FiBook className="h-6 w-6" aria-hidden="true" />
};

const TechnicalSubjects = () => {
  const [subjects, setSubjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loadSubjects = async () => {
      try {
        const response = await getTechnicalSubjects();
        setSubjects(response.subjects || []);
      } catch (apiError) {
        setError(getApiErrorMessage(apiError, "Unable to load technical subjects."));
      } finally {
        setIsLoading(false);
      }
    };

    loadSubjects();
  }, []);

  const handleSubjectClick = (subjectId) => {
    navigate(`/technical-tests/${subjectId}`);
  };

  return (
    <section className="container-page py-6 sm:py-8">
      <div className="grid gap-6 lg:grid-cols-[17rem_1fr]">
        <DashboardSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

        <div className="min-w-0 space-y-6">
          {/* Header */}
          <div className="flex flex-col gap-4 rounded-lg border border-slate-200 bg-white p-5 shadow-soft dark:border-slate-800 dark:bg-slate-900 sm:flex-row sm:items-center sm:justify-between">
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
                <p className="text-sm font-bold uppercase tracking-wide text-brand-700 dark:text-brand-100">
                  Technical MCQ Module
                </p>
                <h1 className="mt-1 text-2xl font-bold text-slate-950 dark:text-white">Select a Subject</h1>
              </div>
            </div>
          </div>

          {/* Error State */}
          {error && (
            <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700 dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-200">
              {error}
            </div>
          )}

          {/* Loading State */}
          {isLoading ? (
            <Loader label="Loading subjects..." />
          ) : subjects.length > 0 ? (
            /* Subjects Grid */
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {subjects.map((subject) => (
                <button
                  key={subject.id}
                  onClick={() => handleSubjectClick(subject.id)}
                  className="group rounded-lg border border-slate-200 bg-white p-6 shadow-soft transition hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-brand-900"
                >
                  <div className="flex items-start justify-between gap-4">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-md bg-brand-50 text-brand-700 dark:bg-brand-900/30 dark:text-brand-100">
                      {subjectIcons[subject.id] || subjectIcons.java}
                    </span>
                  </div>
                  <h3 className="mt-4 text-left text-lg font-bold text-slate-950 dark:text-white">
                    {subject.name}
                  </h3>
                  <div className="mt-3 space-y-1 text-left">
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      <span className="font-semibold text-slate-800 dark:text-slate-200">{subject.count}</span> Questions
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-500">
                      Click to start test
                    </p>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-12 text-center dark:border-slate-800 dark:bg-slate-800">
              <p className="text-slate-600 dark:text-slate-400">
                No subjects available at this time.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default TechnicalSubjects;
