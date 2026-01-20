import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

import QuestionForm from "../components/QuestionForm";
import { createQuestion } from "../services/questionApi";

const CreateQuestion = () => {
  const { quizId } = useParams();
  const navigate = useNavigate();

  const [submitting, setSubmitting] = useState(false);

  const handleCreate = async (formData) => {
    try {
      setSubmitting(true);

      await createQuestion({
        quizId,
        questionText: formData.questionText,
        optionA: formData.optionA,
        optionB: formData.optionB,
        optionC: formData.optionC,
        optionD: formData.optionD,
        correctOption: formData.correctOption,
      });

      navigate(`/quizzes/${quizId}/questions`);
    } catch (err) {
      console.error("❌ Failed to create question", err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white px-8 py-10">
      {/* HEADER */}
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-400 hover:text-white"
        >
          <FaArrowLeft />
          Back
        </button>
        <h1 className="text-3xl font-bold">
          Add Question
        </h1>
      </div>

      <QuestionForm
        onSubmit={handleCreate}
        submitting={submitting}
      />
    </div>
  );
};

export default CreateQuestion;
