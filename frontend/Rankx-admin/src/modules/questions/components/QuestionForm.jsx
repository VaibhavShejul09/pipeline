import { useState, useEffect } from "react";

const OPTION_KEYS = ["A", "B", "C", "D"];

const QuestionForm = ({ initialData = null, onSubmit, submitting = false }) => {
  const [form, setForm] = useState({
    questionText: "",
    optionA: "",
    optionB: "",
    optionC: "",
    optionD: "",
    correctOption: "",
  });

  const [error, setError] = useState("");

  // ✅ Accept ONLY flat data
  useEffect(() => {
    if (!initialData) return;

    setForm({
      questionText: initialData.questionText || "",
      optionA: initialData.optionA || "",
      optionB: initialData.optionB || "",
      optionC: initialData.optionC || "",
      optionD: initialData.optionD || "",
      correctOption: initialData.correctOption || "",
    });
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleSubmit = () => {
    if (!form.questionText.trim()) {
      return setError("Question text is required");
    }

    for (const key of ["optionA", "optionB", "optionC", "optionD"]) {
      if (!form[key].trim()) {
        return setError("All options are required");
      }
    }

    if (!OPTION_KEYS.includes(form.correctOption)) {
      return setError("Please select the correct option");
    }

    onSubmit(form);
  };

  return (
    <div className="bg-gray-900 p-6 rounded-xl space-y-4">
      {/* QUESTION */}
      <div>
        <label className="font-semibold">Question</label>
        <textarea
          name="questionText"
          value={form.questionText}
          onChange={handleChange}
          className="w-full mt-1 p-3 bg-gray-800 rounded-lg"
          rows={3}
        />
      </div>

      {/* OPTIONS */}
      {OPTION_KEYS.map((key) => (
        <div key={key}>
          <label className="font-semibold">Option {key}</label>
          <input
            name={`option${key}`}
            value={form[`option${key}`]}
            onChange={handleChange}
            className="w-full mt-1 p-3 bg-gray-800 rounded-lg"
          />
        </div>
      ))}

      {/* CORRECT OPTION */}
      <div>
        <label className="font-semibold block mb-1">Correct Option</label>
        <div className="flex gap-4">
          {OPTION_KEYS.map((key) => (
            <label key={key} className="flex items-center gap-2">
              <input
                type="radio"
                name="correctOption"
                value={key}
                checked={form.correctOption === key}
                onChange={handleChange}
              />
              {key}
            </label>
          ))}
        </div>
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <button
        onClick={handleSubmit}
        disabled={submitting}
        className="w-full bg-gradient-to-r from-green-500 to-emerald-600 py-3 rounded-xl font-semibold disabled:opacity-50"
      >
        {submitting ? "Saving..." : "Save Question"}
      </button>
    </div>
  );
};

export default QuestionForm;
