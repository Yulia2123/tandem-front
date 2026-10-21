import css from '@/components/StoryCard/StoryCard.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { Article } from '@/types/article';
import { getUserProfile } from '@/lib/api/users';
import { useQuery } from '@tanstack/react-query';

interface StoryListProps {
  story: Article;
  onSaveStory: (storyId: string) => void;
}

function StoryCard({ story, onSaveStory }: StoryListProps) {
  const getUserById = async (userId: string) => {
    const res = await getUserProfile(`/api/users/${userId}`);
    return res;
  };

  if (!getUserById) {
    throw new Error('Сталася помилка. Такого Мандрівника не існує');
  };

  const { data: owner } = useQuery({
    queryKey: ['user', story.ownerId],
    queryFn: () => getUserById(story.ownerId),
    enabled: !!story.ownerId,
  });
  
  return (
    <li className={css.item}>
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
}

export default StoryCard;
