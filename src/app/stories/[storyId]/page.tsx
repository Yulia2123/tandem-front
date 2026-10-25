import Header from '@/components/layout/Header/Header';
import Footer from '@/components/layout/Footer/Footer';
import { getStoryById, getUserById } from '@/lib/api/api';
import { Story } from '@/types/story';
import StoryDetails from './components/StoryDetails/StoryDetails';
import SaveStory from './components/SaveStory/SaveStory';
//import RecomendedStories from './components/RecomendedStories/RecomendedStories';

interface StoryPageProps {
  params: Promise<{
    storyId: string;
  }>;
}

export default async function StoryPage({ params }: StoryPageProps) {
  const { storyId } = await params;
  let story: Story | null = null;
  let authorName: string = 'Анастасія Олійник';

  try {
    story = await getStoryById(storyId);

    if (story?.ownerId) {
      try {
        const user = await getUserById(story.ownerId);
        if (user && user.name) {
          authorName = user.name;
        }
      } catch (userError) {
        console.error('Не вдалося завантажити автора:', userError);
      }
    }
  } catch (error: unknown) {
    console.error('Помилка завантаження історії:', error);
  }

  // Якщо дані відсутні в БД — виводимо текст згідно з ТЗ
  if (!story) {
    return (
      <>
        <Header />
        <main
          className="main section container"
          style={{ minHeight: '60vh', textAlign: 'center' }}
        >
          <p style={{ fontSize: '20px', color: '#4b5563' }}>
            Така історія відсутня
          </p>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      {/* Використовуємо глобальні класи container та section для правильної сітки */}
      <main className="main section container">
        {/* Компонент детальної інформації про історію */}
        <StoryDetails story={story} authorName={authorName} />

        {/* Блок збереження історії */}
        <SaveStory storyId={storyId} />

        {/* Блок рекомендованих історій */}
        {/* <RecomendedStories /> */}
      </main>
      <Footer />
    </>
  );
}
