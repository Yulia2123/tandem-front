import css from '@/components/Modal/Modal.module.css';
import { createPortal } from 'react-dom';
import { useEffect } from 'react';
import Link from 'next/link';

interface ModalProps {
  onClose: () => void;
  isOpen: boolean;
}

function Modal({ onClose, isOpen }: ModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <div
      className={`${css.backdrop}`}
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
    >
      <div className={css.container}>
        <div className={`${css.modal}`}>
          <button
            className={css.closeButton}
            onClick={onClose}
            aria-label="Close modal"
          >
            <svg className={css.closeIcon}>
              <use href="/sprite.svg#close" />
            </svg>
          </button>

          {/* Вміст модалки згідно з твоїм макетом */}
          <div className={css.modalContent}>
            <h3 className={css.title}>Помилка під час збереження</h3>
            <p className={css.description}>
              Щоб зберегти статтю вам треба увійти, якщо ще немає облікового
              запису зареєструйтесь
            </p>
            <div className={css.buttonsWrapper}>
              <Link
                href="/auth/login"
                className={css.loginButton}
                onClick={onClose}
              >
                Увійти
              </Link>
              <Link
                href="/auth/register"
                className={css.registerButton}
                onClick={onClose}
              >
                Зареєструватись
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}

export default Modal;
