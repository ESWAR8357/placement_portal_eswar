import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiChevronLeft, FiChevronRight, FiSearch } from "react-icons/fi";

import DashboardSidebar from "../components/DashboardSidebar.jsx";
import Loader from "../components/Loader.jsx";
import { fetchCodingQuestions } from "../services/codingQuestionService.js";
import { getApiErrorMessage } from "../utils/validators.js";

const topics = ["arrays", "strings", "linked-lists", "trees", "dynamic-programming"];
const difficulties = ["easy", "medium", "hard"];

const CodingQuestions = () => {
  const [questions, setQuestions] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);
  const [topic, setTopic] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      setIsLoading(true);
      setError("");

      try {
        const response = await fetchCodingQuestions({ page, limit, topic, difficulty });
        setQuestions(response.questions || []);
        setTotal(response.total || 0);
      } catch (apiError) {
        setError(getApiErrorMessage(apiError, "Unable to load coding questions."));
      } finally {
        setIsLoading(false);
      }
    };

    load();
  }, [page, limit, topic, difficulty]);

  const totalPages = useMemo(() => Math.max(1, Math.ceil(total / limit)), [total, limit]);

  const handleCardClick = (id) => {
    navigate(`/coding-questions/${id}`);
  };

  const handlePrev = () => setPage((p) => Math.max(1, p - 1));
  const handleNext = () => setPage((p) => Math.min(totalPages, p + 1));

  return (
    <section className="container-page py-6 sm:py-8">
      <div className="grid gap-6 lg:grid-cols-[17rem_1fr]">
        <DashboardSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

        <div className="min-w-0 space-y-6">
          <div className="flex flex-col gap-4 rounded-lg border border-slate-200 bg-white p-5 shadow-soft dark:border-slate-800 dark:bg-slate-900 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <button
                type="button"
                className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-slate-300 text-slate-700 lg:hidden dark:border-slate-700 dark:text-slate-200"
                onClick={() => setIsSidebarOpen(true)}
                aria-label="Open dashboard menu"
              >
                <FiSearch className="h-5 w-5" aria-hidden="true" />
              </button>
              <div>
                <p className="text-sm font-bold uppercase tracking-wide text-brand-700 dark:text-brand-100">Coding Questions</p>
                <h1 className="mt-1 text-2xl font-bold text-slate-950 dark:text-white">Browse Practice Problems</h1>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <select
                value={difficulty}
                onChange={(e) => { setPage(1); setDifficulty(e.target.value); }}
                className="form-input w-auto"
              >
                <option value="">All difficulties</option>
                {difficulties.map((d) => (
                  <option key={d} value={d}>{d.charAt(0).toUpperCase() + d.slice(1)}</option>
                ))}
              </select>

              <select
                value={topic}
                onChange={(e) => { setPage(1); setTopic(e.target.value); }}
                className="form-input w-auto"
              >
                <option value="">All topics</option>
                {topics.map((t) => (
                  <option key={t} value={t}>{t.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</option>
                ))}
              </select>

              <select
                value={limit}
                onChange={(e) => { setPage(1); setLimit(Number(e.target.value)); }}
                className="form-input w-auto"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
              </select>
            </div>
          </div>

          {error && (
            <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700 dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-200">
              {error}
            </div>
          )}

          {isLoading ? (
            <Loader label="Loading questions..." />
          ) : !questions.length ? (
            <div className="rounded-lg border border-slate-200 bg-white p-6 text-slate-700 shadow-soft dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200">
              No coding questions available for the selected filters.
            </div>
          ) : (
            <>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {questions.map((q) => (
                  <button
                    key={q._id}
                    onClick={() => handleCardClick(q._id)}
                    className="group text-left rounded-lg border border-slate-200 bg-white p-5 shadow-soft transition hover:-translate-y-0.5 hover:border-brand-200 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-brand-900"
                  >
                    <h3 className="text-lg font-bold text-slate-950 dark:text-white">{q.title}</h3>
                    <div className="mt-3 flex items-center justify-between text-sm text-slate-600 dark:text-slate-400">
                      <span className={`inline-flex items-center rounded-full px-3 py-1 font-semibold ${q.difficulty === 'easy' ? 'bg-emerald-50 text-emerald-700' : q.difficulty === 'medium' ? 'bg-amber-50 text-amber-700' : 'bg-rose-50 text-rose-700'} dark:bg-opacity-10`}>{q.difficulty}</span>
                      <span className="capitalize">{q.topic.replace(/-/g, ' ')}</span>
                    </div>
                  </button>
                ))}
              </div>

              <div className="mt-6 flex items-center justify-between">
                <div className="text-sm text-slate-600 dark:text-slate-400">Page {page} of {totalPages}</div>
                <div className="flex items-center gap-2">
                  <button onClick={handlePrev} disabled={page === 1} className="btn-secondary">Prev</button>
                  <button onClick={handleNext} disabled={page === totalPages} className="btn-secondary">Next</button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default CodingQuestions;
