import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";

import Loader from "../components/Loader.jsx";
import { fetchCodingQuestionById } from "../services/codingQuestionService.js";
import { getApiErrorMessage } from "../utils/validators.js";

const CodingQuestionDetail = () => {
  const { id } = useParams();
  const [question, setQuestion] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      setIsLoading(true);
      setError("");
      try {
        const response = await fetchCodingQuestionById(id);
        setQuestion(response.question);
      } catch (apiError) {
        setError(getApiErrorMessage(apiError, "Unable to load question details."));
      } finally {
        setIsLoading(false);
      }
    };

    load();
  }, [id]);

  if (isLoading) return <Loader label="Loading question" />;

  if (error)
    return (
      <section className="container-page py-6 sm:py-8">
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700 dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-200">
          {error}
        </div>
      </section>
    );

  if (!question)
    return (
      <section className="container-page py-6 sm:py-8">
        <div className="rounded-lg border border-slate-200 bg-white p-6 text-slate-700 shadow-soft dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200">
          No question found.
        </div>
      </section>
    );

  return (
    <section className="container-page py-6 sm:py-8">
      <div className="mx-auto max-w-3xl space-y-6">
        <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-slate-950 dark:text-white">{question.title}</h1>
              <div className="mt-2 flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
                <span className={`inline-flex items-center rounded-full px-2 py-1 font-semibold ${question.difficulty === 'easy' ? 'bg-emerald-50 text-emerald-700' : question.difficulty === 'medium' ? 'bg-amber-50 text-amber-700' : 'bg-rose-50 text-rose-700'}`}>
                  {question.difficulty}
                </span>
                <span className="capitalize">{question.topic.replace(/-/g, ' ')}</span>
              </div>
            </div>
          </div>

          <div className="mt-6 space-y-6">
            <div>
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Problem Description</h2>
              <p className="mt-2 text-sm text-slate-700 dark:text-slate-300 whitespace-pre-wrap">{question.description}</p>
            </div>

            {question.constraints && (
              <div>
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Constraints</h3>
                <p className="mt-2 text-sm text-slate-700 dark:text-slate-300 whitespace-pre-wrap">{question.constraints}</p>
              </div>
            )}

            {(question.sampleInput || question.sampleOutput) && (
              <div>
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Example</h3>
                {question.sampleInput && (
                  <div className="mt-2">
                    <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">Sample Input</p>
                    <pre className="mt-1 rounded bg-slate-50 p-3 text-sm text-slate-700 dark:bg-slate-950 dark:text-slate-200">{question.sampleInput}</pre>
                  </div>
                )}
                {question.sampleOutput && (
                  <div className="mt-2">
                    <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">Sample Output</p>
                    <pre className="mt-1 rounded bg-slate-50 p-3 text-sm text-slate-700 dark:bg-slate-950 dark:text-slate-200">{question.sampleOutput}</pre>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="mt-6 flex items-center gap-3">
            <button type="button" onClick={() => navigate('/coding-questions')} className="btn-secondary inline-flex items-center gap-2">
              <FiArrowLeft className="h-4 w-4" />
              Back to Questions
            </button>
            <button type="button" onClick={() => navigate('/coding-questions')} className="btn-primary inline-flex items-center gap-2 ml-2">
              Next Question
              <FiArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CodingQuestionDetail;
