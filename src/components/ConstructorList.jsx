import ConstructorCard from './ConstructorCard';

export default function ConstructorList({
  constructors,
  selectedConstructor,
  onSelectConstructor,
  favorites = [],
  onToggleFavorite,
}) {
  if (!constructors || constructors.length === 0) {
    return null;
  }

  return (
    <div className="constructors-grid" role="region" aria-label="Formula 1 Constructors Grid">
      {constructors.map((item) => {
        const isSelected = selectedConstructor?.constructorId === item.constructorId;
        const isFavorite = favorites.includes(item.constructorId);

        return (
          <ConstructorCard
            key={item.constructorId}
            constructorItem={item}
            isSelected={isSelected}
            onSelect={onSelectConstructor}
            isFavorite={isFavorite}
            onToggleFavorite={onToggleFavorite}
          />
        );
      })}
    </div>
  );
}

