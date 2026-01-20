/* eslint-disable no-console */
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaSave, FaArrowLeft, FaSpinner } from "react-icons/fa";
import { getQuizById, updateQuiz } from "../services/quizApi";

const DIFFICULTY_OPTIONS = ["EASY", "MEDIUM", "HARD"];

const EditQuiz = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    durationMinutes: 1,
    category: "",
    subCategory: "",
    difficulty: "EASY",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  /* -------- Load quiz -------- */
  useEffect(() => {
    const loadQuiz = async () => {
      try {
        console.log("[DEBUG] Loading quiz with ID:", id);
        const quiz = await getQuizById(id);
        console.log("[DEBUG] Quiz loaded:", quiz);

        setForm({
          title: quiz.title ?? "",
          description: quiz.description ?? "",
          durationMinutes: quiz.durationMinutes ?? 1,
          category: quiz.category ?? "",
          subCategory: quiz.subCategory ?? "",
          difficulty: quiz.difficulty ?? "EASY",
        });
      } catch (err) {
        console.error("[ERROR] Failed to load quiz:", err);
        navigate("/quizzes");
      } finally {
        setLoading(false);
      }
    };

    loadQuiz();
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "durationMinutes" ? Number(value) : value,
    }));
  };

  /* -------- Save -------- */
  const handleSave = async () => {
    try {
      setSaving(true);

      // 🔹 Log payload before sending
      const payload = {
        title: form.title.trim(),
        description: form.description.trim(),
        durationMinutes: form.durationMinutes,
        category: form.category || null,
        subCategory: form.subCategory || null,
        difficulty: form.difficulty,
      };
      console.log("[DEBUG] Sending updateQuiz request to ID:", id);
      console.log("[DEBUG] Payload:", payload);

      const response = await updateQuiz(id, payload);

      console.log("[DEBUG] Update response:", response.data);

      navigate("/quizzes");
    } catch (err) {
      // 🔹 Detailed error logging
      if (err.response) {
        // Backend returned an error response
        console.error("[ERROR] Axios response error:", {
          status: err.response.status,
          data: err.response.data,
          headers: err.response.headers,
        });
      } else if (err.request) {
        // Request was made but no response received
        console.error("[ERROR] Axios request made but no response:", err.request);
      } else {
        // Something else happened
        console.error("[ERROR] Axios unknown error:", err.message);
      }
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0f172a] text-gray-400 flex items-center justify-center">
        Loading quiz...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-6 flex justify-center">
      <div className="w-full max-w-3xl bg-gray-900 p-8 rounded-xl shadow-lg space-y-6">

        {/* HEADER */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Edit Quiz</h1>
            <p className="text-gray-400">Admin can update all quiz details</p>
          </div>
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-400 hover:text-white"
          >
            <FaArrowLeft /> Back
          </button>
        </div>

        {/* TITLE */}
        <div>
          <label className="block mb-1 font-semibold">Title *</label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            className="w-full bg-gray-800 px-4 py-3 rounded-lg"
          />
        </div>

        {/* DESCRIPTION */}
        <div>
          <label className="block mb-1 font-semibold">Description *</label>
          <textarea
            name="description"
            rows={4}
            value={form.description}
            onChange={handleChange}
            className="w-full bg-gray-800 px-4 py-3 rounded-lg"
          />
        </div>

        {/* DURATION */}
        <div>
          <label className="block mb-1 font-semibold">
            Duration (minutes) *
          </label>
          <input
            type="number"
            min={1}
            name="durationMinutes"
            value={form.durationMinutes}
            onChange={handleChange}
            className="w-full bg-gray-800 px-4 py-3 rounded-lg"
          />
        </div>

        {/* CATEGORY */}
        <div>
          <label className="block mb-1 font-semibold">Category</label>
          <input
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full bg-gray-800 px-4 py-3 rounded-lg"
          />
        </div>

        {/* SUB CATEGORY */}
        <div>
          <label className="block mb-1 font-semibold">Sub Category</label>
          <input
            name="subCategory"
            value={form.subCategory}
            onChange={handleChange}
            className="w-full bg-gray-800 px-4 py-3 rounded-lg"
          />
        </div>

        {/* DIFFICULTY */}
        <div>
          <label className="block mb-1 font-semibold">Difficulty</label>
          <select
            name="difficulty"
            value={form.difficulty}
            onChange={handleChange}
            className="w-full bg-gray-800 px-4 py-3 rounded-lg"
          >
            {DIFFICULTY_OPTIONS.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>

        {/* ACTIONS */}
        <div className="flex justify-end gap-3 pt-4">
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-3 bg-gray-800 rounded-xl"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 disabled:opacity-50"
          >
            {saving ? <FaSpinner className="animate-spin" /> : <FaSave />}
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>

      </div>
    </div>
  );
};

export default EditQuiz;
