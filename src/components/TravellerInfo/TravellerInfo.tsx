'use client';

import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import css from './TravellerInfo.module.css';
import { getCurrentUser } from '@/lib/api/users';

export default function TravellerInfo() {
  const { data, isError } = useQuery({
    queryKey: ['user'],
    queryFn: getCurrentUser,
  });

  if (!data || isError) {
    return (
      <p className={css.errorMessage} role="alert">
        Помилка завантаження інформації про користувача.
      </p>
    );
  }

  return (
    <div className={css.profileAbout}>
      <div className={css.profileAboutAvatar}>
        {data.avatarUrl ? (
          <Image
            src={data.avatarUrl}
            alt="Аватар користувача"
            fill
            sizes="(min-width: 768px) 145px, 113px"
            className={css.profileAboutAvatarImg}
          />
        ) : (
          <span className={css.avatarPlaceholder}>
            {data.name?.trim().charAt(0).toUpperCase() || '?'}
          </span>
        )}
      </div>

      <div className={css.profileAboutWrapper}>
        <h3 className={css.name}>{data.name}</h3>
        <p className={css.meta}>Статей: {data.articlesAmount}</p>
      </div>
    </div>
  );
}
