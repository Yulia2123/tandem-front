import styles from './TravellerCard.module.css';
import TravellerInfo from '@/components/travellers/TravellerInfo/TravellerInfo';
import { CustomLink } from '@/components/travellers/Link/Link';

type TravellerCardData = {
  _id: string;
  name: string;
  avatarUrl: string;
  articlesAmount: number;
};

type Props = {
  traveller: TravellerCardData;
  compact?: boolean;
};

export default function TravellerCard({ traveller, compact }: Props) {
  return (
    <div className={styles.card}>
      <TravellerInfo
        user={{
          _id: traveller._id,
          name: traveller.name,
          avatar: traveller.avatarUrl,
          articlesAmount: traveller.articlesAmount,
        }}
        variant="card"
      >
        <CustomLink
          href={`/travellers/${traveller._id}`}
          variant="secondary"
          className={`${styles.profileLink} ${compact ? styles.compact : ''}`}
        >
          Переглянути профіль
        </CustomLink>
      </TravellerInfo>
    </div>
  );
}
