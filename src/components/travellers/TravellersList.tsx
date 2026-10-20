'use client';

import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useTravellers } from '@/lib/hooks/useTravellers';
import TravellerCard from './TravellerCard';

export default function TravellersList() {
  const {
    data,
    isPending,
    isError,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useTravellers();

  useEffect(() => {
    if (isError) {
      toast.error('Не вдалося завантажити мандрівників');
    }
  }, [isError]);

  if (isPending) {
    return <p role="status">Завантаження мандрівників...</p>;
  }

  if (isError && !data) {
    return <p>Не вдалося завантажити мандрівників. Спробуй оновити сторінку.</p>;
  }

  const travellers = data?.pages.flatMap(
    (page) => page.travellers,
  ) ?? [];

  if (travellers.length === 0) {
    return <p>Поки що мандрівників немає.</p>;
  }

  return (
    <section>
      <ul>
        {travellers.map((traveller) => (
          <TravellerCard
            key={traveller._id}
            traveller={traveller}
          />
        ))}
      </ul>

      {isError && (
        <p role="alert">
          Не вдалося завантажити наступну порцію мандрівників.
        </p>
      )}

      {hasNextPage && (
        <button
          type="button"
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}
        >
          {isFetchingNextPage
            ? 'Завантаження...'
            : 'Завантажити ще'}
        </button>
      )}
    </section>
  );
}