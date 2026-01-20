import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSave, FaSpinner } from "react-icons/fa";
import { getRoleFromToken } from "../../../utils/jwtUtils";
import { createQuiz } from "../services/quizApi";

const DIFFICULTY_OPTIONS = ["EASY", "MEDIUM", "HARD"];

const CreateQuiz = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    hours: 0,
    minutes: 10,
    category: "",
    subCategory: "",
    difficulty: "EASY",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  /* ================= AUTH CHECK ================= */
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return navigate("/login");

    try {
      const role = getRoleFromToken(token);
      if (!["ROLE_ADMIN", "ADMIN"].includes(role)) {
        navigate("/login");
      }
    } catch {
      navigate("/login");
    }
  }, [navigate]);

  /* ================= HELPERS ================= */
  const getTotalMinutes = () =>
    Number(form.hours) * 60 + Number(form.minutes);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const newErrors = {};
    if (!form.title.trim()) newErrors.title = "Title is required";
    if (!form.description.trim())
      newErrors.description = "Description is required";
    if (!form.category.trim()) newErrors.category = "Category is required";
    if (!form.subCategory.trim())
      newErrors.subCategory = "Subcategory is required";
    if (getTotalMinutes() < 1)
      newErrors.duration = "Duration must be at least 1 minute";
    return newErrors;
  };

  /* ================= SUBMIT ================= */
  const handleCreate = async () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    try {
      const quiz = await createQuiz({
        title: form.title,
        description: form.description,
        durationMinutes: getTotalMinutes(),
        category: form.category,
        subCategory: form.subCategory,
        difficulty: form.difficulty,
        status: "DRAFT",
      });

      // 👉 Go directly to question creation
      navigate(`/quizzes/${quiz.id}/questions`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-6 flex justify-center">
      <div className="w-full max-w-3xl bg-gray-900 p-8 rounded-xl space-y-6">
        <h1 className="text-3xl font-bold text-center">Create Quiz</h1>

        {/* Title */}
        <div>
          <label className="font-semibold">Quiz Title</label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            className="w-full bg-gray-800 p-3 rounded mt-1"
          />
          {errors.title && <p className="text-red-500">{errors.title}</p>}
        </div>

        {/* Description */}
        <div>
          <label className="font-semibold">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={4}
            className="w-full bg-gray-800 p-3 rounded mt-1"
          />
          {errors.description && (
            <p className="text-red-500">{errors.description}</p>
          )}
        </div>

        {/* Duration */}
        <div>
          <label className="font-semibold">Duration</label>
          <div className="flex gap-3 mt-1">
            <input
              type="number"
              min={0}
              name="hours"
              value={form.hours}
              onChange={handleChange}
              className="w-1/2 bg-gray-800 p-3 rounded"
              placeholder="Hours"
            />
            <input
              type="number"
              min={0}
              max={59}
              name="minutes"
              value={form.minutes}
              onChange={handleChange}
              className="w-1/2 bg-gray-800 p-3 rounded"
              placeholder="Minutes"
            />
          </div>
          {errors.duration && (
            <p className="text-red-500">{errors.duration}</p>
          )}
        </div>

        {/* Category */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="font-semibold">Category</label>
            <input
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full bg-gray-800 p-3 rounded mt-1"
            />
            {errors.category && (
              <p className="text-red-500">{errors.category}</p>
            )}
          </div>

          <div>
            <label className="font-semibold">Subcategory</label>
            <input
              name="subCategory"
              value={form.subCategory}
              onChange={handleChange}
              className="w-full bg-gray-800 p-3 rounded mt-1"
            />
            {errors.subCategory && (
              <p className="text-red-500">{errors.subCategory}</p>
            )}
          </div>
        </div>

        {/* Difficulty */}
        <div>
          <label className="font-semibold">Difficulty</label>
          <select
            name="difficulty"
            value={form.difficulty}
            onChange={handleChange}
            className="w-full bg-gray-800 p-3 rounded mt-1"
          >
            {DIFFICULTY_OPTIONS.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>

        {/* Submit */}
        <button
          onClick={handleCreate}
          disabled={loading}
          className="w-full flex justify-center items-center gap-2 bg-green-600 py-3 rounded-xl font-semibold disabled:opacity-50"
        >
          {loading ? <FaSpinner className="animate-spin" /> : <FaSave />}
          {loading ? "Creating..." : "Create & Add Questions"}
        </button>
      </div>
    </div>
  );
};

export default CreateQuiz;
