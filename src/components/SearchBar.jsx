export default function SearchBar({
  searchTerm,
  onSearchChange,
  selectedNationality,
  onNationalityChange,
  nationalities = [],
  showFavoritesOnly,
  onToggleShowFavoritesOnly,
  favoritesCount = 0,
  onClearFilters,
}) {
  const hasActiveFilters = Boolean(searchTerm || selectedNationality || showFavoritesOnly);

  return (
    <div className="search-filter-bar" role="search" aria-label="Search and filter constructors">
      <div className="search-input-wrapper">
        <span className="search-icon" aria-hidden="true">🔍</span>
        <input
          type="text"
          className="search-input"
          placeholder="Search constructor by name..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          aria-label="Search constructors by name"
        />
        {searchTerm && (
          <button
            type="button"
            className="clear-input-btn"
            onClick={() => onSearchChange('')}
            aria-label="Clear search text"
            title="Clear text"
          >
            ✕
          </button>
        )}
      </div>

      <div className="filters-group">
        <div className="select-wrapper">
          <select
            className="nationality-select"
            value={selectedNationality}
            onChange={(e) => onNationalityChange(e.target.value)}
            aria-label="Filter by nationality"
          >
            <option value="">All Nationalities ({nationalities.length})</option>
            {nationalities.map((nat) => (
              <option key={nat} value={nat}>
                {nat}
              </option>
            ))}
          </select>
        </div>

        <button
          type="button"
          className={`filter-fav-toggle ${showFavoritesOnly ? 'active' : ''}`}
          onClick={onToggleShowFavoritesOnly}
          aria-pressed={showFavoritesOnly}
          title="Toggle display of favorite constructors"
        >
          <span>★</span>
          <span>Favorites Only ({favoritesCount})</span>
        </button>

        {hasActiveFilters && (
          <button
            type="button"
            className="reset-filters-btn"
            onClick={onClearFilters}
            title="Reset all search filters"
          >
            Reset Filters
          </button>
        )}
      </div>
    </div>
  );
}
