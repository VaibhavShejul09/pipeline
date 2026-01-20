const QuizFilters = ({ filters, onChange }) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      {/* Search */}
      <input
        type="text"
        value={filters.search || ""}
        onChange={(e) => onChange({ ...filters, search: e.target.value })}
        placeholder="Search quizzes..."
        className="flex-1 px-4 py-3 rounded-xl bg-gray-800 text-white border border-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
      />

      {/* Status Filter */}
      <select
        value={filters.status || ""}
        onChange={(e) => onChange({ ...filters, status: e.target.value })}
        className="px-4 py-3 rounded-xl bg-gray-800 text-white border border-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
      >
        <option value="">All Status</option>
        <option value="published">Published</option>
        <option value="draft">Draft</option>
      </select>
    </div>
  );
};

export default QuizFilters;
