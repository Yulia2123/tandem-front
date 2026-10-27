'use client';

import { createPortal } from 'react-dom';
import { useEffect } from 'react';
import styles from './ActionModal.module.css';

interface ActionModalProps {
  onClose: () => void;
  onConfirm?: () => void | Promise<void>;
  isSubmitting?: boolean;
}

export default function ActionModal({
  onClose,
  onConfirm,
  isSubmitting = false,
}: ActionModalProps) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && !isSubmitting) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isSubmitting, onClose]);

  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget && !isSubmitting) {
      onClose();
    }
  };

  const modal = (
    <div
      className={styles.backdrop}
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="logout-modal-title"
      aria-describedby="logout-modal-description"
    >
      <section className={styles.modal}>
        <button
          className={styles.closeButton}
          type="button"
          onClick={onClose}
          disabled={isSubmitting}
          aria-label="Закрити вікно"
        >
          <svg width="24" height="24" aria-hidden="true">
            <use href="/sprite.svg#close" />
          </svg>
        </button>

        <div className={styles.content}>
          <h2 id="logout-modal-title" className={styles.title}>
            Ви точно хочете вийти?
          </h2>
          <p id="logout-modal-description" className={styles.description}>
            Ми будемо сумувати за вами!
          </p>
        </div>

        <div className={styles.actions}>
          <button
            className={styles.secondaryButton}
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
          >
            Відмінити
          </button>
          <button
            className={styles.primaryButton}
            type="button"
            onClick={onConfirm}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Вихід…' : 'Вийти'}
          </button>
        </div>
      </section>
    </div>
  );

  return createPortal(modal, document.body);
}
