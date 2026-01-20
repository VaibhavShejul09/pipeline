import { motion } from "framer-motion";
import {
  FaEdit,
  FaEye,
  FaListUl,
  FaToggleOn,
  FaToggleOff,
} from "react-icons/fa";

const statusStyles = {
  PUBLISHED: "bg-green-500/10 text-green-400 border-green-500/30",
  DRAFT: "bg-yellow-500/10 text-yellow-400 border-yellow-500/30",
};

const QuizRow = ({
  quiz,
  selected,
  onSelect,
  onView,
  onEdit,
  onQuestions,
  onToggleStatus,
}) => {
  const isPublished = quiz.status === "PUBLISHED";

  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      className={`flex items-center justify-between gap-6 p-5 rounded-xl border 
        ${
          selected
            ? "border-emerald-500/40 bg-emerald-500/5"
            : "border-gray-800 bg-gray-900"
        }
      `}
    >
      {/* LEFT */}
      <div className="flex items-start gap-4 flex-1">
        <input
          type="checkbox"
          checked={selected}
          onChange={onSelect}
          className="mt-1 accent-emerald-500"
        />

        <div className="flex-1">
          <h3 className="text-lg font-semibold text-white">
            {quiz.title}
          </h3>

          <p className="text-sm text-gray-400 line-clamp-1 mt-1">
            {quiz.description}
          </p>

          <div className="flex items-center gap-4 mt-3 text-sm">
            {/* STATUS */}
            <span
              className={`px-3 py-1 rounded-full border text-xs font-semibold
                ${statusStyles[quiz.status] || "border-gray-600 text-gray-400"}
              `}
            >
              {quiz.status}
            </span>

            {/* DURATION */}
            <span className="text-gray-500">
              ⏱ {quiz.durationMinutes} min
            </span>
          </div>
        </div>
      </div>

      {/* RIGHT ACTIONS */}
      <div className="flex items-center gap-3">
        {/* PREVIEW */}
        <button
          onClick={onView}
          className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition"
          title="Preview Quiz"
        >
          <FaEye />
        </button>

        {/* EDIT */}
        <button
          onClick={onEdit}
          disabled={isPublished}
          className={`p-2 rounded-lg transition ${
            isPublished
              ? "bg-gray-700 cursor-not-allowed opacity-50"
              : "bg-gray-800 hover:bg-gray-700"
          }`}
          title={
            isPublished
              ? "Cannot edit a published quiz"
              : "Edit Quiz"
          }
        >
          <FaEdit />
        </button>

        {/* QUESTIONS */}
        <button
          onClick={onQuestions}
          className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition"
          title="Manage Questions"
        >
          <FaListUl />
        </button>

        {/* TOGGLE STATUS */}
        <button
          onClick={onToggleStatus}
          className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition"
          title={isPublished ? "Unpublish Quiz" : "Publish Quiz"}
        >
          {isPublished ? (
            <FaToggleOn className="text-green-400" />
          ) : (
            <FaToggleOff className="text-gray-400" />
          )}
        </button>
      </div>
    </motion.div>
  );
};

export default QuizRow;
