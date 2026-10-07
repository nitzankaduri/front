export default function LoadingSpinner({ message = 'Loading data...' }) {
  return (
    <div className="state-container loading-container">
      <div className="tachometer-spinner">
        <div className="spinner-outer-ring"></div>
        <div className="spinner-inner-disc">
          <span className="spinner-speed-text">F1</span>
        </div>
      </div>
      <p className="loading-message">{message}</p>
      <p className="loading-subtext">Connecting to Jolpica F1 API telemetry feed...</p>
    </div>
  );
}
