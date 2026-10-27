'use client';

import { useState, useEffect } from 'react';
import Loader from '@/components/common/Loader/Loader';
import Modal from '@/components/Modal/Modal';
import { useSaveFavoriteStory } from '@/lib/hooks/useSaveFavoriteStory';
import { useDeleteFavoriteStory } from '@/lib/hooks/useDeleteFavoriteStory';
import { useGetSavedStories } from '@/lib/hooks/useGetSavedStories';
import styles from './SaveStory.module.css';

interface SaveStoryProps {
  storyId: string;
  isLoggedIn?: boolean;
}

export default function SaveStory({
  storyId,
  isLoggedIn = false,
}: SaveStoryProps) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { savedStories } = useGetSavedStories();

  const isAlreadySaved = Array.isArray(savedStories)
    ? savedStories.some(
        (story: { _id?: string; id?: string }) =>
          story._id === storyId || story.id === storyId,
      )
    : false;

  const [isSaved, setIsSaved] = useState<boolean>(isAlreadySaved);

  useEffect(() => {
    setIsSaved(isAlreadySaved);
  }, [isAlreadySaved]);

  const { saveStory, isLoading: isSaving } = useSaveFavoriteStory();
  const { removeSavedStory, isLoading: isDeleting } = useDeleteFavoriteStory();

  const isLoading = isSaving || isDeleting;

  const handleSaveClick = async () => {
    setErrorMessage(null);

    if (!isLoggedIn) {
      setIsModalOpen(true);
      return;
    }

    try {
      if (isSaved) {
        await removeSavedStory(storyId);
      } else {
        await saveStory(storyId);
      }
      setIsSaved((prev) => !prev);
    } catch {
      setErrorMessage(
        'Не вдалося оновити статус збереження. Спробуйте пізніше.',
      );
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
        {isLoading ? (
          <Loader size="small" />
        ) : isSaved ? (
          'Видалити зі збережених'
        ) : (
          'Зберегти'
        )}
      </button>

      {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}

      {/* Використовуємо глобальний компонент Modal */}
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <div className={styles.modalContentInner}>
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
        </Modal>
      )}
    </div>
  );
}
