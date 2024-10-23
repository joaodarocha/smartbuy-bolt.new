import React from 'react';
import { useTranslation } from 'react-i18next';
import MaterialInfo from '../form/MaterialInfo';

interface CostItemProps {
  labelKey: string;
  amount: number;
  tooltipMessage?: string;
}

const CostItem: React.FC<CostItemProps> = ({ labelKey, amount, tooltipMessage }) => {
  const { t } = useTranslation();

  return (
    <div className="pb-1">
      <p className="text-sm font-medium text-gray-700">{t(labelKey)}</p>
      <p className="text-2xl font-bold text-gray-800 flex items-center">
        €{amount.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}
        {tooltipMessage && (
          <MaterialInfo description={tooltipMessage}/>
        )}
      </p>
    </div>
  );
};

export default CostItem;
