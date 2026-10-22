'use client';

import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useTravellers } from '@/lib/hooks/useTravellers';
import TravellerCard from './TravellerCard';
import styles from './TravellersList.module.css';

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
    return (
      <p>Не вдалося завантажити мандрівників. Спробуй оновити сторінку.</p>
    );
  }

  const travellers = data?.pages.flatMap((page) => page.travellers) ?? [];

  if (travellers.length === 0) {
    return <p>Поки що мандрівників немає.</p>;
  }

  return (
    <section>
      <div className={styles.container}>
        <h1 className={styles.title}>Мандрівники</h1>

        <ul className={styles.list}>
          {travellers.map((traveller) => (
            <TravellerCard key={traveller._id} traveller={traveller} />
          ))}
        </ul>

        {isError && (
          <p role="alert">
            Не вдалося завантажити наступну порцію мандрівників.
          </p>
        )}

        {hasNextPage && (
          <div className={styles.loadMoreWrapper}>
            <button
              type="button"
              className={styles.loadMoreButton}
              onClick={() => fetchNextPage()}
              disabled={isFetchingNextPage}
            >
              {isFetchingNextPage ? (
                'Завантаження...'
              ) : (
                <span className={styles.loadMoreButtonText}>Показати ще</span>
              )}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
