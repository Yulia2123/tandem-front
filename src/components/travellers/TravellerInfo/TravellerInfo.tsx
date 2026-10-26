
import Image from 'next/image';
import type { User } from '@/types/user';
import styles from './TravellerInfo.module.css';

interface TravellerInfoProps {
  user: User;
}

export default function TravellerInfo({ user }: TravellerInfoProps) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.avatarWrapper}>
        {user.avatar ? (
          <Image
            className={styles.avatar}
            src={user.avatar}
            alt={`Аватар ${user.name}`}
            width={96}
            height={96}
          />
        ) : (
          <div className={styles.avatarPlaceholder} aria-hidden="true">
            {user.name.charAt(0).toUpperCase()}
          </div>
        )}
      </div>

      <div className={styles.details}>
        <h1 className={styles.name}>{user.name}</h1>
        <p className={styles.articles}>
          Мої історії: {user.articlesAmount ?? 0}
        </p>
      </div>
    </div>
  );
}
