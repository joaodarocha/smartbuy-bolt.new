import React from 'react';
import { useTranslation } from 'react-i18next';

const Footer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h3 className="text-xl font-semibold mb-2">{t('footer.appName')}</h3>
            <p className="text-gray-400">{t('footer.description')}</p>
          </div>
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h3 className="text-xl font-semibold mb-2">{t('footer.quickLinks')}</h3>
            <ul className="text-gray-400">
              <li><a href="#" className="hover:text-white">{t('footer.home')}</a></li>
              <li><a href="#" className="hover:text-white">{t('footer.features')}</a></li>
              <li><a href="#" className="hover:text-white">{t('footer.pricing')}</a></li>
              <li><a href="#" className="hover:text-white">{t('footer.faq')}</a></li>
            </ul>
          </div>
          <div className="w-full md:w-1/3">
            <h3 className="text-xl font-semibold mb-2">{t('footer.contactUs')}</h3>
            <p className="text-gray-400">{t('footer.email')}</p>
            <p className="text-gray-400">{t('footer.phone')}</p>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} {t('footer.appName')}. {t('footer.rightsReserved')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
