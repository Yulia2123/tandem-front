import css from '@/components/StoryCard/StoryCard.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { Article } from '@/types/article';
import { User } from '@/types/user';
import { getUserProfile } from '@/lib/api/users';
import { useQuery } from '@tanstack/react-query';

interface StoryListProps {
  owners: User[];
  stories?: Article[];
  onSaveStory: (storyId: string) => void;
}

function StoryCard({ owners = [], stories = [], onSaveStory }: StoryListProps) {
  return (
    <ul className={css.list}>
      {stories.map((story) => {
        const owner = owners.find(
          (o) => String(o._id) === String(story.ownerId),
        );

        return (
          <li key={story._id} className={css.item}>
            <Image src={story.img} alt={story.title} width={335} height={335} />

            {owner && (
              <div>
                <p>{owner.name}</p>
              </div>
            )}

            <span>Rating: {story.rate}</span>
            <h3>{story.title}</h3>

            <div className={css.actions}>
              <Link href={`/stories/${story._id}`} className={css.detailsLink}>
                Детальніше
              </Link>

              <button
                type="button"
                onClick={() => onSaveStory(story._id)}
                className={css.saveBtn}
              >
                Зберегти
              </button>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export default StoryCard;
