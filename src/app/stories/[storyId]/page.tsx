import Header from '@/components/layout/Header/Header';
import Footer from '@/components/layout/Footer/Footer';
import { getStoryById, getUserById } from '@/lib/api/api';
import { Story } from '@/types/story';
import StoryDetails from './components/StoryDetails/StoryDetails';
import SaveStory from './components/SaveStory/SaveStory';
import RecomendedStories from './components/RecomendedStories/RecomendedStories';
import styles from './StoryPage.module.css'; // Імпортуємо наш модуль

interface StoryPageProps {
  params: Promise<{
    storyId: string;
  }>;
}

export default async function StoryPage({ params }: StoryPageProps) {
  const { storyId } = await params;
  let story: Story | null = null;
  let authorName = '';

  try {
    story = await getStoryById(storyId);

    if (story?.ownerId) {
      try {
        const ownerIdString =
          typeof story.ownerId === 'object' && story.ownerId !== null
            ? (story.ownerId as { _id?: string })._id
            : story.ownerId;

        if (ownerIdString) {
          const userData = await getUserById(ownerIdString as string);

          if (userData?.user?.name) {
            authorName = userData.user.name;
          }
        }
      } catch {}
    }
  } catch {}

  if (!story) {
    return (
      <>
        <Header />
        <main
          className={styles.pageContainer}
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

      <main className={styles.pageContainer}>
        <StoryDetails story={story} authorName={authorName} />
        <SaveStory storyId={storyId} />
        <RecomendedStories storyId={story._id} />
      </main>
      <Footer />
    </>
  );
}
