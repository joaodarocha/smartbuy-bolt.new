import React from 'react';
import { useTranslation } from 'react-i18next';

interface CostsBreakdownProps {
  totalUpfrontCosts: number;
  monthlyPayment: number;
  closingCosts: number;
}

const CostsBreakdown: React.FC<CostsBreakdownProps> = ({
                                                         totalUpfrontCosts,
                                                         monthlyPayment,
                                                         closingCosts,
                                                       }) => {
  const { t } = useTranslation();

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">{t('calculator.costBreakdown')}</h2>
      <div className="space-y-4">
        <div>
          <p
            className="text-sm font-medium text-gray-700">{t('calculator.totalUpfrontCosts')}</p>
          <p className="text-2xl font-bold text-blue-600">
            €{totalUpfrontCosts.toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          })}
          </p>
        </div>
        <div>
          <p
            className="text-sm font-medium text-gray-700">{t('calculator.monthlyMortgagePayment')}</p>
          <p className="text-2xl font-bold text-green-600">
            €{monthlyPayment.toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          })}
          </p>
        </div>
        <div>
          <p
            className="text-sm font-medium text-gray-700">{t('calculator.closingCosts')}</p>
          <p className="text-2xl font-bold text-red-600">
            €{closingCosts.toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          })}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CostsBreakdown;
