import React, { useEffect } from 'react';
import { FeaturedProducts, Hero, Services, Contact } from '../../components';

const HomePage = () => {
  useEffect(() => {
    document.title = 'Smartkart | Home';
  }, []);

  return (
    <main>
      <Hero />
      <FeaturedProducts />
      <Services />
      <Contact />
    </main>
  );
};

export default HomePage;
