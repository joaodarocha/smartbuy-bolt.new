import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

const LanguageButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { i18n } = useTranslation();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      buttonRef.current && !buttonRef.current.contains(event.target as Node) &&
      popoverRef.current && !popoverRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleLanguage = () => {
    const newLanguage = i18n.language === 'EN' ? 'PT' : 'EN';
    i18n.changeLanguage(newLanguage);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className="text-gray-600 hover:text-blue-600 transition duration-300"
      >
        {i18n.language}
      </button>
      {isOpen && (
        <div
          ref={popoverRef}
          className="absolute right-0 mt-2 w-24 bg-white border border-gray-200 rounded shadow-lg"
        >
          <button
            onClick={toggleLanguage}
            className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            {i18n.language === 'EN' ? 'PT' : 'EN'}
          </button>
        </div>
      )}
    </div>
  );
};

export default LanguageButton;
