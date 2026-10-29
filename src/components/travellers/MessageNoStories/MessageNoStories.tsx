import type { ReactNode } from 'react';
import styles from './MessageNoStories.module.css';

interface MessageNoStoriesProps {
  type: 'saved' | 'my-stories';
  link: ReactNode;
}

export default function MessageNoStories({
  type,
  link,
}: MessageNoStoriesProps) {
  return (
    <div className={styles.wrapper}>
      <p className={styles.message}>
        {type === 'saved'
          ? 'У вас ще немає збережених історій, мерщій збережіть вашу першу історію!'
          : 'Ви ще нічого не публікували, поділіться своєю першою історією!'}
      </p>

      {link}
    </div>
  );
}