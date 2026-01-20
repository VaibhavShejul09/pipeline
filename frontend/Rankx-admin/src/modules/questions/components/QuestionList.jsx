import QuestionRow from "./QuestionRow";

const QuestionList = ({ questions, onEdit, onDelete }) => {
  if (!questions.length) {
    return (
      <div className="text-center text-gray-400 py-20">
        No questions added yet
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {questions.map((q, index) => (
        <QuestionRow
          key={q.id}
          question={q}
          index={index}
          onEdit={() => onEdit(q.id)}
          onDelete={() => onDelete(q.id)}
        />
      ))}
    </div>
  );
};

export default QuestionList;
