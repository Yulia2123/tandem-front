
import Header from '@/components/layout/Header/Header';
import Footer from '@/components/layout/Footer/Footer';
import PageTitle from '@/components/common/PageTitle/PageTitle';
import AddStoryForm from '@/components/AddStoryForm/AddStoryForm';

import styles from '../new-story/page.module.css';

// Тимчасова сторінка для перевірки дизайну.
// Перед здачею задачі її потрібно видалити.
export default function StoryPreviewPage() {
  return (
    <>
      <Header />

      <main className={styles.page}>
        <div className={styles.content}>
          <div className={styles.title}>
            <PageTitle>Створити нову історію</PageTitle>
          </div>

          <AddStoryForm />
        </div>
      </main>

      <Footer />
    </>
  );
}
