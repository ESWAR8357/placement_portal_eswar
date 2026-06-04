import { useEffect, useMemo, useState } from "react";
import { FiEdit2, FiPlus, FiSearch, FiTrash2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

import TechnicalQuestionForm from "../components/TechnicalQuestionForm.jsx";
import Loader from "../components/Loader.jsx";
import useAuth from "../hooks/useAuth.js";
import {
  fetchAdminTechnicalQuestions,
  createAdminTechnicalQuestion,
  updateAdminTechnicalQuestion,
  deleteAdminTechnicalQuestion
} from "../services/adminTechnicalService.js";
import { getApiErrorMessage } from "../utils/validators.js";

const subjects = [
  { id: "", name: "All subjects" },
  { id: "java", name: "Java" },
  { id: "react", name: "React" },
  { id: "javascript", name: "JavaScript" },
  { id: "dbms", name: "DBMS" },
  { id: "operating-systems", name: "Operating Systems" },
  { id: "computer-networks", name: "Computer Networks" }
];

const pageSizes = [10, 20, 30];

const AdminTechnicalQuestions = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [query, setQuery] = useState("");
  const [subject, setSubject] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [formError, setFormError] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    if (user && user.role !== "admin") {
      navigate("/dashboard", { replace: true });
    }
  }, [user, navigate]);

  useEffect(() => {
    const loadQuestions = async () => {
      setIsLoading(true);
      setError("");

      try {
        const response = await fetchAdminTechnicalQuestions({ page, limit, query, subject });
        setQuestions(response.questions || []);
        setTotal(response.total || 0);
      } catch (apiError) {
        setError(getApiErrorMessage(apiError, "Unable to load technical questions."));
      } finally {
        setIsLoading(false);
      }
    };

    loadQuestions();
  }, [page, limit, query, subject, refreshKey]);

  const totalPages = useMemo(() => Math.max(1, Math.ceil(total / limit)), [limit, total]);

  const handleSearch = (event) => {
    event.preventDefault();
    setPage(1);
    setQuery(searchTerm.trim());
  };

  const openCreateForm = () => {
    setSelectedQuestion(null);
    setFormError("");
    setIsFormOpen(true);
  };

  const openEditForm = (questionItem) => {
    setSelectedQuestion(questionItem);
    setFormError("");
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setSelectedQuestion(null);
    setIsFormOpen(false);
    setFormError("");
  };

  const persistQuestion = async (payload) => {
    setIsSubmitting(true);
    setFormError("");

    try {
      if (selectedQuestion) {
        await updateAdminTechnicalQuestion(selectedQuestion._id, payload);
      } else {
        await createAdminTechnicalQuestion(payload);
      }
      setIsFormOpen(false);
      setSelectedQuestion(null);
      setPage(1);
      setQuery("");
      setSearchTerm("");
      setRefreshKey((prev) => prev + 1);
    } catch (apiError) {
      setFormError(getApiErrorMessage(apiError, "Unable to save question."));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (deleteConfirmId !== id) {
      setDeleteConfirmId(id);
      return;
    }

    try {
      setIsLoading(true);
      await deleteAdminTechnicalQuestion(id);
      setDeleteConfirmId(null);
      setRefreshKey((prev) => prev + 1);
    } catch (apiError) {
      setError(getApiErrorMessage(apiError, "Unable to delete question."));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="container-page py-6 sm:py-8">
      <div className="space-y-6">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-950">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-wide text-brand-700 dark:text-brand-100">Admin Question Management</p>
              <h1 className="mt-1 text-2xl font-bold text-slate-950 dark:text-white">Technical Questions</h1>
              <p className="mt-2 max-w-2xl text-sm text-slate-600 dark:text-slate-400">Manage technical practice questions organized by subject.</p>
            </div>
            <button type="button" onClick={openCreateForm} className="btn-primary inline-flex items-center gap-2 px-4 py-3">
              <FiPlus className="h-4 w-4" />
              Add Question
            </button>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_18rem]">
          <div className="space-y-6">
            <div className="flex flex-col gap-3 rounded-3xl border border-slate-200 bg-slate-50 p-5 shadow-soft dark:border-slate-800 dark:bg-slate-900">
              <form onSubmit={handleSearch} className="grid gap-3 sm:grid-cols-[1fr_auto]">
                <label className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-950">
                  <FiSearch className="h-4 w-4 text-slate-500 dark:text-slate-400" />
                  <input
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search question text"
                    className="w-full bg-transparent text-sm text-slate-900 outline-none dark:text-slate-100"
                  />
                </label>
                <button type="submit" className="btn-secondary w-full sm:w-auto">
                  Search
                </button>
              </form>
              <div className="flex flex-wrap items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
                <span>{total} question{total === 1 ? "" : "s"}</span>
                <span className="h-1.5 w-1.5 rounded-full bg-slate-300 dark:bg-slate-600" />
                <span>Page {page} of {totalPages}</span>
              </div>
            </div>

            <div className="flex flex-col gap-3 rounded-3xl border border-slate-200 bg-white p-5 shadow-soft dark:border-slate-800 dark:bg-slate-950 sm:flex-row sm:items-center sm:justify-between">
              <label className="flex flex-1 flex-col gap-2 text-sm font-medium text-slate-700 dark:text-slate-200">
                Filter by subject
                <select
                  value={subject}
                  onChange={(e) => { setPage(1); setSubject(e.target.value); }}
                  className="form-input w-full"
                >
                  {subjects.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            {error && (
              <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-200">
                {error}
              </div>
            )}

            {isFormOpen && (
              <TechnicalQuestionForm
                initialData={selectedQuestion}
                onSubmit={persistQuestion}
                onCancel={closeForm}
                loading={isSubmitting}
                submitLabel={selectedQuestion ? "Update Question" : "Create Question"}
                error={formError}
              />
            )}

            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-soft dark:border-slate-800 dark:bg-slate-950">
              <div className="grid grid-cols-[3fr_1fr_1fr_1fr] gap-4 border-b border-slate-200 bg-slate-100 px-4 py-3 text-xs uppercase tracking-[0.15em] text-slate-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400 sm:grid-cols-[4fr_1fr_1fr_1fr]">
                <span>Question</span>
                <span>Subject</span>
                <span>Difficulty</span>
                <span className="text-right">Actions</span>
              </div>
              {isLoading ? (
                <div className="p-6">
                  <Loader label="Loading questions" />
                </div>
              ) : !questions.length ? (
                <div className="p-6 text-sm text-slate-600 dark:text-slate-300">No technical questions found.</div>
              ) : (
                <div className="divide-y divide-slate-200 dark:divide-slate-800">
                  {questions.map((questionItem) => (
                    <div key={questionItem._id} className="grid grid-cols-[3fr_1fr_1fr_1fr] gap-4 px-4 py-4 text-sm text-slate-700 dark:text-slate-200 sm:grid-cols-[4fr_1fr_1fr_1fr]">
                      <div>
                        <p className="font-semibold text-slate-950 dark:text-white">{questionItem.question}</p>
                        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Answer: {questionItem.answer}</p>
                      </div>
                      <div className="capitalize">{subjects.find((item) => item.id === questionItem.subject)?.name || questionItem.subject}</div>
                      <div className="capitalize">{questionItem.difficulty}</div>
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => openEditForm(questionItem)}
                          className="inline-flex h-10 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 px-3 text-slate-700 transition hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200 dark:hover:bg-slate-900"
                        >
                          <FiEdit2 className="h-4 w-4" aria-hidden="true" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeleteConfirmId(deleteConfirmId === questionItem._id ? null : questionItem._id)}
                          className="inline-flex h-10 items-center justify-center rounded-xl border border-rose-200 bg-rose-50 px-3 text-rose-700 transition hover:bg-rose-100 dark:border-rose-900/40 dark:bg-rose-950/20 dark:text-rose-200 dark:hover:bg-rose-900"
                        >
                          <FiTrash2 className="h-4 w-4" aria-hidden="true" />
                        </button>
                      </div>
                      {deleteConfirmId === questionItem._id && (
                        <div className="col-span-full rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700 dark:border-rose-900/40 dark:bg-rose-950/30 dark:text-rose-200">
                          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                            <span>Confirm delete this question?</span>
                            <div className="flex items-center gap-2">
                              <button
                                type="button"
                                onClick={() => handleDelete(questionItem._id)}
                                className="btn-primary px-4 py-2"
                              >
                                Delete
                              </button>
                              <button
                                type="button"
                                onClick={() => setDeleteConfirmId(null)}
                                className="btn-secondary px-4 py-2"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex flex-col gap-3 rounded-3xl border border-slate-200 bg-slate-50 p-5 shadow-soft dark:border-slate-800 dark:bg-slate-900 sm:flex-row sm:items-center sm:justify-between">
              <label className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
                Show
                <select
                  value={limit}
                  onChange={(e) => { setPage(1); setLimit(Number(e.target.value)); }}
                  className="form-input w-24"
                >
                  {pageSizes.map((size) => (
                    <option key={size} value={size}>{size}</option>
                  ))}
                </select>
                entries
              </label>
              <div className="flex items-center gap-2">
                <button type="button" onClick={() => setPage((prev) => Math.max(1, prev - 1))} disabled={page === 1} className="btn-secondary">
                  Prev
                </button>
                <button type="button" onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))} disabled={page === totalPages} className="btn-secondary">
                  Next
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-soft dark:border-slate-800 dark:bg-slate-950">
              <p className="text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Admin tools</p>
              <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
                Create, update, and remove technical questions. Use search to match question text and filter by subject.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminTechnicalQuestions;
