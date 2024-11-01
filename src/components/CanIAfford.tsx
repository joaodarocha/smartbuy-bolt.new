import React from 'react';
import { useTranslation } from 'react-i18next';

const CanIAfford: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-center">{t('canIAfford.title')}</h1>
    </div>
  );
};

export default CanIAfford;
