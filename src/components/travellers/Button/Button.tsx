'use client';

import Link from 'next/link';
import type {
  ButtonHTMLAttributes,
  ComponentPropsWithoutRef,
  ReactNode,
} from 'react';

import styles from './Button.module.css';

type ButtonVariant = 'primary' | 'secondary' | 'tertiary';

type ButtonProps = {
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

type ButtonLinkProps = {
  children: ReactNode;
  href: string;
  variant?: ButtonVariant;
  className?: string;
} & Omit<ComponentPropsWithoutRef<typeof Link>, 'href'>;

export const Button = ({
  children,
  variant = 'primary',
  className = '',
  type = 'button',
  disabled,
  ...props
}: ButtonProps) => {
  return (
    <button
      type={type}
      className={`${styles.button} ${styles[variant]} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export const ButtonLink = ({
  children,
  href,
  variant = 'primary',
  className = '',
  ...props
}: ButtonLinkProps) => {
  return (
    <Link
      href={href}
      className={`${styles.button} ${styles[variant]} ${className}`}
      {...props}
    >
      {children}
    </Link>
  );
};
