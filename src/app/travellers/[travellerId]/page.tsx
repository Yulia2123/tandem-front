'use client';

import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';

import Header from '@/components/layout/Header/Header';
import Footer from '@/components/layout/Footer/Footer';
import TravellerInfo from '@/components/travellers/TravellerInfo/TravellerInfo';
import PageTitle from '@/components/common/PageTitle/PageTitle';
// import TravellerStories from '@/components/story/TravellersStories/TravellerStories';
import { getUserProfile } from '@/lib/api/users';
import styles from './page.module.css';

export default function TravellerProfilePage() {
  const { travellerId } = useParams<{ travellerId: string }>();

  const { data, isPending, isError } = useQuery({
    queryKey: ['traveller', travellerId],
    queryFn: () => getUserProfile(travellerId),
    enabled: Boolean(travellerId),
  });

  const traveller = data?.user;
  // const hasStories = (data?.totalItems ?? 0) > 0;

  return (
    <>
      <Header />

      <main>
        <div className="container ">
          <div className={styles.content}>
            {isPending && <p>Завантаження профілю...</p>}

            {isError && (
              <p role="alert">Не вдалося завантажити профіль мандрівника.</p>
            )}

            {traveller && (
              <>
                <TravellerInfo
                  user={{
                    ...traveller,
                    avatar: traveller.avatarUrl,
                  }}
                  variant="profile"
                  isPriority
                  className={styles.profileInfo}
                />

                <div className={styles.stories}>
                  {/* <PageTitle>Історії Мандрівника</PageTitle>
                  <div className={styles.storiesGrid}>
                    <TravellerStories travellerId={travellerId} />
                  </div> */}
                </div>
              </>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
