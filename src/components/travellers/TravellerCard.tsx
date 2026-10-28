import Image from 'next/image';
import Link from 'next/link';
import type { Traveller } from '@/lib/api/travellers';
import styles from './TravellerCard.module.css';

interface TravellerCardProps {
  traveller: Traveller;
}

export default function TravellerCard({ traveller }: TravellerCardProps) {
  return (
    <li className={styles.card}>
      {traveller.avatarUrl ? (
        <Image
          className={styles.photo}
          src={traveller.avatarUrl}
          alt={`Фото мандрівника ${traveller.name}`}
          width={130}
          height={130}
          unoptimized
        />
      ) : (
        <div
          className={`${styles.photo} ${styles.photoPlaceholder}`}
          aria-hidden="true"
        >
          {traveller.name.charAt(0).toUpperCase()}
        </div>
      )}
      <div className={styles.info}>
        <h2 className={styles.name}>{traveller.name}</h2>

        <p className={styles.articles}>Статей: {traveller.articlesAmount}</p>
      </div>

      <Link
        href={`/travellers/${traveller._id}`}
        className={styles.profileLink}
      >
        <span className={styles.profileLinkText}>Переглянути профіль</span>
      </Link>
    </li>
  );
}
