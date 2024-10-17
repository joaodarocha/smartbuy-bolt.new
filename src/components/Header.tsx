// src/components/Header.tsx
import { Calculator, DollarSign, FileText, Home } from 'lucide-react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { routes } from '../routes';
import HeaderButton from './buttons/HeaderButton';
import LanguageButton from './buttons/LanguageButton';
import LoginButton from './buttons/LoginButton';
import UserButton from './buttons/UserButton';

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
    {
      icon: DollarSign,
      label: t('header.costsCalculator'),
      path: routes.home + routes.calculator
    },
    {
      icon: Calculator,
      label: t('header.affordabilityCheck'),
      path: routes.home + routes.affordability,
    },
    {
      icon: FileText,
      label: t('header.taxesAndFees'),
      path: routes.home + routes.taxes,
    },
  ];

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to={routes.home} className="flex items-center space-x-2">
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
                  label={t('header.pricing')}
                  onClick={() => scrollToSection('pricing')}
                />
              </li>
            )}
            {showFAQ && (
              <li>
                <HeaderButton
                  icon={Home}
                  label={t('header.faq')}
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
