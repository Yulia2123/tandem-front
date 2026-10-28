'use client';

import css from './TravellersStories.module.css';
import Link from 'next/link';
import Image from 'next/image';
import { Story } from '@/lib/api/stories';
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
            <li className={css.ProfileHistoryItems} key={story._id as string}>
              <div className={css.ProfileHistoryImgWrapper}>
                <Image
                  src={story.img as string}
                  alt="Photo of travel."
                  fill
                  className={css.ProfileHistoryImg}
                />
              </div>

              <div className={css.ProfileHistoryItemInfo}>
                <p className={css.ProfileHistoryAutor}>
                  <span>{story.ownerId as string}</span>
                  <span>•</span>
                  <span>{story.rate}</span>
                  <svg
                    width="10"
                    height="12"
                    viewBox="0 0 10 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M4.76633 10.2987L1.58733 11.6587C1.20889 11.8218 0.849722 11.7912 0.509833 11.5668C0.169944 11.3425 0 11.0251 0 10.6145V1.1395C0 0.831722 0.112611 0.564888 0.337833 0.338999C0.562944 0.112999 0.828833 0 1.1355 0H8.39717C8.70494 0 8.97178 0.112999 9.19767 0.338999C9.42367 0.564888 9.53667 0.831722 9.53667 1.1395V10.6145C9.53667 11.0251 9.36606 11.3425 9.02483 11.5668C8.68361 11.7912 8.32378 11.8218 7.94533 11.6587L4.76633 10.2987ZM4.76633 9.08383L8.39717 10.6145V1.1395H1.1355V10.6145L4.76633 9.08383ZM4.76633 1.1395H1.1355H8.39717H4.76633Z" />
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
                    <svg
                      width="10"
                      height="12"
                      viewBox="0 0 10 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M4.76633 10.2987L1.58733 11.6587C1.20889 11.8218 0.849722 11.7912 0.509833 11.5668C0.169944 11.3425 0 11.0251 0 10.6145V1.1395C0 0.831722 0.112611 0.564888 0.337833 0.338999C0.562944 0.112999 0.828833 0 1.1355 0H8.39717C8.70494 0 8.97178 0.112999 9.19767 0.338999C9.42367 0.564888 9.53667 0.831722 9.53667 1.1395V10.6145C9.53667 11.0251 9.36606 11.3425 9.02483 11.5668C8.68361 11.7912 8.32378 11.8218 7.94533 11.6587L4.76633 10.2987ZM4.76633 9.08383L8.39717 10.6145V1.1395H1.1355V10.6145L4.76633 9.08383ZM4.76633 1.1395H1.1355H8.39717H4.76633Z" />
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
