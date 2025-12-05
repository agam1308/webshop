'use client';

export default function CategoryFilter({ categories, selected, onSelect }) {
  return (
    <div style={{
      display: 'flex',
      gap: 'var(--spacing-sm)',
      flexWrap: 'wrap',
      marginBottom: 'var(--spacing-xl)'
    }}>
      <button
        onClick={() => onSelect('all')}
        className={selected === 'all' ? 'btn btn-primary' : 'btn btn-outline'}
      >
        All Products
      </button>
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onSelect(category.slug)}
          className={selected === category.slug ? 'btn btn-primary' : 'btn btn-outline'}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
}
