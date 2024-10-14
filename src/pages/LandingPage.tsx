import React from 'react';
import Advantages from '../components/Advantages';
import FAQ from '../components/FAQ';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Pricing from '../components/Pricing';

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
