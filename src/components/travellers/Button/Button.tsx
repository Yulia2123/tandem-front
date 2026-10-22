'use client';
import { ButtonHTMLAttributes, ReactNode } from 'react';
import styles from './Button.module.css';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'tertiary';
  isLoading?: boolean;
}

export const Button = ({
  children,
  variant = 'primary',
  isLoading,
  className = '',
  disabled,
  ...props
}: ButtonProps) => {
  const buttonClass = `${styles.button} ${styles[variant]} ${className}`;

  return (
    <button
      className={buttonClass}
      disabled={isLoading || disabled}
      aria-busy={isLoading || undefined}
      {...props}
    >
      {isLoading ? 'Завантаження...' : children}
    </button>
  );
};