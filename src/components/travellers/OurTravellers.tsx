'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useTravellers } from '@/lib/hooks/useTravellers';
import TravellerCard from './TravellerCard';
import styles from './OurTravellers.module.css';
import Image from 'next/image';

export default function OurTravellers() {
  const { data, isPending, isError } = useTravellers(36);
  const [startIndex, setStartIndex] = useState(0);

  const travellers = data?.pages.flatMap((page) => page.travellers) ?? [];

  const [visibleCount, setVisibleCount] = useState(3);

  useEffect(() => {
    const updateVisibleCount = () => {
      setVisibleCount(window.innerWidth >= 768 ? 4 : 3);
    };

    updateVisibleCount();

    window.addEventListener('resize', updateVisibleCount);

    return () => {
      window.removeEventListener('resize', updateVisibleCount);
    };
  }, []);

  useEffect(() => {
    const maxStartIndex = Math.max(0, travellers.length - visibleCount);

    setStartIndex((current) => Math.min(current, maxStartIndex));
  }, [travellers.length, visibleCount]);

  const maxStartIndex = Math.max(0, travellers.length - visibleCount);

  const showPrevious = () => {
    setStartIndex((current) => Math.max(0, current - 1));
  };

  const showNext = () => {
    setStartIndex((current) => Math.min(maxStartIndex, current + 1));
  };

  if (isPending) {
    return (
      <section className={styles.section}>
        <p role="status">Завантаження мандрівників...</p>
      </section>
    );
  }

  if (isError && travellers.length === 0) {
    return (
      <section className={styles.section}>
        <p role="alert">Не вдалося завантажити мандрівників.</p>
      </section>
    );
  }

  if (travellers.length === 0) {
    return null;
  }

  const visibleTravellers = travellers.slice(
    startIndex,
    startIndex + visibleCount,
  );

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>Наші мандрівники</h2>

        <ul className={styles.list}>
          {visibleTravellers.map((traveller) => (
            <TravellerCard key={traveller._id} traveller={traveller} />
          ))}
        </ul>

        <div className={styles.controls}>
          <div className={styles.arrows}>
            <button
              type="button"
              className={styles.arrow}
              onClick={showPrevious}
              disabled={startIndex === 0}
              aria-label="Попередні мандрівники"
            >
              <Image
                src="/icons/arrow-back.svg"
                alt=""
                width={24}
                height={24}
              />
            </button>

            <button
              type="button"
              className={styles.arrow}
              onClick={showNext}
              disabled={startIndex >= maxStartIndex}
              aria-label="Наступні мандрівники"
            >
              <Image
                src="/icons/arrow-right.svg"
                alt=""
                width={24}
                height={24}
              />
            </button>
          </div>
        </div>

        <Link href="/travellers" className={styles.allLink}>
          Всі мандрівники
        </Link>
      </div>
    </section>
  );
}
