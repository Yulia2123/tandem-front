'use client';

import { useState } from 'react';
import { useStories } from '@/lib/hooks/useStories';
import { useCategories } from '@/lib/hooks/useCategories';
import Loader from '@/components/common/Loader/Loader';

export default function StoriesPage() {
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState('');

  const { data: categoriesData, isPending: categoriesPending } =
    useCategories();

  const { data, isPending, isFetching, isError } = useStories({
    page,
    perPage: 10,
    ...(category ? { category } : {}),
  });

  const categories = Array.isArray(categoriesData)
    ? categoriesData
    : (categoriesData?.categories ?? []);

  return (
    <main>
      <h1>Історії мандрів</h1>

      <label htmlFor="category">Категорія:</label>
      <select
        id="category"
        value={category}
        onChange={(event) => {
          setCategory(event.target.value);
          setPage(1);
        }}
        disabled={categoriesPending}
      >
        <option value="">Усі категорії</option>
        {categories.map((item: { _id: string; category: string }) => (
          <option key={item._id} value={item.category}>
            {item.category}
          </option>
        ))}
      </select>

      {isFetching && !isPending && <Loader size="medium" />}

      {isPending && <Loader size="large" />}

      {isError && <p>Не вдалося завантажити історії.</p>}

      {data && (
        <>
          {data.stories.length === 0 ? (
            <p>Поки що історій немає.</p>
          ) : (
            <ul>
              {data.stories.map((story) => (
                <li key={story._id}>
                  <h2>{story.title ?? 'Історія мандрівника'}</h2>
                  {story.article && <p>{story.article}</p>}
                </li>
              ))}
            </ul>
          )}

          <button
            type="button"
            disabled={page <= 1}
            onClick={() => setPage((current) => current - 1)}
          >
            Попередня
          </button>

          <span>
            {' '}
            Сторінка {page} з {data.totalPages}{' '}
          </span>

          <button
            type="button"
            disabled={page >= data.totalPages}
            onClick={() => setPage((current) => current + 1)}
          >
            Наступна
          </button>
        </>
      )}
    </main>
  );
}
