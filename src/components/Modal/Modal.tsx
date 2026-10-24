import css from '@/components/Modal/Modal.module.css';
import { createPortal } from 'react-dom';
import { useEffect } from 'react';

interface ModalProps {
  onClose: () => void;
  children: React.ReactNode;
}

function Modal({ onClose, children }: ModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose]);

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
      <div className={`${css.container} 'container'`}>
        <div className={`${css.modal}`}>
          <button
            className={css.closeButton}
            onClick={onClose}
            aria-label="Close modal"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              className={css.svg}
            >
              <path
                d="M6.575 7.975L1.675 12.875C1.49167 13.0583 1.25833 13.15 0.975 13.15C0.691667 13.15 0.458333 13.0583 0.275 12.875C0.0916667 12.6917 0 12.4583 0 12.175C0 11.8917 0.0916667 11.6583 0.275 11.475L5.175 6.575L0.275 1.675C0.0916667 1.49167 0 1.25833 0 0.975C0 0.691667 0.0916667 0.458333 0.275 0.275C0.458333 0.0916667 0.691667 0 0.975 0C1.25833 0 1.49167 0.0916667 1.675 0.275L6.575 5.175L11.475 0.275C11.6583 0.0916667 11.8917 0 12.175 0C12.4583 0 12.6917 0.0916667 12.875 0.275C13.0583 0.458333 13.15 0.691667 13.15 0.975C13.15 1.25833 13.0583 1.49167 12.875 1.675L7.975 6.575L12.875 11.475C13.0583 11.6583 13.15 11.8917 13.15 12.175C13.15 12.4583 13.0583 12.6917 12.875 12.875C12.6917 13.0583 12.4583 13.15 12.175 13.15C11.8917 13.15 11.6583 13.0583 11.475 12.875L6.575 7.975Z"
                stroke-width="2"
                stroke="black"
              />
            </svg>
          </button>
          {children}
        </div>
      </div>
    </div>,
    document.body,
  );
}

export default Modal;
