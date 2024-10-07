import React from 'react';
import { Link } from 'react-router-dom';

const Hero: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
      <div className="container mx-auto px-4 py-16 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-8 md:mb-0">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Calculate Your Real Estate ROI with Ease
          </h1>
          <p className="text-xl mb-6">
            Make informed investment decisions with our powerful ROI calculator.
          </p>
          <Link
            to="/register"
            className="bg-white text-blue-600 font-semibold py-3 px-6 rounded-full hover:bg-blue-100 transition duration-300"
          >
            Get Started
          </Link>
        </div>
        <div className="md:w-1/2">
          <img
            src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1073&q=80"
            alt="Real Estate Investment"
            className="rounded-lg shadow-xl"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;