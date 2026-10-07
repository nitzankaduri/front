import { useState, useEffect } from 'react';
import { fetchConstructorDetails } from '../services/f1Api';
import { getNationalityFlag, getConstructorVisuals } from '../services/flagUtils';

export default function ConstructorDetail({
  constructorItem,
  onClose,
  isFavorite,
  onToggleFavorite,
}) {
  const [detailsState, setDetailsState] = useState({
    constructorId: null,
    data: null,
    error: null,
    isLoading: true,
  });

  const [badgeFailed, setBadgeFailed] = useState(false);
  const [carFailed, setCarFailed] = useState(false);
  const [flagFailed, setFlagFailed] = useState(false);

  const { constructorId, name, nationality, url } = constructorItem;

  const initial = name.charAt(0).toUpperCase();
  const flag = getNationalityFlag(nationality);
  const visuals = getConstructorVisuals(constructorId);

  // Derive loading state if constructor changed before effect ran
  const isDifferentConstructor = detailsState.constructorId !== constructorId;
  const isLoadingDetails = isDifferentConstructor ? true : detailsState.isLoading;
  const details = isDifferentConstructor ? null : detailsState.data;
  const detailsError = isDifferentConstructor ? null : detailsState.error;

  useEffect(() => {
    let ignore = false;

    fetchConstructorDetails(constructorId)
      .then((data) => {
        if (!ignore) {
          setDetailsState({
            constructorId,
            data,
            error: null,
            isLoading: false,
          });
        }
      })
      .catch((err) => {
        if (!ignore) {
          setDetailsState({
            constructorId,
            data: null,
            error: err instanceof Error ? err.message : 'Failed to load team telemetry',
            isLoading: false,
          });
        }
      });

    return () => {
      ignore = true;
    };
  }, [constructorId]);

  // Close on Escape key
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  return (
    <aside
      className="constructor-detail-panel detail-panel-enter"
      aria-label={`Detail view for ${name}`}
      style={{ '--team-accent': visuals.color }}
    >
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
          <div className="detail-hero-row">
            <div className="detail-avatar-container">
              {visuals.badge && !badgeFailed ? (
                <img
                  src={visuals.badge}
                  alt={`${name} emblem`}
                  className="detail-brand-badge"
                  onError={() => setBadgeFailed(true)}
                />
              ) : (
                <div
                  className="team-initial-avatar detail-avatar"
                  style={{ background: `linear-gradient(135deg, ${visuals.color}, #0c0e14)` }}
                  aria-hidden="true"
                >
                  {initial}
                </div>
              )}
            </div>

            <div className="detail-title-group">
              <h2 className="detail-team-name">{name}</h2>
              <div className="detail-meta-tags">
                <span className="detail-tag nationality-tag">
                  {flag.url && !flagFailed ? (
                    <img
                      src={flag.url}
                      alt={`${flag.name} flag`}
                      className="nationality-flag-img-sm"
                      onError={() => setFlagFailed(true)}
                    />
                  ) : (
                    <span aria-hidden="true">{flag.emoji}</span>
                  )}
                  <span>{nationality}</span>
                </span>
                <span className="detail-tag id-tag">
                  ID: <code>{constructorId}</code>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Team Car Livery Hero Visual if available */}
        {visuals.car && !carFailed && (
          <div className="detail-car-visual-box">
            <img
              src={visuals.car}
              alt={`${name} Formula 1 racing car livery`}
              className="detail-car-image"
              loading="lazy"
              onError={() => setCarFailed(true)}
            />
          </div>
        )}

        {url && (
          <div className="detail-wiki-link-wrapper">
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="detail-wiki-link"
            >
              <span>📖</span> Official Wikipedia Profile
              <span className="link-arrow">↗</span>
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
              <h4 className="detail-section-title">
                <span className="section-title-accent" aria-hidden="true"></span>
                Current Season Standings
              </h4>
              {details.currentStanding ? (
                <div className="standings-stats-grid">
                  <div className="stat-card stat-position">
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

            <div className="detail-section-divider" aria-hidden="true"></div>

            {/* Drivers Section */}
            <div className="detail-section drivers-section">
              <div className="section-title-row">
                <h4 className="detail-section-title">
                  <span className="section-title-accent" aria-hidden="true"></span>
                  Notable Drivers
                </h4>
                {details.totalDrivers > 0 && (
                  <span className="drivers-count-pill">{details.totalDrivers} recorded</span>
                )}
              </div>

              {details.drivers && details.drivers.length > 0 ? (
                <ul className="drivers-list">
                  {details.drivers.map((driver) => {
                    const driverFlag = getNationalityFlag(driver.nationality);
                    return (
                      <li key={driver.driverId} className="driver-list-item">
                        <div className="driver-info">
                          <span className="driver-name">
                            {driver.givenName} <strong>{driver.familyName}</strong>
                            {driver.permanentNumber && (
                              <span className="driver-number"> #{driver.permanentNumber}</span>
                            )}
                          </span>
                          <span className="driver-nat">
                            <span className="driver-flag-emoji" aria-hidden="true">{driverFlag.emoji}</span>
                            <span>{driver.nationality}</span>
                          </span>
                        </div>
                        {driver.code && <span className="driver-code-pill">{driver.code}</span>}
                      </li>
                    );
                  })}
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
