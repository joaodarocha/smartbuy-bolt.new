import { LucideIcon } from 'lucide-react';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface HeaderButtonProps {
  icon: LucideIcon;
  label: string;
  path?: string;
  onClick?: () => void;
}

const HeaderButton: React.FC<HeaderButtonProps> = ({
                                                     icon: Icon,
                                                     label,
                                                     path,
                                                     onClick
                                                   }) => {
  const location = useLocation();
  const isActive = path && location.pathname === path;

  const buttonContent = (
    <>
      <Icon size={24} className={`mr-2 ${isActive ? 'text-blue-700' : ''}`}/>
      <span>{label}</span>
    </>
  );

  return path ? (
    <Link
      to={path}
      className={`flex items-center p-2 text-gray-700 hover:bg-gray-200 rounded transition-colors duration-200 ${isActive ? 'bg-blue-100 text-blue-700' : ''}`}
    >
      {buttonContent}
    </Link>
  ) : (
    <button
      onClick={onClick}
      className="flex items-center p-2 text-gray-700 hover:bg-gray-200 rounded transition-colors duration-200"
    >
      {buttonContent}
    </button>
  );
};

export default HeaderButton;
