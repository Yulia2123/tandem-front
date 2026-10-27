import type { Metadata } from 'next';
import Header from '@/components/layout/Header/Header';
import Footer from '@/components/layout/Footer/Footer';
import TravellersList from '@/components/travellers/TravellersList';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Мандрівники',
  description: 'Знайомся з мандрівниками та відкривай їхні історії.',
};

export default function TravellersPage() {
  return (
    <>
      <Header />
      <main>
        <div className="container section">
          <h1 className={styles.title}>Мандрівники</h1>
          <TravellersList />
        </div>
      </main>
      <Footer />
    </>
  );
}
