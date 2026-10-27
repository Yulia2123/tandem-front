'use client';

import type { Category } from '@/types/category';
import css from './CategoriesFilter.module.css';

interface CategoriesFilterProps {
  categories: Category[];
  selectedCategory: string;
  onCategoryChange: (categoryId: string) => void;
}

export default function CategoriesFilter({
  categories,
  selectedCategory,
  onCategoryChange,
}: CategoriesFilterProps) {
  return (
    <div className={css.filter}>
      <div className={css.desktopFilter}>
        <button
          type="button"
          className={`${css.button} ${
            selectedCategory === '' ? css.active : ''
          }`}
          onClick={() => onCategoryChange('')}
          aria-pressed={selectedCategory === ''}
        >
          Всі статті
        </button>

        {categories.map((item) => (
          <button
            key={item._id}
            type="button"
            className={`${css.button} ${
              selectedCategory === item._id ? css.active : ''
            }`}
            onClick={() => onCategoryChange(item._id)}
            aria-pressed={selectedCategory === item._id}
          >
            {item.category}
          </button>
        ))}
      </div>

      <div className={css.mobileFilter}>
        <label htmlFor="stories-category" className={css.label}>
          Категорії
        </label>

        <select
          id="stories-category"
          className={css.select}
          value={selectedCategory}
          onChange={(event) => onCategoryChange(event.target.value)}
        >
          <option value="">Всі статті</option>

          {categories.map((item) => (
            <option key={item._id} value={item._id}>
              {item.category}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
