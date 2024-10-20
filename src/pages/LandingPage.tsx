import React from 'react';
import Advantages from '../components/layout/Advantages';
import FAQ from '../components/layout/FAQ';
import Footer from '../components/layout/Footer';
import Header from '../components/layout/Header';
import Hero from '../components/layout/Hero';
import Pricing from '../components/layout/Pricing';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header showPricing showFAQ/>
      <main className="flex-grow">
        <Hero/>
        <Advantages/>
        <Pricing/>
        <FAQ/>
      </main>
      <Footer/>
    </div>
  );
};

export default LandingPage;
