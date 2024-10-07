import { Calculator } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';
import LoginButton from './LoginButton';

const Header: React.FC = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <Calculator className="h-8 w-8 text-blue-600"/>
          <span className="text-xl font-bold text-gray-800">ROI Calculator</span>
        </Link>
        <nav>
          <ul className="flex space-x-6 items-center">
            <li>
              <button
                onClick={() => scrollToSection('pricing')}
                className="text-gray-600 hover:text-blue-600 transition duration-300"
              >
                Pricing
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection('faq')}
                className="text-gray-600 hover:text-blue-600 transition duration-300"
              >
                FAQs
              </button>
            </li>
            <li>
              <LoginButton/>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
