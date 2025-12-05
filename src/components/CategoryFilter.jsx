'use client';

export default function CategoryFilter({ categories, selected, onSelect }) {
  return (
    <div className="category-filter">
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
