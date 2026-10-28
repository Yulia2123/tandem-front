import css from '@/components/Modal/Modal.module.css';
import { createPortal } from 'react-dom';
import { useEffect, ReactNode } from 'react'; // Додали ReactNode до імпорту

interface ModalProps {
  onClose: () => void;
  isOpen: boolean;
  children?: ReactNode; // Зробили опціональним, якщо десь викликається без дітей, або обов'язковим
}

function Modal({ onClose, isOpen, children }: ModalProps) {
  // Додали children у параметри
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

          {/* Якщо ти передаєш контент через children */}
          {children}

          {/* Або якщо цей вміст поки зашит напряму, можна вивести його так: */}
          {/* <div className={css.modalContent}>...</div> */}
        </div>
      </div>
    </div>,
    document.body,
  );
}

export default Modal;
