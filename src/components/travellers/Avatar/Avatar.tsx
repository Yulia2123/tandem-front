import Image from 'next/image';
import styles from './Avatar.module.css';
import { Icon } from '../Icon/Icon';

interface AvatarProps {
  src?: string;
  alt?: string;
  size?: number;
  className?: string;
  isPriority?: boolean;
}
export const Avatar = ({
  src,
  alt = 'User avatar',
  size = 40,
  className = '',
  isPriority = false,
}: AvatarProps) => {
  return (
    <div className={`${styles.avatarWrapper} ${className}`}>
      {src ? (
        <Image
          src={src}
          alt={alt}
          width={size}
          height={size}
          sizes={`${size}px`}
          className={styles.avatarImage}
          {...(isPriority ? { priority: true } : { loading: 'lazy' })}
        />
      ) : (
        <Icon
          name="icon-image"
          width={size}
          height={size}
          className={styles.avatarSvg}
          aria-hidden={undefined}
          role="img"
          aria-label={alt}
        />
      )}
    </div>
  );
};