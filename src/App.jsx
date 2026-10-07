import { useState, useEffect } from 'react';
import Header from './components/Header';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import ConstructorList from './components/ConstructorList';
import ConstructorDetail from './components/ConstructorDetail';
import { fetchConstructors } from './services/f1Api';

export default function App() {
  const [constructors, setConstructors] = useState([]);
  const [selectedConstructor, setSelectedConstructor] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
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
        // Fallback for private browsing
      }
      return updated;
    });
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
          // Set first constructor as default selection on desktop
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

  return (
    <div className="f1-app">
      <Header favoritesCount={favorites.length} />

      <main className="f1-main-content">
        {isLoading && <LoadingSpinner message="Loading Formula 1 constructors..." />}

        {!isLoading && error && (
          <ErrorMessage error={error} onRetry={loadConstructors} />
        )}

        {!isLoading && !error && (
          <section className="master-content-section">
            <div className="status-banner">
              <span className="telemetry-dot"></span>
              <span>Loaded {constructors.length} Formula 1 Constructors from Jolpica API</span>
            </div>

            <div className={`master-detail-layout ${selectedConstructor ? 'has-detail' : ''}`}>
              <div className="master-column">
                <ConstructorList
                  constructors={constructors}
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
          </section>
        )}
      </main>
    </div>
  );
}


