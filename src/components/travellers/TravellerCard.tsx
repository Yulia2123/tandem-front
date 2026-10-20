import Image from 'next/image';
import Link from 'next/link';
import type { Traveller } from '@/lib/api/travellers';

interface TravellerCardProps {
  traveller: Traveller;
}

export default function TravellerCard({
  traveller,
}: TravellerCardProps) {
  return (
    <li>
      <Link href={`/travellers/${traveller._id}`}>
        <Image
          src={traveller.avatarUrl}
          alt={`Аватар ${traveller.name}`}
          width={120}
          height={120}
          unoptimized
        />

        <h2>{traveller.name}</h2>

        <p>
          Статей: {traveller.articlesAmount}
        </p>
      </Link>
    </li>
  );
}