const BulkActionBar = ({ count, onPublish, onDelete }) => {
  if (!count) return null;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex gap-4">
      <span className="text-slate-400">{count} selected</span>

      <button className="btn-success" onClick={onPublish}>
        Publish
      </button>
      <button className="btn-danger" onClick={onDelete}>
        Delete
      </button>
    </div>
  );
};

export default BulkActionBar;
