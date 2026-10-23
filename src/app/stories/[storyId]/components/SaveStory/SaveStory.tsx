'use client';

import { useState } from 'react';
import styles from './SaveStory.module.css';
// Тут у майбутньому можна підключити реальну апі-функцію, наприклад:
// import { saveStoryToProfile } from '@/lib/api/api';

interface SaveStoryProps {
  storyId: string;
}

export default function SaveStory({ storyId }: SaveStoryProps) {
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSaveClick = async () => {
    setIsLoading(true);
    try {
      // Використовуємо storyId у запиті до сервера
      console.log(`надсилаємо запит для історії з ID: ${storyId}`);

      // Імітація запиту (тут буде твій виклик API)
      await new Promise((resolve) => setTimeout(resolve, 600));

      setIsSaved((prev) => !prev);
    } catch (error) {
      console.error('Помилка збереження історії:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.saveContainer}>
      <h3 className={styles.saveTitle}>Збережіть собі історію</h3>
      <p className={styles.saveDescription}>
        Вона буде доступна у вашому профілі у розділі збережене
      </p>
      <button
        onClick={handleSaveClick}
        disabled={isLoading}
        className={styles.saveButton}
      >
        {isLoading
          ? 'Завантаження...'
          : isSaved
            ? 'Видалити зі збережених'
            : 'Зберегти'}
      </button>
    </div>
  );
}
