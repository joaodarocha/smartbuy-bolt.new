import { LogIn } from 'lucide-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface LoginButtonProps {
  className?: string;
}

const ButtonLogin: React.FC<LoginButtonProps> = ({ className = '' }) => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <button
      onClick={handleLogin}
      className={`flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${className}`}
    >
      <LogIn className="h-5 w-5 mr-2"/>
      Log In
    </button>
  );
};

export default ButtonLogin;
