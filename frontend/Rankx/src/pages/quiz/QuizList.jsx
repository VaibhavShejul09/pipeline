import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchQuizzes } from "../../services/quizApi";

const QuizList = () => {
  const navigate = useNavigate();
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  fetchQuizzes()
    .then(res => {
      console.log("Quizzes API response:", res.data); // 🔥 LOG 1
      setQuizzes(res.data);
    })
    .catch(err => {
      console.error("Failed to fetch quizzes:", err);
    })
    .finally(() => setLoading(false));
}, []);


  if (loading) return <p className="text-white p-10">Loading...</p>;



  return (
    <div className="min-h-screen bg-[#020617] text-white p-10">
      <h1 className="text-3xl font-bold mb-8">Available Quizzes</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {quizzes.map((quiz) => (
          <div
            key={quiz.id}
            className="bg-[#0f172a] rounded-2xl p-6 shadow-lg hover:shadow-2xl transition"
          >
            <h2 className="text-xl font-semibold">{quiz.title}</h2>
            <p className="text-gray-400 mt-2">{quiz.description}</p>

            <div className="flex justify-between mt-4 text-sm text-gray-400">
              <span>⏱ {quiz.durationMinutes} mins</span>
              <span>❓ {quiz.totalQuestions}</span>
            </div>

            <span className="inline-block mt-3 px-3 py-1 text-xs bg-indigo-600 rounded-full">
              {quiz.difficulty}
            </span>
           
            <button
              onClick={() => navigate(`/quiz/${quiz.id}`)}
              className="mt-6 w-full py-2 bg-indigo-600 hover:bg-indigo-700 rounded-xl"
            >
              View Details
            </button>
          </div>
        ))}

        
      </div>
    </div>
  );
};

export default QuizList;
