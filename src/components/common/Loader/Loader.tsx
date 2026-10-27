import styles from './Loader.module.css';

interface LoaderProps {
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

export default function Loader({
  size = 'medium',
  className = '',
}: LoaderProps) {
  return (
    <div
      className={`${styles.loaderWrapper} ${className}`}
      role="status"
      aria-label="Завантаження"
    >
      <span className={`${styles.spinner} ${styles[size]}`} />{' '}
    </div>
  );
}
