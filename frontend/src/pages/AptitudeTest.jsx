import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiChevronLeft, FiChevronRight, FiClock, FiSave, FiSend } from "react-icons/fi";

import { fetchAptitudeQuestions, submitAptitudeTest } from "../services/aptitudeService.js";
import DashboardSidebar from "../components/DashboardSidebar.jsx";
import Loader from "../components/Loader.jsx";
import { getApiErrorMessage } from "../utils/validators.js";

const TEST_DURATION_SECONDS = 30 * 60;

const AptitudeTest = () => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [savedQuestionId, setSavedQuestionId] = useState(null);
  const [secondsLeft, setSecondsLeft] = useState(TEST_DURATION_SECONDS);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [submissionError, setSubmissionError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const loadQuestions = async () => {
      try {
        const response = await fetchAptitudeQuestions(20);
        setQuestions(response.questions);
      } catch (apiError) {
        setError(getApiErrorMessage(apiError, "Unable to load aptitude questions."));
      } finally {
        setIsLoaded(true);
      }
    };

    loadQuestions();
  }, []);

  useEffect(() => {
    if (!isLoaded || !questions.length || secondsLeft <= 0 || isSubmitting) {
      return;
    }

    const timerId = window.setInterval(() => {
      setSecondsLeft((value) => Math.max(value - 1, 0));
    }, 1000);

    return () => window.clearInterval(timerId);
  }, [isLoaded, questions, secondsLeft, isSubmitting]);

  useEffect(() => {
    if (!isLoaded || secondsLeft > 0 || isSubmitting) {
      return;
    }

    handleSubmit(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [secondsLeft, isLoaded, isSubmitting]);

  const currentQuestion = questions[currentIndex];

  const formattedTime = useMemo(() => {
    const minutes = Math.floor(secondsLeft / 60).toString().padStart(2, "0");
    const seconds = (secondsLeft % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  }, [secondsLeft]);

  const answeredCount = useMemo(
    () => questions.filter((question) => answers[question._id]).length,
    [questions, answers]
  );

  const selectedOption = currentQuestion ? answers[currentQuestion._id] : "";

  const handleAnswerChange = (option) => {
    if (!currentQuestion) {
      return;
    }

    setAnswers((prev) => ({
      ...prev,
      [currentQuestion._id]: option
    }));
    setSavedQuestionId(null);
  };

  const handleSaveAnswer = () => {
    if (!currentQuestion) {
      return;
    }

    setSavedQuestionId(currentQuestion._id);
  };

  const handleSubmit = async (autoSubmit = false) => {
    if (isSubmitting || !questions.length) {
      return;
    }

    setIsSubmitting(true);
    setSubmissionError("");

    const timeTaken = TEST_DURATION_SECONDS - secondsLeft;

    try {
      const payload = {
        testName: "Aptitude Test",
        answers: questions.map((question) => ({
          questionId: question._id,
          selectedOption: answers[question._id] ?? ""
        }))
      };

      const response = await submitAptitudeTest(payload);
      const reviewAnswers = response.result?.reviewAnswers ?? [];

      try {
        sessionStorage.setItem(
          "placementPortalLastAptitudeReview",
          JSON.stringify({ reviewAnswers, timeTaken })
        );
      } catch {
        // ignore storage failures
      }

      navigate("/aptitude-tests/result", {
        state: {
          result: {
            ...response.result,
            reviewAnswers,
            timeTaken
          },
          user: response.user,
          autoSubmitted: autoSubmit
        }
      });
    } catch (apiError) {
      setSubmissionError(getApiErrorMessage(apiError, "Unable to submit test."));
      setIsSubmitting(false);
    }
  };

  const handlePrevious = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, questions.length - 1));
  };

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
                <FiClock className="h-5 w-5" aria-hidden="true" />
              </button>
              <div>
                <p className="text-sm font-bold uppercase tracking-wide text-brand-700 dark:text-brand-100">Aptitude Assessment</p>
                <h1 className="mt-1 text-2xl font-bold text-slate-950 dark:text-white">30 Minute Practice Test</h1>
              </div>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-100">
              <FiClock className="h-4 w-4" aria-hidden="true" />
              {formattedTime}
            </div>
          </div>

          {error ? (
            <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700 dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-200">
              {error}
            </div>
          ) : !isLoaded ? (
            <Loader label="Loading aptitude test" />
          ) : !questions.length ? (
            <div className="rounded-lg border border-slate-200 bg-white p-6 text-slate-700 shadow-soft dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200">
              No aptitude questions are available at this time.
            </div>
          ) : (
            <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900">
              <div className="mb-6 grid gap-4 sm:grid-cols-[1fr_auto]">
                <div>
                  <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">Question {currentIndex + 1} of {questions.length}</p>
                  <h2 className="mt-3 text-xl font-semibold text-slate-950 dark:text-white">{currentQuestion.question}</h2>
                </div>
                <div className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200">
                  <p className="font-semibold">Progress</p>
                  <p>{answeredCount} of {questions.length} saved</p>
                </div>
              </div>

              <div className="space-y-4">
                {currentQuestion.options.map((option) => (
                  <label
                    key={option}
                    className={`flex cursor-pointer items-center gap-3 rounded-2xl border p-4 transition ${
                      selectedOption === option
                        ? "border-brand-500 bg-brand-50 text-brand-900 dark:border-brand-700 dark:bg-brand-900/20"
                        : "border-slate-200 bg-white text-slate-700 hover:border-brand-200 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200 dark:hover:border-brand-700"
                    }`}
                  >
                    <input
                      type="radio"
                      name="aptitude-answer"
                      value={option}
                      checked={selectedOption === option}
                      onChange={() => handleAnswerChange(option)}
                      className="h-4 w-4 text-brand-600 accent-brand-600"
                    />
                    <span className="text-sm">{option}</span>
                  </label>
                ))}
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={handleSaveAnswer}
                    className="btn-secondary inline-flex items-center gap-2"
                  >
                    <FiSave className="h-4 w-4" aria-hidden="true" />
                    Save Answer
                  </button>
                  {savedQuestionId === currentQuestion._id && (
                    <span className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-200">
                      Answer saved
                    </span>
                  )}
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

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200">
                  <p className="font-semibold">Unanswered</p>
                  <p>{questions.length - answeredCount} questions left</p>
                </div>
                <button
                  type="button"
                  onClick={() => handleSubmit(false)}
                  disabled={isSubmitting}
                  className="btn-primary inline-flex items-center gap-2"
                >
                  <FiSend className="h-4 w-4" aria-hidden="true" />
                  {isSubmitting ? "Submitting..." : "Submit Test"}
                </button>
              </div>

              {submissionError && (
                <div className="mt-4 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700 dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-200">
                  {submissionError}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default AptitudeTest;
