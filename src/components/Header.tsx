import { Home } from 'lucide-react';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LoginButton from './LoginButton';

interface HeaderProps {
  showPricing?: boolean;
  showFAQ?: boolean;
  showUserIcon?: boolean;
  additionalMenuItems?: { label: string; onClick: () => void }[];
}

const Header: React.FC<HeaderProps> = ({
  showPricing = false,
  showFAQ = false,
  showUserIcon = false,
  additionalMenuItems = []
}) => {
  const navigate = useNavigate();

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
          <Home className="h-8 w-8 text-blue-600"/>
          <span className="text-xl font-bold text-gray-800">Can I Afford</span>
        </Link>
        <nav className="flex items-center space-x-6">
          <ul className="flex space-x-6">
            {showPricing && (
              <li>
                <button
                  onClick={() => scrollToSection('pricing')}
                  className="text-gray-600 hover:text-blue-600 transition duration-300"
                >
                  Pricing
                </button>
              </li>
            )}
            {showFAQ && (
              <li>
                <button
                  onClick={() => scrollToSection('faq')}
                  className="text-gray-600 hover:text-blue-600 transition duration-300"
                >
                  FAQs
                </button>
              </li>
            )}
            {additionalMenuItems.map((item, index) => (
              <li key={index}>
                <button
                  onClick={item.onClick}
                  className="text-gray-600 hover:text-blue-600 transition duration-300"
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
          {showUserIcon ? (
            <button
              onClick={() => navigate('/profile')}
              className="text-gray-600 hover:text-blue-600 transition duration-300"
            >
              <Home className="h-6 w-6"/>
            </button>
          ) : (
            <LoginButton/>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;