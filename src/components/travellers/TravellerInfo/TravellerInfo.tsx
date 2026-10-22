import type { ReactNode } from 'react';
import styles from './TravellerInfo.module.css';
import { Avatar } from '@/components/travellers/Avatar/Avatar';

type Props = {
  name: string;
  avatar: string;
  storiesCount: number;
  children?: ReactNode;
  variant?: 'card' | 'profile';
  isPriority?: boolean;
};

export default function TravellerInfo({
  name,
  avatar,
  storiesCount,
  children,
  variant = 'profile',
  isPriority = false,
}: Props) {
  return (
    <div className={`${styles.wrapper} ${styles[variant]}`}>
      <div className={styles.avatarWrapper}>
        <Avatar
          src={avatar}
          alt={name}
          size={130}
          className={styles.avatar}
          isPriority={isPriority}
        />
      </div>

      <div className={styles.content}>
        <div className={styles.title}>
            <h3 className={styles.name}>{name}</h3>
        </div>
        <p className={styles.meta}>Статей: {storiesCount}</p>
      </div>

      <div className={styles.actions}>{children}</div>
    </div>
  );
}