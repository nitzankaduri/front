/**
 * Header Component
 * Top navigation bar featuring Formula 1 branding, season subtitle,
 * and quick favorites indicator counter with filter click interaction.
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
            <span className="f1-stripe"></span>
            <span className="f1-badge-text">F1</span>
          </div>
          <div className="brand-titles">
            <h1 className="header-title">CONSTRUCTORS HUB</h1>
            <p className="header-subtitle">Grand Prix Racing Teams & Telemetry Explorer</p>
          </div>
        </div>

        <div className="header-meta">
          <div className="header-badge live-season">
            <span className="pulse-indicator"></span>
            <span>FIA Formula 1 World Championship</span>
          </div>
          {favoritesCount > 0 && (
            <button
              type="button"
              className={`header-badge favorites-badge interactive-badge ${showFavoritesOnly ? 'active' : ''}`}
              onClick={onToggleFavoritesFilter}
              title={showFavoritesOnly ? 'Show all constructors' : 'Filter by favorites'}
              aria-pressed={showFavoritesOnly}
            >
              <span className="star-icon">★</span>
              <span>{favoritesCount} {favoritesCount === 1 ? 'Favorite' : 'Favorites'}</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

