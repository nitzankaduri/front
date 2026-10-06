/**
 * ErrorMessage Component
 * Displays a clear error banner when a network error or API failure occurs,
 * providing a retry button to re-trigger the fetch.
 */
export default function ErrorMessage({ error, onRetry }) {
  const message = error?.message || 'Unable to retrieve Formula 1 constructor data.';

  return (
    <div className="state-container error-container" role="alert">
      <div className="error-icon-box" aria-hidden="true">
        <span className="warning-symbol">⚠️</span>
      </div>
      <h2 className="error-title">Pit Stop Required: Connection Issue</h2>
      <p className="error-description">{message}</p>
      <p className="error-hint">Please check your internet connection and try reloading the paddock data.</p>
      {onRetry && (
        <button
          type="button"
          className="btn btn-primary retry-btn"
          onClick={onRetry}
          id="retry-button"
        >
          <span className="reload-icon">↻</span> Retry Connection
        </button>
      )}
    </div>
  );
}
