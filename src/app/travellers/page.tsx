import type { Metadata } from 'next';
import TravellersList from '@/components/travellers/TravellersList';

export const metadata: Metadata = {
  title: 'Мандрівники',
  description: 'Знайомся з мандрівниками та відкривай їхні історії.',
};

export default function TravellersPage() {
  return (
    <main>
      <div className="container section">
        <h1>Мандрівники</h1>
        <TravellersList />
      </div>
    </main>
  );
}