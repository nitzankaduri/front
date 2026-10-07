import { useState } from 'react';
import { getNationalityFlag, getConstructorVisuals } from '../services/flagUtils';

export default function ConstructorCard({
  constructorItem,
  isSelected,
  onSelect,
  isFavorite,
  onToggleFavorite,
}) {
  const { constructorId, name, nationality } = constructorItem;

  const [imgFailed, setImgFailed] = useState(false);
  const [flagFailed, setFlagFailed] = useState(false);

  const initial = name.charAt(0).toUpperCase();
  const teamAbbr = constructorId.substring(0, 3).toUpperCase();
  const flag = getNationalityFlag(nationality);
  const visuals = getConstructorVisuals(constructorId);

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    if (onToggleFavorite) {
      onToggleFavorite(constructorId);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onSelect(constructorItem);
    }
  };

  return (
    <article
      className={`constructor-card ${isSelected ? 'selected' : ''}`}
      onClick={() => onSelect(constructorItem)}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-pressed={isSelected}
      aria-label={`View details for ${name}`}
      style={{ '--team-accent': visuals.color }}
    >
      <div className="card-top-row">
        <span className="team-code">#{teamAbbr}</span>
        <button
          type="button"
          className={`card-favorite-btn ${isFavorite ? 'favorited' : ''}`}
          onClick={handleFavoriteClick}
          aria-label={isFavorite ? `Remove ${name} from favorites` : `Add ${name} to favorites`}
          title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          {isFavorite ? '★' : '☆'}
        </button>
      </div>

      <div className="card-body">
        <div className="team-avatar-container">
          {visuals.badge && !imgFailed ? (
            <img
              src={visuals.badge}
              alt={`${name} emblem`}
              className="team-brand-badge"
              loading="lazy"
              onError={() => setImgFailed(true)}
            />
          ) : (
            <div
              className="team-initial-avatar"
              style={{ background: `linear-gradient(135deg, ${visuals.color}, #121622)` }}
              aria-hidden="true"
            >
              {initial}
            </div>
          )}
        </div>

        <div className="card-body-text">
          <h3 className="team-name" title={name}>{name}</h3>
          <div className="team-nationality-tag">
            {flag.url && !flagFailed ? (
              <img
                src={flag.url}
                alt={`${flag.name} flag`}
                className="nationality-flag-img"
                loading="lazy"
                onError={() => setFlagFailed(true)}
              />
            ) : (
              <span className="flag-icon" aria-hidden="true">{flag.emoji}</span>
            )}
            <span>{nationality}</span>
          </div>
        </div>
      </div>

      <div className="card-footer">
        <span className="view-detail-hint">
          {isSelected ? 'Viewing telemetry' : 'View telemetry'}
          <span className="hint-arrow" aria-hidden="true"> →</span>
        </span>
      </div>

      <div className="card-glow-line" aria-hidden="true"></div>
    </article>
  );
}
