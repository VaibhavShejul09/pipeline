import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaUsers, FaClipboardList, FaTrash, FaPlusCircle } from "react-icons/fa";

const Dashboard = () => {
  const navigate = useNavigate();

  // Dummy stats for illustration
  const stats = [
    { title: "Total Users", value: 1200, icon: <FaUsers className="text-3xl" /> },
    { title: "Active Quizzes", value: 35, icon: <FaClipboardList className="text-3xl" /> },
    { title: "Pending Requests", value: 8, icon: <FaPlusCircle className="text-3xl" /> },
    { title: "Deleted Items", value: 12, icon: <FaTrash className="text-3xl" /> },
  ];

  const actions = [
    { name: "Add User", color: "from-green-500 to-green-700", onClick: () => navigate("/admin/users/add") },
    { name: "Manage Users", color: "from-blue-500 to-blue-700", onClick: () => navigate("/admin/users") },
    { name: "Manage Quizzes", color: "from-indigo-500 to-purple-600", onClick: () => navigate("/quizzes") },
    { name: "Manage Problems", color: "from-emerald-500 to-green-700", onClick: () => navigate("/admin/problems") },
  ];

  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-8">
      {/* Header */}
      <div className="mb-10 flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold">Admin Dashboard 👋</h1>
          <p className="text-gray-400 mt-1">Manage your application efficiently</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((stat, idx) => (
          <motion.div
            key={idx}
            whileHover={{ scale: 1.05 }}
            className="flex items-center justify-between bg-gradient-to-r from-gray-800 to-gray-900 p-6 rounded-xl shadow-lg"
          >
            <div>
              <h3 className="text-lg font-medium text-gray-300">{stat.title}</h3>
              <p className="text-2xl font-bold mt-1">{stat.value}</p>
            </div>
            <div className="text-gray-400">{stat.icon}</div>
          </motion.div>
        ))}
      </div>

      {/* Actions */}
      <h2 className="text-2xl font-semibold mb-4">Actions</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {actions.map((action, idx) => (
          <motion.div
            key={idx}
            whileHover={{ scale: 1.05 }}
            onClick={action.onClick}
            className={`cursor-pointer p-6 rounded-xl bg-gradient-to-r ${action.color} shadow-lg flex items-center justify-center`}
          >
            <h3 className="text-xl font-semibold">{action.name}</h3>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
