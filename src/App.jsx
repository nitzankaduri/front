import { useState, useEffect, useMemo } from 'react';
import Header from './components/Header';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import ConstructorList from './components/ConstructorList';
import ConstructorDetail from './components/ConstructorDetail';
import SearchBar from './components/SearchBar';
import EmptyState from './components/EmptyState';
import { fetchConstructors } from './services/f1Api';

export default function App() {
  const [constructors, setConstructors] = useState([]);
  const [selectedConstructor, setSelectedConstructor] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Search & Filter State
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedNationality, setSelectedNationality] = useState('');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  // Favorites State (persisted in localStorage)
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem('f1_favorite_constructors');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const handleToggleFavorite = (constructorId) => {
    setFavorites((prev) => {
      const updated = prev.includes(constructorId)
        ? prev.filter((id) => id !== constructorId)
        : [...prev, constructorId];
      try {
        localStorage.setItem('f1_favorite_constructors', JSON.stringify(updated));
      } catch {
        // Fallback
      }
      return updated;
    });
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedNationality('');
    setShowFavoritesOnly(false);
  };

  const loadConstructors = () => {
    setIsLoading(true);
    setError(null);

    fetchConstructors(45)
      .then((data) => {
        setConstructors(data);
      })
      .catch((err) => {
        setError(err instanceof Error ? err : new Error('Network or API failure'));
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    let ignore = false;
    fetchConstructors(45)
      .then((data) => {
        if (!ignore) {
          setConstructors(data);
          if (data && data.length > 0 && window.innerWidth >= 1024) {
            setSelectedConstructor(data[0]);
          }
        }
      })
      .catch((err) => {
        if (!ignore) setError(err instanceof Error ? err : new Error('Network or API failure'));
      })
      .finally(() => {
        if (!ignore) setIsLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, []);

  // Compute unique nationalities sorted alphabetically
  const availableNationalities = useMemo(() => {
    const nats = new Set();
    constructors.forEach((c) => {
      if (c.nationality) nats.add(c.nationality);
    });
    return Array.from(nats).sort();
  }, [constructors]);

  // Filtered Constructors list based on search term, nationality, and favorites
  const filteredConstructors = useMemo(() => {
    return constructors.filter((item) => {
      const matchesSearch = item.name
        .toLowerCase()
        .includes(searchTerm.trim().toLowerCase());

      const matchesNationality = selectedNationality
        ? item.nationality.toLowerCase() === selectedNationality.toLowerCase()
        : true;

      const matchesFavorites = showFavoritesOnly
        ? favorites.includes(item.constructorId)
        : true;

      return matchesSearch && matchesNationality && matchesFavorites;
    });
  }, [constructors, searchTerm, selectedNationality, showFavoritesOnly, favorites]);

  return (
    <div className="f1-app">
      <Header
        favoritesCount={favorites.length}
        showFavoritesOnly={showFavoritesOnly}
        onToggleFavoritesFilter={() => setShowFavoritesOnly((prev) => !prev)}
      />

      <main className="f1-main-content">
        {isLoading && <LoadingSpinner message="Loading Formula 1 constructors..." />}

        {!isLoading && error && (
          <ErrorMessage error={error} onRetry={loadConstructors} />
        )}

        {!isLoading && !error && (
          <section className="master-content-section">
            <SearchBar
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              selectedNationality={selectedNationality}
              onNationalityChange={setSelectedNationality}
              nationalities={availableNationalities}
              showFavoritesOnly={showFavoritesOnly}
              onToggleShowFavoritesOnly={() => setShowFavoritesOnly((prev) => !prev)}
              favoritesCount={favorites.length}
              onClearFilters={handleClearFilters}
            />

            <div className="status-banner">
              <span className="telemetry-dot"></span>
              <span>
                Showing {filteredConstructors.length} of {constructors.length} Constructors
                {showFavoritesOnly && ' (Favorites filter active)'}
                {selectedNationality && ` · Nationality: ${selectedNationality}`}
              </span>
            </div>

            {filteredConstructors.length === 0 ? (
              <EmptyState
                title="No constructors match your criteria"
                message={
                  showFavoritesOnly && favorites.length === 0
                    ? 'You have not marked any constructors as favorite yet. Click the star icon on any card to add them.'
                    : 'No Formula 1 constructors matched the search filters. Try clearing or relaxing your parameters.'
                }
                onReset={handleClearFilters}
              />
            ) : (
              <div className={`master-detail-layout ${selectedConstructor ? 'has-detail' : ''}`}>
                <div className="master-column">
                  <ConstructorList
                    constructors={filteredConstructors}
                    selectedConstructor={selectedConstructor}
                    onSelectConstructor={setSelectedConstructor}
                    favorites={favorites}
                    onToggleFavorite={handleToggleFavorite}
                  />
                </div>

                {selectedConstructor && (
                  <div className="detail-column">
                    <ConstructorDetail
                      constructorItem={selectedConstructor}
                      onClose={() => setSelectedConstructor(null)}
                      isFavorite={favorites.includes(selectedConstructor.constructorId)}
                      onToggleFavorite={handleToggleFavorite}
                    />
                  </div>
                )}
              </div>
            )}
          </section>
        )}
      </main>
    </div>
  );
}



