import { FaEdit, FaTrash } from "react-icons/fa";

const QuestionRow = ({ question, index, onEdit, onDelete }) => {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
      <h3 className="font-semibold text-lg">
        Q{index + 1}. {question.questionText}
      </h3>

      <ul className="mt-3 space-y-1 text-gray-300">
        {question.options.map((opt, i) => (
          <li key={i} className="text-sm">
            {String.fromCharCode(65 + i)}. {opt}
          </li>
        ))}
      </ul>

      <div className="flex gap-2 mt-4">
        <button
          onClick={onEdit}
          className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700"
        >
          <FaEdit />
        </button>

        <button
          onClick={onDelete}
          className="p-2 bg-red-600/20 text-red-400 rounded-lg hover:bg-red-600/30"
        >
          <FaTrash />
        </button>
      </div>
    </div>
  );
};

export default QuestionRow;
