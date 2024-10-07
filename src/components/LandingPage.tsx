import React from 'react';
import Header from './Header';
import Hero from './Hero';
import Advantages from './Advantages';
import Pricing from './Pricing';
import FAQ from './FAQ';
import Footer from './Footer';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Hero />
        <Advantages />
        <Pricing />
        <FAQ />
      </main>
       <Footer />
    </div>
  );
};

export default LandingPage;