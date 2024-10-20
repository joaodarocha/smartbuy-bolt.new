import { LucideIcon } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';

interface NavbarItemProps {
  icon: LucideIcon;
  label: string;
  isCollapsed: boolean;
  active?: boolean;
  path: string;
}

const NavbarItem: React.FC<NavbarItemProps> = ({
                                                 icon: Icon,
                                                 label,
                                                 isCollapsed,
                                                 active,
                                                 path
                                               }) => {
  return (
    <li className="mb-2">
      <Link
        to={path}
        className={`flex items-center p-2 text-gray-700 hover:bg-gray-200 rounded transition-colors duration-200 ${active ? 'bg-blue-100 text-blue-700' : ''}`}
      >
        <Icon size={24} className={`mr-2 ${active ? 'text-blue-700' : ''}`}/>
        {!isCollapsed && <span>{label}</span>}
      </Link>
    </li>
  );
};

export default NavbarItem;
