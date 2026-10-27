import Image from 'next/image';
import type { User } from '@/types/user';
import styles from './TravellerInfo.module.css';

interface TravellerInfoProps {
  user: User;
  variant?: 'card' | 'profile';
  isPriority?: boolean;
  className?: string;
}

export default function TravellerInfo({
  user,
  variant = 'profile',
  isPriority = false,
  className = '',
}: TravellerInfoProps) {
  return (
    <div className={`${styles.wrapper} ${styles[variant]} ${className}`}>
      <div className={styles.avatarWrapper}>
        {user.avatar ? (
          <Image
            className={styles.avatar}
            src={user.avatar}
            alt={`Аватар ${user.name}`}
            width={96}
            height={96}
            priority={isPriority}
          />
        ) : (
          <div className={styles.avatarPlaceholder} aria-hidden="true">
            {user.name.charAt(0).toUpperCase()}
          </div>
        )}
      </div>

      <div className={styles.content}>
        <div className={styles.title}>
          <h1 className={styles.name}>{user.name}</h1>
        </div>
        <p className={styles.meta}>
          Мої історії: {user.articlesAmount ?? 0}
        </p>
      </div>
    </div>
  );
}