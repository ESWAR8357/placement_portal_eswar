import { useEffect, useMemo, useState } from "react";

const subjects = [
  { id: "java", name: "Java" },
  { id: "react", name: "React" },
  { id: "javascript", name: "JavaScript" },
  { id: "dbms", name: "DBMS" },
  { id: "operating-systems", name: "Operating Systems" },
  { id: "computer-networks", name: "Computer Networks" }
];

const difficulties = ["easy", "medium", "hard"];

const TechnicalQuestionForm = ({ initialData, onSubmit, onCancel, loading, submitLabel, error }) => {
  const [subject, setSubject] = useState(initialData?.subject || "java");
  const [question, setQuestion] = useState(initialData?.question || "");
  const [options, setOptions] = useState(initialData?.options || ["", ""]);
  const [answer, setAnswer] = useState(initialData?.answer || "");
  const [difficulty, setDifficulty] = useState(initialData?.difficulty || "medium");
  const [formError, setFormError] = useState("");

  useEffect(() => {
    setSubject(initialData?.subject || "java");
    setQuestion(initialData?.question || "");
    setOptions(initialData?.options || ["", ""]);
    setAnswer(initialData?.answer || "");
    setDifficulty(initialData?.difficulty || "medium");
    setFormError("");
  }, [initialData]);

  useEffect(() => {
    if (options.length > 0 && !options.includes(answer)) {
      setAnswer("");
    }
  }, [options, answer]);

  const optionFields = useMemo(
    () => options.map((option, index) => ({ id: index, value: option })),
    [options]
  );

  const handleOptionChange = (index, value) => {
    const nextOptions = [...options];
    nextOptions[index] = value;
    setOptions(nextOptions);
  };

  const handleAddOption = () => {
    setOptions((prev) => [...prev, ""]);
  };

  const handleRemoveOption = (index) => {
    if (options.length <= 2) {
      return;
    }
    const nextOptions = options.filter((_, idx) => idx !== index);
    setOptions(nextOptions);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setFormError("");

    const trimmedQuestion = question.trim();
    const sanitizedOptions = options.map((option) => option.trim()).filter(Boolean);

    if (!trimmedQuestion) {
      setFormError("Please enter the question text.");
      return;
    }

    if (sanitizedOptions.length < 2) {
      setFormError("Please provide at least two non-empty answer options.");
      return;
    }

    if (!answer || !sanitizedOptions.includes(answer.trim())) {
      setFormError("Please select the correct answer from the options.");
      return;
    }

    onSubmit({
      subject,
      question: trimmedQuestion,
      options: sanitizedOptions,
      answer: answer.trim(),
      difficulty
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 rounded-3xl border border-slate-200 bg-slate-50 p-5 shadow-soft dark:border-slate-800 dark:bg-slate-900">
      <div>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-slate-950 dark:text-white">{submitLabel}</h2>
            <p className="text-sm text-slate-600 dark:text-slate-400">Add or update a technical question for student practice.</p>
          </div>
        </div>
      </div>

      {(formError || error) && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-200">
          {formError || error}
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
          Subject
          <select value={subject} onChange={(e) => setSubject(e.target.value)} className="form-input mt-2 w-full">
            {subjects.map((subjectOption) => (
              <option key={subjectOption.id} value={subjectOption.id}>
                {subjectOption.name}
              </option>
            ))}
          </select>
        </label>

        <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
          Difficulty
          <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)} className="form-input mt-2 w-full">
            {difficulties.map((level) => (
              <option key={level} value={level}>
                {level.charAt(0).toUpperCase() + level.slice(1)}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
        Question text
        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          rows={3}
          className="form-input mt-2 w-full resize-none"
          placeholder="Enter the technical question prompt"
        />
      </label>

      <div className="space-y-3 rounded-3xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-950">
        <div className="flex items-center justify-between gap-3">
          <p className="text-sm font-semibold text-slate-900 dark:text-white">Answer options</p>
          <button type="button" onClick={handleAddOption} className="btn-secondary rounded-full px-4 py-2 text-sm">
            Add option
          </button>
        </div>

        <div className="space-y-3">
          {optionFields.map(({ id, value }) => (
            <div key={id} className="grid gap-3 sm:grid-cols-[1fr_auto]">
              <input
                value={value}
                onChange={(e) => handleOptionChange(id, e.target.value)}
                className="form-input w-full"
                placeholder={`Option ${id + 1}`}
              />
              <button
                type="button"
                onClick={() => handleRemoveOption(id)}
                disabled={options.length <= 2}
                className="inline-flex h-11 items-center justify-center rounded-xl border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>

      <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
        Correct answer
        <select value={answer} onChange={(e) => setAnswer(e.target.value)} className="form-input mt-2 w-full">
          <option value="">Select correct answer</option>
          {options.map((option, index) => (
            <option key={index} value={option} disabled={!option.trim()}>
              {option || `Option ${index + 1}`}
            </option>
          ))}
        </select>
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

export default TechnicalQuestionForm;
