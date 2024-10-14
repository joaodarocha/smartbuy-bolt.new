import { Calculator, DollarSign, FileText, Home } from 'lucide-react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import HeaderButton from './Buttons/HeaderButton';
import LanguageButton from './Buttons/LanguageButton';
import LoginButton from './Buttons/LoginButton';
import UserButton from './Buttons/UserButton';

interface HeaderProps {
  showPricing?: boolean;
  showFAQ?: boolean;
  showUserIcon?: boolean;
  showMenuItems?: boolean;
}

const Header: React.FC<HeaderProps> = ({
                                         showPricing = false,
                                         showFAQ = false,
                                         showUserIcon = false,
                                         showMenuItems = false,
                                       }) => {
  const { t } = useTranslation();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const menuItems = [
    { icon: DollarSign, label: 'How much upfront?', path: '/home/budget-calculator' },
    { icon: Calculator, label: 'Can I afford it?', path: '/home/can-i-afford' },
    { icon: FileText, label: 'Any hidden fees?', path: '/home/hidden-fees' },
  ];

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <Home className="h-8 w-8 text-blue-600"/>
          <span className="text-xl font-bold text-gray-800">{t('appName')}</span>
        </Link>
        <nav className="flex items-center space-x-6">
          <ul className="flex space-x-6">
            {showMenuItems && menuItems.map((item, index) => (
              <li key={index}>
                <HeaderButton icon={item.icon} label={item.label} path={item.path}/>
              </li>
            ))}
            {showPricing && (
              <li>
                <HeaderButton
                  icon={Home}
                  label="Pricing"
                  onClick={() => scrollToSection('pricing')}
                />
              </li>
            )}
            {showFAQ && (
              <li>
                <HeaderButton
                  icon={Home}
                  label="FAQs"
                  onClick={() => scrollToSection('faq')}
                />
              </li>
            )}
          </ul>
          <LanguageButton/>
          {showUserIcon ? (
            <UserButton/>
          ) : (
            <LoginButton/>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
