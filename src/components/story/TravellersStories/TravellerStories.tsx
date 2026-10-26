'use client';

import { useStories } from '@/lib/hooks/useStories';
import StoryCard from '@/components/StoryCard/StoryCard';
import MessageNoStories from '@/components/travellers/MessageNoStories/MessageNoStories';
import styles from './TravellerStories.module.css';
import { User } from '@/types/user';

interface TravellerStoriesProps {
  travellerId: string;
  //   traveller: User;
}

export default function TravellerStories({
  travellerId,
  //   traveller,
}: TravellerStoriesProps) {
  const { data, isLoading, isError } = useStories({
    page: 1,
    perPage: 10,
    ownerId: travellerId,
  });

  //   тимчасовий варік
  if (isLoading) {
    return <p>Завантаження історій...</p>;
  }

  if (isError) {
    return <p>Не вдалося завантажити історії мандрівника.</p>;
  }

  const stories = data?.stories ?? [];

  if (stories.length === 0) {
    return <MessageNoStories />;
  }

  return (
    <div className={styles.storiesList}>
      <StoryCard
        stories={stories}
        //   owners={[traveller]}
        isSavedStoryIds={[]}
        isLoading={false}
        //   тимчасово
        onSaveStory={() => {}}
        className={styles.storiesList}
      />
    </div>
  );
}
