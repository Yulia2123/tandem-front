'use client';

import { useState } from 'react';
import styles from './SaveStory.module.css';

interface SaveStoryProps {
  storyId: string;
  initialIsSaved?: boolean;
  isLoggedIn?: boolean; // Статус авторизації
}

export default function SaveStory({
  storyId,
  initialIsSaved = false,
  isLoggedIn = false,
}: SaveStoryProps) {
  const [isSaved, setIsSaved] = useState<boolean>(initialIsSaved);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSaveClick = async () => {
    // Очищаємо попередню помилку перед новим кліком
    setErrorMessage(null);

    // 1. Якщо користувач не авторизований — відкриваємо локальну модалку
    if (!isLoggedIn) {
      setIsModalOpen(true);
      return;
    }

    setIsLoading(true);
    try {
      console.log(`Обробка історії з ID: ${storyId}`);

      // Імітація запиту до сервера (тут буде твій реальний API-запит)
      await new Promise((resolve) => setTimeout(resolve, 600));

      setIsSaved((prev) => !prev);
    } catch (error) {
      console.error('Помилка збереження історії:', error);
      // 2. Виводимо помилку локально під кнопкою замість глобальних тостів
      setErrorMessage('Не вдалося зберегти історію. Спробуйте пізніше.');
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

      {/* Локальне виведення тексту помилки, якщо запит впав */}
      {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}

      {/* Тимчасова локальна модалка для неавторизованих */}
      {isModalOpen && (
        <div
          className={styles.modalBackdrop}
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <p className={styles.modalText}>
              Будь ласка, увійдіть у свій профіль, щоб зберігати цікаві історії.
            </p>
            <button
              className={styles.modalCloseButton}
              onClick={() => setIsModalOpen(false)}
            >
              Зрозуміло
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
