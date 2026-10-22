import Header from '@/components/layout/Header/Header';
import Hero from '@/components/home/Hero/Hero';
import Footer from '@/components/layout/Footer/Footer';
import Join from '@/components/home/Join/Join';
import OurTravellers from '@/components/travellers/OurTravellers';

export default function Home() {
  return (
    <>
      <Header />

      <main>
        <div className="section">
          <Hero />
          <OurTravellers />
          <Join />
        </div>
      </main>

      <Footer />
    </>
  );
}
