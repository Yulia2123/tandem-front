'use client';

import css from './TravellersStories.module.css';
import Link from 'next/link';
import Image from 'next/image';
import type { Story } from '@/types/story';
import { useProfileStore } from '@/lib/store/historyPageStore';

interface TravellersStoriesProps {
  stories?: Story[];
}

export default function TravellersStories({ stories }: TravellersStoriesProps) {
  const { currentTab } = useProfileStore();

  const isSavedTab = currentTab === 'saved-history';

  return (
    <div className={css.profileHistoryWrapper}>
      {stories && stories.length > 0 ? (
        <ul className={css.ProfileHistoryList}>
          {stories.map((story) => (
            <li className={css.ProfileHistoryItems} key={story._id}>
              <div className={css.ProfileHistoryImgWrapper}>
                <Image
                  src={story.img}
                  alt="Photo of travel."
                  fill
                  className={css.ProfileHistoryImg}
                />
              </div>

              <div className={css.ProfileHistoryItemInfo}>
                <p className={css.ProfileHistoryAutor}>
                  <span>{story.ownerId.name}</span>
                  <span>•</span>
                  <span>{story.rate}</span>
                  <svg
                    width="9.54"
                    height="11.76"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <use href="/save.svg#icon-save" />
                  </svg>
                </p>
                <p className={css.ProfileHistoryDescription}>{story.title}</p>
                <div className={css.ProfileHistoryBtnWrapper}>
                  <Link
                    href={`/stories/${story._id}`}
                    className={css.ProfileHistoryOpenTheHistory}
                  >
                    Переглянути статтю
                  </Link>
                  <button
                    type="button"
                    className={css.ProfileHistorySaveHistory}
                  >
                    <svg width="24" height="24" viewBox="0 0 27 32">
                      <use href="/save.svg#icon-save" />
                    </svg>
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className={css.emptyStateWrapper}>
          <p className={css.profileHistoryText}>
            {isSavedTab
              ? 'У вас ще немає збережених історій, мершій збережіть вашу першу історію!'
              : 'Ви ще нічого не публікували, поділіться своєю першою історією!'}
          </p>
          <Link
            href={isSavedTab ? '/stories' : '/new/story'}
            className={css.profileToHistory}
          >
            {isSavedTab ? 'До історій' : 'Опублікувати історію'}
          </Link>
        </div>
      )}
    </div>
  );
}
