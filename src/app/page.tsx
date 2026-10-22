'use client';

import Header from '@/components/layout/Header/Header';
import Hero from '@/components/home/Hero/Hero';
import Footer from '@/components/layout/Footer/Footer';
import PopularStories from '@/components/PopularStories/PopularStories';
import Join from '@/components/home/Join/Join';

export default function Home() {
  return (
    <>
      <Header />

      <main>
        <div className="section">
          <Hero />
          <PopularStories />
          <Join />
        </div>
      </main>

      <Footer />
    </>
  );
}
