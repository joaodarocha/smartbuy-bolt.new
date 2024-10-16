import {
  Calculator,
  ChevronLeft,
  ChevronRight,
  DollarSign,
  FileText
} from 'lucide-react';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import NavbarItem from './NavbarItem';

const Navbar: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();
  const { t } = useTranslation();

  const menuItems = [
    {
      icon: Calculator,
      label: t('header.costsCalculator'),
      path: '/home/budget-calculator'
    },
    {
      icon: DollarSign,
      label: t('header.affordabilityCheck'),
      path: '/home/can-i-afford'
    },
    { icon: FileText, label: t('header.taxesAndFees'), path: '/home/hidden-fees' },
  ];

  return (
    <nav
      className={`bg-white shadow-md transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-64'}`}>
      <div className="p-4">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="w-full flex justify-end text-gray-500 hover:text-gray-700"
        >
          {isCollapsed ? <ChevronRight size={24}/> : <ChevronLeft size={24}/>}
        </button>
      </div>
      <ul>
        {menuItems.map((item, index) => (
          <NavbarItem
            key={index}
            icon={item.icon}
            label={item.label}
            isCollapsed={isCollapsed}
            active={location.pathname === item.path}
            path={item.path}
          />
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
