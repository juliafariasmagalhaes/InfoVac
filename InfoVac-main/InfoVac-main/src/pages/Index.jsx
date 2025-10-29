import { useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Hero from '@/components/sections/Hero';
import SearchSection from '@/components/sections/SearchSection';
import InfoSection from '@/components/sections/InfoSection';
import Footer from '@/components/layout/Footer';

const Index = () => {
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
        },
        (error) => {
        }
      );
    }
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <SearchSection />
      <InfoSection />
      <Footer />
    </div>
  );
};

export default Index; 