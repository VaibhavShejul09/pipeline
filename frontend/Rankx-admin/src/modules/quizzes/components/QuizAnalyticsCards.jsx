const StatCard = ({ label, value }) => (
  <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
    <p className="text-slate-400 text-sm">{label}</p>
    <p className="text-3xl font-bold mt-1">{value}</p>
  </div>
);

const QuizAnalyticsCards = ({ stats }) => {
  return (
    <div className="grid md:grid-cols-3 gap-6">
      <StatCard label="Total Quizzes" value={stats.total} />
      <StatCard label="Total Attempts" value={stats.attempts} />
      <StatCard label="Average Score" value={`${stats.avgScore}%`} />
    </div>
  );
};

export default QuizAnalyticsCards;
