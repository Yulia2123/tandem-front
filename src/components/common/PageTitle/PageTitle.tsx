import { ReactNode } from 'react';
import styles from './PageTitle.module.css';

type PageTitleProps = {
  children: ReactNode;
};

export default function PageTitle({ children }: PageTitleProps) {
  return <h1 className={styles.title}>{children}</h1>;
}
