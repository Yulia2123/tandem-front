import css from '@/components/StoryCard/StoryCard.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { Article } from '@/types/article';
import { User } from '@/types/user';

import 'swiper/css';

interface StoryListProps {
  owners?: User[];
  stories?: Article[];
  isSavedStoryIds?: string[];
  isLoading: boolean;
  onSaveStory: (storyId: string) => void;
}

function StoryCard({ owners = [], stories = [], isSavedStoryIds = [], isLoading = false, onSaveStory }: StoryListProps) {
  function truncateText(text: string, maxLength: number) {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
  }

  return (
    <ul className={css.list}>
      {stories.map((story) => {
        const owner = owners.find((owner) => String(owner._id) === String(story.ownerId));
        // Перевіряємо, чи є поточна історія в масиві збережених ID
        const isSaved = isSavedStoryIds.includes(story._id);

        return (
          <li key={story._id} className={css.item}>
            <Image
              className={css.image}
              src={story.img}
              alt={story.title}
              width={340}
              height={340}
            />

            <div className={css.containerWrapper}>
              <div className={css.textGrid}>
                <p className={css.name}>{owner ? owner.name : 'Автор невідомий'}</p>
                <span className={css.rate}>{story.rate}</span>
                {/* SVG зірки */}
              </div>

              <h3 className={css.subtitle}>{truncateText(story.title, 37)}</h3>

              <div className={css.actions}>
                <Link href={`/stories/${story._id}`} className={css.detailsLink}>
                  Переглянути статтю
                </Link>

                <button
                  key={`${story._id}-${isSaved ? 'saved' : 'default'}`}
                  type="button"
                  onClick={() => onSaveStory(story._id)}
                  disabled={isLoading}
                  className={`${css.saveBtn} ${isSaved ? css.saved : ''}`}
                >
                  <svg
                    className={`${css.svgButton} ${isSaved ? css.saved : ''}`}
                    width="15"
                    height="18"
                    viewBox="0 0 15 18"
                    fill="#1b391b;"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.1495 15.448L2.381 17.488C1.81333 17.7327 1.27458 17.6867 0.76475 17.3502C0.254917 17.0137 0 16.5376 0 15.9218V1.70925C0 1.24758 0.168916 0.847332 0.50675 0.508499C0.844416 0.169499 1.24325 0 1.70325 0H12.5957C13.0574 0 13.4577 0.169499 13.7965 0.508499C14.1355 0.847332 14.305 1.24758 14.305 1.70925V15.9218C14.305 16.5376 14.0491 17.0137 13.5372 17.3502C13.0254 17.6867 12.4857 17.7327 11.918 17.488L7.1495 15.448ZM7.1495 13.6257L12.5957 15.9218V1.70925H1.70325V15.9218L7.1495 13.6257ZM7.1495 1.70925H1.70325H12.5957H7.1495Z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export default StoryCard;