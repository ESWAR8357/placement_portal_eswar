import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiClock, FiChevronLeft, FiChevronRight, FiSend, FiSave } from "react-icons/fi";

import DashboardSidebar from "../components/DashboardSidebar.jsx";
import Loader from "../components/Loader.jsx";
import { fetchCodingAssessmentQuestions, submitCodingAssessment } from "../services/codingAssessmentService.js";
import { getApiErrorMessage } from "../utils/validators.js";

const TEST_DURATION_SECONDS = 25 * 60;

const STATUS_OPTIONS = [
  { key: "solved", label: "Solved" },
  { key: "attempted", label: "Attempted" },
  { key: "not-attempted", label: "Not Attempted" }
];

const CodingAssessment = () => {
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState("");

  const [currentIndex, setCurrentIndex] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(TEST_DURATION_SECONDS);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // answers: { [questionId]: { status: 'solved'|'attempted'|'not-attempted' } }
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    const load = async () => {
      try {
        setIsLoaded(false);
        setError("");
        const resp = await fetchCodingAssessmentQuestions({ limit: 10 });
        setQuestions(resp.questions || []);
      } catch (apiError) {
        setError(getApiErrorMessage(apiError, "Unable to load coding assessment questions."));
      } finally {
        setIsLoaded(true);
      }
    };

    load();
  }, []);

  useEffect(() => {
    if (!isLoaded || questions.length === 0 || secondsLeft <= 0 || isSubmitting) return;

    const timerId = window.setInterval(() => {
      setSecondsLeft((v) => Math.max(v - 1, 0));
    }, 1000);

    return () => window.clearInterval(timerId);
  }, [isLoaded, questions.length, secondsLeft, isSubmitting]);

  useEffect(() => {
    if (!isLoaded || questions.length === 0 || secondsLeft > 0 || isSubmitting) return;
    void handleSubmit(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [secondsLeft, isLoaded, isSubmitting]);

  const formattedTime = useMemo(() => {
    const minutes = Math.floor(secondsLeft / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (secondsLeft % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  }, [secondsLeft]);

  const currentQuestion = questions[currentIndex];
  const currentStatus = currentQuestion ? answers[currentQuestion._id]?.status || "not-attempted" : "not-attempted";

  const answeredCount = useMemo(() => {
    return questions.filter((q) => {
      const st = answers[q._id]?.status;
      return Boolean(st && st !== "not-attempted");
    }).length;
  }, [questions, answers]);

  const setStatusForCurrent = (status) => {
    if (!currentQuestion) return;
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion._id]: { status }
    }));
  };

  const handleSave = () => {
    try {
      sessionStorage.setItem(
        "placementPortalCodingAssessmentDraft",
        JSON.stringify({
          answers,
          secondsLeft,
          currentIndex
        })
      );
    } catch {
      // ignore
    }
  };

  useEffect(() => {
    // hydrate draft if present
    try {
      const raw = sessionStorage.getItem("placementPortalCodingAssessmentDraft");
      if (!raw) return;
      const draft = JSON.parse(raw);
      if (draft?.answers) setAnswers(draft.answers);
      if (typeof draft?.secondsLeft === "number") setSecondsLeft(draft.secondsLeft);
      if (typeof draft?.currentIndex === "number") setCurrentIndex(draft.currentIndex);
    } catch {
      // ignore
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (autoSubmit = false) => {
    if (isSubmitting || questions.length === 0) return;

    setIsSubmitting(true);
    setError("");

    try {
      const payload = {
        testName: "Coding Assessment",
        answers: questions.map((q) => ({
          questionId: q._id,
          status: answers[q._id]?.status || "not-attempted"
        }))
      };

      const response = await submitCodingAssessment(payload);

      navigate("/coding-assessment/result", {
        state: {
          result: response.result,
          autoSubmitted: autoSubmit
        }
      });
    } catch (apiError) {
      setError(getApiErrorMessage(apiError, "Unable to submit coding assessment."));
      setIsSubmitting(false);
    }
  };

  const handlePrevious = () => setCurrentIndex((i) => Math.max(i - 1, 0));
  const handleNext = () => setCurrentIndex((i) => Math.min(i + 1, questions.length - 1));

  const palette = (
    <div className="flex flex-wrap gap-2">
      {questions.map((q, idx) => {
        const st = answers[q._id]?.status || "not-attempted";
        const tone =
          st === "solved"
            ? "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-200 dark:border-emerald-800"
            : st === "attempted"
              ? "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-200 dark:border-amber-800"
              : "bg-slate-50 text-slate-700 border-slate-200 dark:bg-slate-900/30 dark:text-slate-200 dark:border-slate-800";

        return (
          <button
            key={q._id}
            type="button"
            onClick={() => setCurrentIndex(idx)}
            className={`rounded-full border px-3 py-1 text-sm font-semibold ${tone} ${
              idx === currentIndex ? "ring-2 ring-brand-400" : ""
            }`}
            aria-label={`Go to question ${idx + 1}`}
          >
            {idx + 1}
          </button>
        );
      })}
    </div>
  );

  return (
    <section className="container-page py-6 sm:py-8">
      <div className="grid gap-6 lg:grid-cols-[17rem_1fr]">
        <DashboardSidebar isOpen={false} onClose={() => {}} />

        <div className="min-w-0 space-y-6">
          <div className="flex flex-col gap-4 rounded-lg border border-slate-200 bg-white p-5 shadow-soft sm:flex-row sm:items-center sm:justify-between dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center gap-3">
              <div className="inline-flex items-center justify-center rounded-md border border-slate-300 bg-slate-50 p-2 dark:border-slate-700 dark:bg-slate-950">
                <FiClock className="h-5 w-5" aria-hidden="true" />
              </div>
              <div>
                <p className="text-sm font-bold uppercase tracking-wide text-brand-700 dark:text-brand-100">
                  Coding Assessment
                </p>
                <h1 className="mt-1 text-2xl font-bold text-slate-950 dark:text-white">
                  Coding Problem Practice Test
                </h1>
              </div>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-100">
              {formattedTime}
            </div>
          </div>

          {error ? (
            <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700 dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-200">
              {error}
            </div>
          ) : !isLoaded ? (
            <Loader label="Loading coding assessment" />
          ) : !questions.length ? (
            <div className="rounded-lg border border-slate-200 bg-white p-6 text-slate-700 shadow-soft dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200">
              No coding questions available at this time.
            </div>
          ) : (
            <div className="space-y-6">
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950/40">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm font-semibold text-slate-500">Question {currentIndex + 1} of {questions.length}</p>
                    <p className="text-sm text-slate-600">Marked: {answeredCount} / {questions.length}</p>
                  </div>
                  <div>{palette}</div>
                </div>
              </div>

              <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-soft dark:border-slate-800 dark:bg-slate-900">
                <div className="space-y-4">
                  <div>
                    <h2 className="text-xl font-bold text-slate-950 dark:text-white">{currentQuestion.title}</h2>
                    <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
                      <span className={`inline-flex items-center rounded-full px-2 py-1 font-semibold ${
                        currentQuestion.difficulty === "easy"
                          ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-200"
                          : currentQuestion.difficulty === "medium"
                            ? "bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-200"
                            : "bg-rose-50 text-rose-700 dark:bg-rose-900/20 dark:text-rose-200"
                      }`}>
                        {currentQuestion.difficulty}
                      </span>
                      <span className="capitalize">{currentQuestion.topic?.replace(/-/g, " ") || ""}</span>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">Problem Statement</p>
                    <p className="mt-2 whitespace-pre-wrap text-sm text-slate-700 dark:text-slate-300">{currentQuestion.problemStatement}</p>
                  </div>

                  {currentQuestion.constraints ? (
                    <div>
                      <p className="text-sm font-semibold text-slate-900 dark:text-white">Constraints</p>
                      <p className="mt-2 whitespace-pre-wrap text-sm text-slate-700 dark:text-slate-300">{currentQuestion.constraints}</p>
                    </div>
                  ) : null}

                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <p className="text-sm font-semibold text-slate-900 dark:text-white">Input Format</p>
                      <p className="mt-2 whitespace-pre-wrap text-sm text-slate-700 dark:text-slate-300">{currentQuestion.inputFormat}</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900 dark:text-white">Output Format</p>
                      <p className="mt-2 whitespace-pre-wrap text-sm text-slate-700 dark:text-slate-300">{currentQuestion.outputFormat}</p>
                    </div>
                  </div>

                  {(currentQuestion.sampleInput || currentQuestion.sampleOutput) ? (
                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <p className="text-sm font-semibold text-slate-900 dark:text-white">Sample Input</p>
                        {currentQuestion.sampleInput ? (
                          <pre className="mt-2 rounded bg-slate-50 p-3 text-sm text-slate-700 dark:bg-slate-950 dark:text-slate-200">{currentQuestion.sampleInput}</pre>
                        ) : null}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-900 dark:text-white">Sample Output</p>
                        {currentQuestion.sampleOutput ? (
                          <pre className="mt-2 rounded bg-slate-50 p-3 text-sm text-slate-700 dark:bg-slate-950 dark:text-slate-200">{currentQuestion.sampleOutput}</pre>
                        ) : null}
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>

              <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-soft dark:border-slate-800 dark:bg-slate-900">
                <p className="text-sm font-semibold text-slate-900 dark:text-white">Mark Status</p>
                <div className="mt-3 grid gap-3 sm:grid-cols-3">
                  {STATUS_OPTIONS.map((opt) => (
                    <button
                      key={opt.key}
                      type="button"
                      onClick={() => setStatusForCurrent(opt.key)}
                      className={`rounded-lg border px-4 py-3 text-left text-sm font-semibold transition ${
                        currentStatus === opt.key
                          ? "border-brand-400 bg-brand-50 text-brand-900 dark:border-brand-700 dark:bg-brand-900/20 dark:text-brand-100"
                          : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200 dark:hover:bg-slate-900"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>

                <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex flex-wrap gap-3">
                    <button type="button" onClick={handleSave} className="btn-secondary inline-flex items-center gap-2">
                      <FiSave className="h-4 w-4" aria-hidden="true" />
                      Save Draft
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={handlePrevious}
                      disabled={currentIndex === 0}
                      className="btn-secondary inline-flex items-center gap-2"
                    >
                      <FiChevronLeft className="h-4 w-4" aria-hidden="true" />
                      Previous
                    </button>
                    <button
                      type="button"
                      onClick={handleNext}
                      disabled={currentIndex === questions.length - 1}
                      className="btn-secondary inline-flex items-center gap-2"
                    >
                      Next
                      <FiChevronRight className="h-4 w-4" aria-hidden="true" />
                    </button>
                  </div>
                </div>

                <div className="mt-5 flex justify-end">
                  <button
                    type="button"
                    onClick={() => handleSubmit(false)}
                    disabled={isSubmitting}
                    className="btn-primary inline-flex items-center gap-2"
                  >
                    <FiSend className="h-4 w-4" aria-hidden="true" />
                    {isSubmitting ? "Submitting..." : "Submit Assessment"}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CodingAssessment;

