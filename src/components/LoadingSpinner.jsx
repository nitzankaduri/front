/**
 * LoadingSpinner Component
 * Displays an animated high-performance racing telemetry spinner
 * while fetching data from the Jolpica F1 API.
 */
export default function LoadingSpinner({ message = 'Loading Formula 1 constructor telemetry...' }) {
  return (
    <div className="state-container loading-container" role="status" aria-live="polite">
      <div className="tachometer-spinner">
        <div className="spinner-outer-ring"></div>
        <div className="spinner-inner-disc">
          <span className="spinner-speed-text">F1</span>
        </div>
      </div>
      <p className="loading-message">{message}</p>
      <span className="loading-subtext">Connecting to Jolpica Ergast API...</span>
    </div>
  );
}
