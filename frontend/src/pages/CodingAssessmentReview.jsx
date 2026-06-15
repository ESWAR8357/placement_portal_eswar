import { useLocation, useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

const CodingAssessmentReview = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const reviewData = location?.state?.reviewData || [];

  const renderStatus = (status) => {
    const st = String(status || "not-attempted").toLowerCase().trim();
    if (st === "solved") {
      return (
        <span className="inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-200">
          Solved
        </span>
      );
    }
    if (st === "attempted") {
      return (
        <span className="inline-flex items-center rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700 dark:bg-amber-900/20 dark:text-amber-200">
          Attempted
        </span>
      );
    }
    return (
      <span className="inline-flex items-center rounded-full bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-700 dark:bg-slate-900/30 dark:text-slate-200">
        Not Attempted
      </span>
    );
  };

  return (
    <section className="container-page py-6 sm:py-8">
      <div className="mx-auto max-w-4xl space-y-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-950 dark:text-white">Coding Assessment Review</h1>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">Review per-question explanation and official solution.</p>
          </div>

          <button
            type="button"
            onClick={() => navigate("/coding-assessment/result")}
            className="btn-secondary inline-flex items-center gap-2"
          >
            <FiArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back to Result
          </button>
        </div>

        {!reviewData.length ? (
          <div className="rounded-lg border border-slate-200 bg-white p-6 text-slate-700 shadow-soft dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200">
            No review data available.
          </div>
        ) : (
          <div className="space-y-5">
            {reviewData.map((item, idx) => (
              <article key={`${item.questionId || item.id || idx}`} className="rounded-lg border border-slate-200 bg-white p-5 shadow-soft dark:border-slate-800 dark:bg-slate-900">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h2 className="text-lg font-bold text-slate-950 dark:text-white">{idx + 1}. {item.title}</h2>
                    <div className="mt-2 flex flex-wrap items-center gap-2">
                      {item.difficulty ? (
                        <span className="inline-flex items-center rounded-full bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-700 dark:bg-slate-950 dark:text-slate-200">
                          {item.difficulty}
                        </span>
                      ) : null}
                      {renderStatus(item.status)}
                    </div>
                  </div>
                </div>

                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  <div>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">Problem Statement</p>
                    <p className="mt-2 whitespace-pre-wrap text-sm text-slate-700 dark:text-slate-300">{item.problemStatement}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">Constraints</p>
                    <p className="mt-2 whitespace-pre-wrap text-sm text-slate-700 dark:text-slate-300">{item.constraints}</p>
                  </div>
                </div>

                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  <div>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">Input Format</p>
                    <p className="mt-2 whitespace-pre-wrap text-sm text-slate-700 dark:text-slate-300">{item.inputFormat}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">Output Format</p>
                    <p className="mt-2 whitespace-pre-wrap text-sm text-slate-700 dark:text-slate-300">{item.outputFormat}</p>
                  </div>
                </div>

                {(item.sampleInput || item.sampleOutput) ? (
                  <div className="mt-4 grid gap-4 md:grid-cols-2">
                    <div>
                      <p className="text-sm font-semibold text-slate-900 dark:text-white">Sample Input</p>
                      {item.sampleInput ? (
                        <pre className="mt-2 rounded bg-slate-50 p-3 text-sm text-slate-700 dark:bg-slate-950 dark:text-slate-200">{item.sampleInput}</pre>
                      ) : null}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900 dark:text-white">Sample Output</p>
                      {item.sampleOutput ? (
                        <pre className="mt-2 rounded bg-slate-50 p-3 text-sm text-slate-700 dark:bg-slate-950 dark:text-slate-200">{item.sampleOutput}</pre>
                      ) : null}
                    </div>
                  </div>
                ) : null}

                <div className="mt-4">
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">Explanation</p>
                  <p className="mt-2 whitespace-pre-wrap text-sm text-slate-700 dark:text-slate-300">{item.explanation}</p>
                </div>

                <div className="mt-4">
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">Official Solution</p>
                  <pre className="mt-2 overflow-auto rounded bg-slate-50 p-3 text-sm text-slate-700 dark:bg-slate-950 dark:text-slate-200">{item.officialSolution}</pre>
                </div>

                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <div>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">Time Complexity</p>
                    <p className="mt-2 whitespace-pre-wrap text-sm text-slate-700 dark:text-slate-300">{item.timeComplexity}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">Space Complexity</p>
                    <p className="mt-2 whitespace-pre-wrap text-sm text-slate-700 dark:text-slate-300">{item.spaceComplexity}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default CodingAssessmentReview;

