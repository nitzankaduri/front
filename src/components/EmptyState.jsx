export default function EmptyState({
  title = 'No constructors found',
  message = 'Try adjusting your search terms or clearing current filters.',
  onReset,
}) {
  return (
    <div className="state-container empty-state-container" role="status">
      <div className="empty-state-icon" aria-hidden="true">
        🏁
      </div>
      <h3 className="empty-state-title">{title}</h3>
      <p className="empty-state-message">{message}</p>
      {onReset && (
        <button type="button" className="btn btn-secondary" onClick={onReset}>
          Clear All Filters
        </button>
      )}
    </div>
  );
}
