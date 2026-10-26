'use client';

import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperInstance } from 'swiper';
import { Grid } from 'swiper/modules';
import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import 'swiper/css';
import 'swiper/css/grid';

import api from '@/lib/api/api';
import type { User } from '@/types/user';
import { CustomLink } from '@/components/travellers/Link/Link';
import TravellerCard from '@/components/travellers/TravellerCard/TravellerCard';
import PageTitle from '@/components/common/PageTitle/PageTitle';
import Loader from '@/components/common/Loader/Loader';

import styles from './OurTravellers.module.css';

type Traveller = User & {
  avatarUrl: string;
  articlesAmount: number;
};

type TravellersResponse = {
  users: Traveller[];
  page?: number;
  perPage?: number;
  totalItems?: number;
  totalPages?: number;
};

async function getTravellers(): Promise<Traveller[]> {
  const { data } = await api.get<TravellersResponse>('/users', {
    params: {
      page: 1,
      perPage: 12,
    },
  });

  return data.users ?? [];
}

export default function OurTravellers() {
  const [swiper, setSwiper] = useState<SwiperInstance | null>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const {
    data: travellers = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['users', 1, 12],
    queryFn: getTravellers,
  });

  useEffect(() => {
    if (isError) {
      toast.error('Не вдалося завантажити мандрівників');
    }
  }, [isError]);

  function updateNavigation(instance: SwiperInstance) {
    setIsBeginning(instance.isBeginning);
    setIsEnd(instance.isEnd);
  }

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.title}>
            <h2 className={styles.subtitle}>Наші мандрівники</h2>
          </div>

          <CustomLink
            href="/travellers"
            variant="primary"
            className={styles.allLink}
          >
            Всі мандрівники
          </CustomLink>
        </div>

        {isLoading && <Loader size="large" />}

        {isError && (
          <p className={styles.message}>Не вдалося завантажити мандрівників.</p>
        )}

        {!isLoading && !isError && travellers.length === 0 && (
          <p className={styles.message}>Мандрівників поки немає.</p>
        )}

        {!isLoading && !isError && travellers.length > 0 && (
          <div className={styles.sliderWrapper}>
            <Swiper
              modules={[Grid]}
              onSwiper={(instance) => {
                setSwiper(instance);
                updateNavigation(instance);
              }}
              onSlideChange={updateNavigation}
              onResize={updateNavigation}
              slidesPerView={4}
              slidesPerGroup={4}
              spaceBetween={24}
              grid={{
                rows: 1,
                fill: 'row',
              }}
              watchOverflow
              breakpoints={{
                320: {
                  slidesPerView: 1,
                  slidesPerGroup: 3,
                  spaceBetween: 24,
                  grid: {
                    rows: 3,
                    fill: 'row',
                  },
                },
                768: {
                  slidesPerView: 2,
                  slidesPerGroup: 4,
                  spaceBetween: 24,
                  grid: {
                    rows: 2,
                    fill: 'row',
                  },
                },
                1440: {
                  slidesPerView: 4,
                  slidesPerGroup: 4,
                  spaceBetween: 24,
                  grid: {
                    rows: 1,
                    fill: 'row',
                  },
                },
              }}
              className={styles.swiper}
            >
              {travellers.slice(0, 12).map((traveller) => (
                <SwiperSlide key={traveller._id} className={styles.swiperSlide}>
                  <TravellerCard
                    traveller={{
                      _id: traveller._id,
                      name: traveller.name,
                      avatarUrl: traveller.avatarUrl,
                      articlesAmount: traveller.articlesAmount,
                    }}
                  />
                </SwiperSlide>
              ))}
            </Swiper>

            <div className={styles.controls}>
              <button
                type="button"
                disabled={isBeginning}
                onClick={() => swiper?.slidePrev()}
                aria-label="Попередні історії"
                className={styles.controllers}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className={styles.controllerArrows}
                >
                  <path
                    d="M2.9085 8.66525L8.41025 14.1667C8.58025 14.3371 8.66617 14.5371 8.668 14.7667C8.67 14.9964 8.58608 15.1971 8.41625 15.3688C8.24625 15.5409 8.04567 15.626 7.8145 15.624C7.58333 15.622 7.38208 15.5361 7.21075 15.3662L0.26075 8.41625C0.16975 8.32425 0.103583 8.22858 0.0622498 8.12925C0.0207498 8.02975 0 7.92425 0 7.81275C0 7.70125 0.0207498 7.596 0.0622498 7.497C0.103583 7.39783 0.16975 7.30242 0.26075 7.21075L7.21675 0.25475C7.39258 0.0849167 7.594 0 7.821 0C8.04783 0 8.24625 0.0849167 8.41625 0.25475C8.58608 0.42875 8.671 0.629499 8.671 0.856999C8.671 1.08467 8.58608 1.28375 8.41625 1.45425L2.9085 6.96175H15.1112C15.3554 6.96175 15.5594 7.04258 15.7233 7.20425C15.8871 7.36592 15.969 7.569 15.969 7.8135C15.969 8.058 15.8871 8.26108 15.7233 8.42275C15.5594 8.58442 15.3554 8.66525 15.1112 8.66525H2.9085Z"
                    fill="#1B391B"
                  />
                </svg>
              </button>

              <button
                type="button"
                disabled={isEnd}
                onClick={() => swiper?.slideNext()}
                aria-label="Наступні історії"
                className={styles.controllers}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className={styles.controllerArrows}
                >
                  <path
                    d="M13.0545 8.66228H0.85175C0.607083 8.66228 0.404 8.58145 0.2425 8.41978C0.0808333 8.25812 0 8.05503 0 7.81053C0 7.56603 0.0808333 7.36295 0.2425 7.20128C0.404 7.03962 0.607083 6.95878 0.85175 6.95878H13.0545L7.55275 1.45728C7.38275 1.28728 7.29667 1.08703 7.2945 0.856535C7.29217 0.625868 7.37608 0.425117 7.54625 0.254284C7.71658 0.0827841 7.91733 -0.00196542 8.1485 3.45823e-05C8.37967 0.00203458 8.58092 0.0879512 8.75225 0.257785L15.7022 7.20778C15.7932 7.29978 15.8594 7.39545 15.9007 7.49478C15.9422 7.59428 15.963 7.69978 15.963 7.81128C15.963 7.92278 15.9422 8.02803 15.9007 8.12703C15.8594 8.2262 15.7932 8.32162 15.7022 8.41328L8.74625 15.3633C8.57042 15.5371 8.369 15.624 8.142 15.624C7.91517 15.624 7.71675 15.5366 7.54675 15.3618C7.37692 15.1916 7.292 14.9929 7.292 14.7655C7.292 14.5384 7.37692 14.3398 7.54675 14.1698L13.0545 8.66228Z"
                    fill="#1B391B"
                  />
                </svg>
              </button>
            </div>
          </div>
        )}

        <CustomLink
          href="/travellers"
          variant="primary"
          className={styles.mobileAllLink}
        >
          Всі мандрівники
        </CustomLink>
      </div>
    </section>
  );
}
