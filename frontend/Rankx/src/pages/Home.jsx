import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-10">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold">
          Welcome back 👋
        </h1>
        <p className="text-gray-400 mt-2">
          Choose what you want to practice today
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        <motion.div
          whileHover={{ scale: 1.05 }}
          onClick={() => navigate("/quiz")}
          className="cursor-pointer p-8 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 shadow-xl"
        >
          <h2 className="text-3xl font-semibold">📝 Quizzes</h2>
          <p className="mt-3 text-blue-100">
            Timed MCQs to test your knowledge
          </p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          onClick={() => navigate("/problems")}
          className="cursor-pointer p-8 rounded-2xl bg-gradient-to-r from-emerald-600 to-green-600 shadow-xl"
        >
          <h2 className="text-3xl font-semibold">💻 Problems</h2>
          <p className="mt-3 text-green-100">
            Solve coding & logical problems
          </p>
        </motion.div>

      </div>
    </div>
  );
};

export default Dashboard;
