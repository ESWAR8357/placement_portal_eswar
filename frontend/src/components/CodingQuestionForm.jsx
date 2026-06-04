import { useEffect, useMemo, useState } from "react";

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
  const [description, setDescription] = useState(initialData?.description || "");
  const [topic, setTopic] = useState(initialData?.topic || "arrays");
  const [difficulty, setDifficulty] = useState(initialData?.difficulty || "medium");
  const [sampleInput, setSampleInput] = useState(initialData?.sampleInput || "");
  const [sampleOutput, setSampleOutput] = useState(initialData?.sampleOutput || "");
  const [constraints, setConstraints] = useState(initialData?.constraints || "");
  const [answer, setAnswer] = useState(initialData?.answer || "");
  const [formError, setFormError] = useState("");

  useEffect(() => {
    setTitle(initialData?.title || "");
    setDescription(initialData?.description || "");
    setTopic(initialData?.topic || "arrays");
    setDifficulty(initialData?.difficulty || "medium");
    setSampleInput(initialData?.sampleInput || "");
    setSampleOutput(initialData?.sampleOutput || "");
    setConstraints(initialData?.constraints || "");
    setAnswer(initialData?.answer || "");
    setFormError("");
  }, [initialData]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setFormError("");

    if (!title.trim()) {
      setFormError("Please enter a title.");
      return;
    }

    if (!description.trim()) {
      setFormError("Please enter a description.");
      return;
    }

    if (!answer.trim()) {
      setFormError("Please enter the expected answer.");
      return;
    }

    onSubmit({
      title: title.trim(),
      description: description.trim(),
      topic,
      difficulty,
      sampleInput: sampleInput.trim(),
      sampleOutput: sampleOutput.trim(),
      constraints: constraints.trim(),
      answer: answer.trim()
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 rounded-3xl border border-slate-200 bg-slate-50 p-5 shadow-soft dark:border-slate-800 dark:bg-slate-900">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-slate-950 dark:text-white">{submitLabel}</h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">Use this form to add or update a coding question.</p>
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
          <select value={topic} onChange={(e) => setTopic(e.target.value)} className="form-input mt-2 w-full">
            {topics.map((item) => (
              <option key={item.id} value={item.id}>{item.name}</option>
            ))}
          </select>
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
          Difficulty
          <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)} className="form-input mt-2 w-full">
            {difficulties.map((level) => (
              <option key={level} value={level}>{level.charAt(0).toUpperCase() + level.slice(1)}</option>
            ))}
          </select>
        </label>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
          Answer
          <input
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            className="form-input mt-2 w-full"
            placeholder="Expected output or answer"
          />
        </label>
      </div>

      <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
        Description
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          className="form-input mt-2 w-full resize-none"
          placeholder="Describe the problem"
        />
      </label>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
          Sample input
          <textarea
            value={sampleInput}
            onChange={(e) => setSampleInput(e.target.value)}
            rows={2}
            className="form-input mt-2 w-full resize-none"
            placeholder="Optional sample input"
          />
        </label>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
          Sample output
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
        Constraints
        <textarea
          value={constraints}
          onChange={(e) => setConstraints(e.target.value)}
          rows={2}
          className="form-input mt-2 w-full resize-none"
          placeholder="Optional constraints"
        />
      </label>

      <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
        <button type="button" onClick={onCancel} className="btn-secondary w-full sm:w-auto" disabled={loading}>
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
