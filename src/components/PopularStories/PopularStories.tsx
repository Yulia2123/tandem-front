'use-client';

import css from '@/components/PopularStories/PopularStories.module.css';
import StoryCard from '@/components/StoryCard/StoryCard';
import { getStories } from '@/lib/api/stories';
import { GetStoriesParams } from '@/lib/api/stories';
import { useState, useEffect } from 'react';
import { useQuery, keepPreviousData } from '@tanstack/react-query';

function PopularStories() {
  const users = async () => {
    const res = await fetch('/api/users');
    return res;
  };
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(3);

  useEffect(() => {
    const updatePerPage = () => {
      const width = window.innerWidth;
      if (width >= 1440) {
        setPerPage(3);
      } else if (width >= 768) {
        setPerPage(2);
      } else {
        setPerPage(1);
      }
    };

    updatePerPage();
    window.addEventListener('resize', updatePerPage);
    return () => window.removeEventListener('resize', updatePerPage);
  }, []);

  const {
    data: storiesData,
    isSuccess,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['stories', currentPage, perPage],
    queryFn: () =>
      getStories({
        page: currentPage,
        perPage: perPage,
        popular: 'asc',
      }),
    placeholderData: keepPreviousData,
  });

  const handleSaveStory = (storyId: string) => {
    console.log('Save story:', storyId);
  };

  if (isLoading) return <p>Завантаження історій...</p>;
  if (isError) return <p>Помилка завантаження.</p>;

  return (
    <>
      <section className={css.section}>
        <div className={`${css.container} container`}>
          <h2>Популярні статті</h2>
          <ul className={css.list}>
            {storiesData?.stories?.map((story) => (
              <StoryCard
                key={story._id}
                story={story}
                onSaveStory={handleSaveStory}
              />
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}

export default PopularStories;
