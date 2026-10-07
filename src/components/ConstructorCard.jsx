export default function ConstructorCard({
  constructorItem,
  isSelected,
  onSelect,
  isFavorite,
  onToggleFavorite,
}) {
  const { constructorId, name, nationality } = constructorItem;

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
    >
      <div className="card-top-row">
        <span className="team-code">#{constructorId.substring(0, 3).toUpperCase()}</span>
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
        <h3 className="team-name">{name}</h3>
        <div className="team-nationality-tag">
          <span className="flag-icon" aria-hidden="true">🏁</span>
          <span>{nationality}</span>
        </div>
      </div>

      <div className="card-footer">
        <span className="view-detail-hint">
          {isSelected ? 'Viewing telemetry →' : 'View telemetry →'}
        </span>
      </div>
    </article>
  );
}

