// CostItem.tsx
import React from 'react';
import { useTranslation } from 'react-i18next';

interface CostItemProps {
  labelKey: string;
  amount: number;
  rightSpan?: string;
}

const CostItem: React.FC<CostItemProps> = ({ labelKey, amount, rightSpan }) => {
  const { t } = useTranslation();

  return (
    <div className="pb-1">
      <p className="text-sm font-medium text-gray-700">{t(labelKey)}</p>
      <p className="text-2xl font-bold text-gray-800 flex items-center">
        €{amount.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}
        {rightSpan &&
            <span className="text-lg font-normal text-gray-500 ml-2">{rightSpan}</span>}
      </p>
    </div>
  );
};

export default CostItem;
