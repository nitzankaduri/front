/**
 * Header Component
 * Premium F1-branded navigation bar with racing aesthetics,
 * live season indicator, and interactive favorites counter.
 */
export default function Header({
  favoritesCount = 0,
  showFavoritesOnly = false,
  onToggleFavoritesFilter,
}) {
  return (
    <header className="f1-header">
      <div className="header-container">
        <div className="brand-group">
          <div className="f1-logo-badge" aria-label="Formula 1 Racing Badge">
            <span className="f1-stripe" aria-hidden="true"></span>
            <span className="f1-badge-text">F1</span>
          </div>
          <div className="brand-titles">
            <h1 className="header-title">Constructors Hub</h1>
            <p className="header-subtitle">Grand Prix Racing Teams & Telemetry Explorer</p>
          </div>
        </div>

        <div className="header-meta">
          <div className="header-badge live-season">
            <span className="pulse-indicator" aria-hidden="true"></span>
            <span>Live Season 2025</span>
          </div>
          {favoritesCount > 0 && (
            <button
              type="button"
              className={`header-badge favorites-badge interactive-badge ${showFavoritesOnly ? 'active' : ''}`}
              onClick={onToggleFavoritesFilter}
              title={showFavoritesOnly ? 'Show all constructors' : 'Filter by favorites'}
              aria-pressed={showFavoritesOnly}
            >
              <span className="star-icon" aria-hidden="true">★</span>
              <span>{favoritesCount} {favoritesCount === 1 ? 'Favorite' : 'Favorites'}</span>
            </button>
          )}
        </div>
      </div>
      <div className="header-racing-stripe" aria-hidden="true"></div>
    </header>
  );
}
