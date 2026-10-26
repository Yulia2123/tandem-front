'use client';

import { useCategories } from '@/lib/hooks/useCategories';
import Loader from '@/components/common/Loader/Loader';

export default function CategoriesList() {
  const { data, isPending, isError } = useCategories();

  if (isPending) return <Loader size="medium" />;
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
