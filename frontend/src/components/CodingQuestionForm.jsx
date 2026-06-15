import { useEffect, useState } from "react";

const topics = [
  { id: "arrays", name: "Arrays" },
  { id: "strings", name: "Strings" },
  { id: "linked-lists", name: "Linked Lists" },
  { id: "trees", name: "Trees" },
  { id: "dynamic-programming", name: "Dynamic Programming" }
];
const difficulties = ["easy", "medium", "hard"];

const CodingQuestionForm = ({ initialData, onSubmit, onCancel, loading, submitLabel, error }) => {
  const [title, setTitle] = useState(initialData?.title || "");
  const [topic, setTopic] = useState(initialData?.topic || initialData?.category || "arrays");
  const [difficulty, setDifficulty] = useState(initialData?.difficulty || "medium");

  // New assessment fields with backward compatibility (fallback to legacy)
  const [problemStatement, setProblemStatement] = useState(
    initialData?.problemStatement ?? initialData?.description ?? ""
  );
  const [inputFormat, setInputFormat] = useState(initialData?.inputFormat || "");
  const [outputFormat, setOutputFormat] = useState(initialData?.outputFormat || "");
  const [constraints, setConstraints] = useState(initialData?.constraints || "");
  const [sampleInput, setSampleInput] = useState(initialData?.sampleInput || "");
  const [sampleOutput, setSampleOutput] = useState(initialData?.sampleOutput || "");
  const [explanation, setExplanation] = useState(initialData?.explanation || "");
  const [solution, setSolution] = useState(initialData?.solution ?? initialData?.answer ?? "");
  const [timeComplexity, setTimeComplexity] = useState(initialData?.timeComplexity || "");
  const [spaceComplexity, setSpaceComplexity] = useState(initialData?.spaceComplexity || "");

  const [formError, setFormError] = useState("");

  useEffect(() => {
    setTitle(initialData?.title || "");
    setTopic(initialData?.topic || initialData?.category || "arrays");
    setDifficulty(initialData?.difficulty || "medium");

    setProblemStatement(initialData?.problemStatement ?? initialData?.description ?? "");
    setInputFormat(initialData?.inputFormat || "");
    setOutputFormat(initialData?.outputFormat || "");
    setConstraints(initialData?.constraints || "");
    setSampleInput(initialData?.sampleInput || "");
    setSampleOutput(initialData?.sampleOutput || "");
    setExplanation(initialData?.explanation || "");
    setSolution(initialData?.solution ?? initialData?.answer ?? "");
    setTimeComplexity(initialData?.timeComplexity || "");
    setSpaceComplexity(initialData?.spaceComplexity || "");

    setFormError("");
  }, [initialData]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setFormError("");

    if (!title.trim()) {
      setFormError("Please enter a title.");
      return;
    }

    if (!topic.trim()) {
      setFormError("Please select a category/topic.");
      return;
    }

    if (!difficulty) {
      setFormError("Please select a difficulty.");
      return;
    }

    if (!problemStatement.trim()) {
      setFormError("Please enter a problem statement.");
      return;
    }

    if (!solution.trim()) {
      setFormError("Please enter the expected solution.");
      return;
    }

    onSubmit({
      title: title.trim(),
      category: topic,
      topic,
      difficulty,

      problemStatement: problemStatement.trim(),
      inputFormat: inputFormat.trim(),
      outputFormat: outputFormat.trim(),
      constraints: constraints.trim(),
      sampleInput: sampleInput.trim(),
      sampleOutput: sampleOutput.trim(),
      explanation: explanation.trim(),
      solution: solution.trim(),
      timeComplexity: timeComplexity.trim(),
      spaceComplexity: spaceComplexity.trim(),

      // keep legacy synced for migration safety
      description: problemStatement.trim(),
      answer: solution.trim()
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 rounded-3xl border border-slate-200 bg-slate-50 p-5 shadow-soft dark:border-slate-800 dark:bg-slate-900"
    >
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-slate-950 dark:text-white">{submitLabel}</h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Use this form to add or update a coding question.
          </p>
        </div>
      </div>

      {(formError || error) && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-200">
          {formError || error}
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
          Title
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="form-input mt-2 w-full"
            placeholder="Enter question title"
          />
        </label>

        <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
          Topic
          <select
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="form-input mt-2 w-full"
          >
            {topics.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
        Difficulty
        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          className="form-input mt-2 w-full"
        >
          {difficulties.map((level) => (
            <option key={level} value={level}>
              {level.charAt(0).toUpperCase() + level.slice(1)}
            </option>
          ))}
        </select>
      </label>

      <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
        Problem Statement
        <textarea
          value={problemStatement}
          onChange={(e) => setProblemStatement(e.target.value)}
          rows={4}
          className="form-input mt-2 w-full resize-none"
          placeholder="Describe the full coding problem statement"
        />
      </label>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
          Input Format
          <textarea
            value={inputFormat}
            onChange={(e) => setInputFormat(e.target.value)}
            rows={2}
            className="form-input mt-2 w-full resize-none"
            placeholder="e.g., Input: N then N integers ..."
          />
        </label>

        <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
          Output Format
          <textarea
            value={outputFormat}
            onChange={(e) => setOutputFormat(e.target.value)}
            rows={2}
            className="form-input mt-2 w-full resize-none"
            placeholder="e.g., Output: ..."
          />
        </label>
      </div>

      <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
        Constraints
        <textarea
          value={constraints}
          onChange={(e) => setConstraints(e.target.value)}
          rows={2}
          className="form-input mt-2 w-full resize-none"
          placeholder="Optional constraints"
        />
      </label>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
          Sample Input
          <textarea
            value={sampleInput}
            onChange={(e) => setSampleInput(e.target.value)}
            rows={2}
            className="form-input mt-2 w-full resize-none"
            placeholder="Optional sample input"
          />
        </label>

        <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
          Sample Output
          <textarea
            value={sampleOutput}
            onChange={(e) => setSampleOutput(e.target.value)}
            rows={2}
            className="form-input mt-2 w-full resize-none"
            placeholder="Optional sample output"
          />
        </label>
      </div>

      <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
        Explanation
        <textarea
          value={explanation}
          onChange={(e) => setExplanation(e.target.value)}
          rows={3}
          className="form-input mt-2 w-full resize-none"
          placeholder="Optional explanation"
        />
      </label>

      <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
        Solution (Official)
        <textarea
          value={solution}
          onChange={(e) => setSolution(e.target.value)}
          rows={4}
          className="form-input mt-2 w-full resize-none"
          placeholder="Official solution (or expected answer)"
        />
      </label>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
          Time Complexity
          <input
            value={timeComplexity}
            onChange={(e) => setTimeComplexity(e.target.value)}
            className="form-input mt-2 w-full"
            placeholder="e.g., O(n)"
          />
        </label>

        <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
          Space Complexity
          <input
            value={spaceComplexity}
            onChange={(e) => setSpaceComplexity(e.target.value)}
            className="form-input mt-2 w-full"
            placeholder="e.g., O(1)"
          />
        </label>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={onCancel}
          className="btn-secondary w-full sm:w-auto"
          disabled={loading}
        >
          Cancel
        </button>
        <button type="submit" className="btn-primary w-full sm:w-auto" disabled={loading}>
          {loading ? "Saving..." : submitLabel}
        </button>
      </div>
    </form>
  );
};

export default CodingQuestionForm;

