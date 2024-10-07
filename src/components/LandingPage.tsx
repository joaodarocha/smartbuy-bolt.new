import React from 'react';
import Advantages from './Advantages';
import FAQ from './FAQ';
import Footer from './Footer';
import Header from './Header';
import Hero from './Hero';
import Pricing from './Pricing';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header/>
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
