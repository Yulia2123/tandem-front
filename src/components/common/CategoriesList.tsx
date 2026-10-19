'use client';

import { useCategories } from '@/lib/hooks/useCategories';

export default function CategoriesList() {
  const { data, isPending, isError } = useCategories();

  if (isPending) return <p>Завантаження категорій...</p>;
  if (isError) return <p>Не вдалося завантажити категорії.</p>;

  const categories = Array.isArray(data) ? data : (data?.categories ?? []);

  return (
    <ul>
      {categories.map((category: { _id: string; category: string }) => (
        <li key={category._id}>{category.category}</li>
      ))}
    </ul>
  );
}
