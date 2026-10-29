'use client';

import Link, { LinkProps as NextLinkProps } from 'next/link';
import { ReactNode, AnchorHTMLAttributes } from 'react';
import styles from './Link.module.css';
import { Icon } from '../Icon/Icon';

interface CustomLinkProps
  extends NextLinkProps, Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  children?: ReactNode;
  variant?:
  | 'primary'
  | 'secondary'
  | 'nav'
  | 'textWithBorder'
  | 'iconButton'
  | 'button'
  | 'buttonProfile'
  | 'buttonProfileHistory'
  | 'tertiary';
  

  iconId?: string;
  className?: string;
  isDisabled?: boolean;
}

export const CustomLink = ({
  children,
  variant = 'primary',
  iconId,
  className = '',
  isDisabled = false,
  ...props
}: CustomLinkProps) => {
  const linkClasses = `
    ${styles.link} 
    ${styles[variant]} 
    ${isDisabled ? styles.disabled : ''} 
    ${className}
  `.trim();

  return (
    <Link
      className={linkClasses}
      {...props}
      aria-disabled={isDisabled}
      tabIndex={isDisabled ? -1 : undefined}
      onClick={isDisabled ? (e) => e.preventDefault() : props.onClick}
    >
      {variant === 'iconButton' && iconId && (
        <Icon name={iconId} className={styles.icon} width={24} height={24} />
      )}

      {variant === 'textWithBorder' && children}
      {variant !== 'iconButton' && variant !== 'textWithBorder' && children}
    </Link>
  );
};