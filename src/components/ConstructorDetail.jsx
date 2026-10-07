import { useState, useEffect } from 'react';
import { fetchConstructorDetails } from '../services/f1Api';

export default function ConstructorDetail({
  constructorItem,
  onClose,
  isFavorite,
  onToggleFavorite,
}) {
  const [details, setDetails] = useState(null);
  const [isLoadingDetails, setIsLoadingDetails] = useState(true);
  const [detailsError, setDetailsError] = useState(null);

  const { constructorId, name, nationality, url } = constructorItem;

  useEffect(() => {
    let ignore = false;
    setIsLoadingDetails(true);
    setDetailsError(null);

    fetchConstructorDetails(constructorId)
      .then((data) => {
        if (!ignore) {
          setDetails(data);
        }
      })
      .catch((err) => {
        if (!ignore) {
          setDetailsError(err instanceof Error ? err.message : 'Failed to load team telemetry');
        }
      })
      .finally(() => {
        if (!ignore) {
          setIsLoadingDetails(false);
        }
      });

    return () => {
      ignore = true;
    };
  }, [constructorId]);

  return (
    <aside className="constructor-detail-panel" aria-label={`Detail view for ${name}`}>
      <div className="detail-header-card">
        <div className="detail-top-bar">
          <span className="detail-badge">Constructor Telemetry</span>
          <div className="detail-actions">
            <button
              type="button"
              className={`detail-fav-btn ${isFavorite ? 'favorited' : ''}`}
              onClick={() => onToggleFavorite(constructorId)}
              title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
              aria-label={isFavorite ? `Remove ${name} from favorites` : `Add ${name} to favorites`}
            >
              {isFavorite ? '★ Favorited' : '☆ Favorite'}
            </button>
            <button
              type="button"
              className="detail-close-btn"
              onClick={onClose}
              aria-label="Close detail view"
              title="Close (Esc)"
            >
              ✕
            </button>
          </div>
        </div>

        <div className="detail-headline">
          <h2 className="detail-team-name">{name}</h2>
          <div className="detail-meta-tags">
            <span className="detail-tag nationality-tag">
              <span aria-hidden="true">🏳️</span> {nationality}
            </span>
            <span className="detail-tag id-tag">
              ID: <code>{constructorId}</code>
            </span>
          </div>
        </div>

        {url && (
          <div className="detail-wiki-link-wrapper">
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="detail-wiki-link"
            >
              Official Wikipedia Profile ↗
            </a>
          </div>
        )}
      </div>

      <div className="detail-content-body">
        {isLoadingDetails && (
          <div className="detail-loading-state">
            <div className="detail-mini-spinner"></div>
            <p>Fetching active drivers and current standings...</p>
          </div>
        )}

        {!isLoadingDetails && detailsError && (
          <div className="detail-error-box">
            <p className="detail-error-text">⚠️ {detailsError}</p>
          </div>
        )}

        {!isLoadingDetails && !detailsError && details && (
          <>
            {/* Season Standings Section */}
            <div className="detail-section standings-section">
              <h4 className="detail-section-title">Current Season Standings</h4>
              {details.currentStanding ? (
                <div className="standings-stats-grid">
                  <div className="stat-card">
                    <span className="stat-label">Position</span>
                    <span className="stat-value highlight-pos">P{details.currentStanding.position}</span>
                  </div>
                  <div className="stat-card">
                    <span className="stat-label">Points</span>
                    <span className="stat-value">{details.currentStanding.points}</span>
                  </div>
                  <div className="stat-card">
                    <span className="stat-label">Wins</span>
                    <span className="stat-value">{details.currentStanding.wins}</span>
                  </div>
                  <div className="stat-card">
                    <span className="stat-label">Season</span>
                    <span className="stat-value">{details.currentStanding.season}</span>
                  </div>
                </div>
              ) : (
                <p className="no-standings-notice">
                  Historical constructor — not actively competing in the current season standings.
                </p>
              )}
            </div>

            {/* Drivers Section */}
            <div className="detail-section drivers-section">
              <div className="section-title-row">
                <h4 className="detail-section-title">Notable Drivers</h4>
                {details.totalDrivers > 0 && (
                  <span className="drivers-count-pill">{details.totalDrivers} recorded</span>
                )}
              </div>

              {details.drivers && details.drivers.length > 0 ? (
                <ul className="drivers-list">
                  {details.drivers.map((driver) => (
                    <li key={driver.driverId} className="driver-list-item">
                      <div className="driver-info">
                        <span className="driver-name">
                          {driver.givenName} {driver.familyName}
                          {driver.permanentNumber && (
                            <span className="driver-number"> #{driver.permanentNumber}</span>
                          )}
                        </span>
                        <span className="driver-nat">{driver.nationality}</span>
                      </div>
                      {driver.code && <span className="driver-code-pill">{driver.code}</span>}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="no-drivers-notice">No historic driver records found for this team.</p>
              )}
            </div>
          </>
        )}
      </div>
    </aside>
  );
}
