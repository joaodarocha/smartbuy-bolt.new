import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import MaterialCard from '../MaterialCard';
import FoldableSection from './FoldableSection';

interface CostsBreakdownProps {
  totalUpfrontCosts: number;
  monthlyPayment: number;
  closingCosts: number;
  downPaymentAmount: number;
  imt: number;
  stampDuty: number;
  notaryFees: number;
  registrationFees: number;
}

const CostsBreakdown: React.FC<CostsBreakdownProps> = ({
                                                         totalUpfrontCosts,
                                                         monthlyPayment,
                                                         closingCosts,
                                                         downPaymentAmount,
                                                         imt,
                                                         stampDuty,
                                                         notaryFees,
                                                         registrationFees,
                                                       }) => {
  const { t } = useTranslation();
  const [showBreakdown, setShowBreakdown] = useState(false);

  const breakdown = (
    <div>
      <div>
        <p className="text-sm font-medium text-gray-700">{t('calculator.downPayment')}</p>
        <p className="text-2xl font-bold text-gray-800">
          €{downPaymentAmount.toLocaleString('en-US', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
        </p>
      </div>
      <div>
        <p className="text-sm font-medium text-gray-700">{t('calculator.imt')}</p>
        <p className="text-2xl font-bold text-gray-800">
          €{imt.toLocaleString('en-US', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
        </p>
      </div>
      <div>
        <p className="text-sm font-medium text-gray-700">{t('calculator.stampDuty')}</p>
        <p className="text-2xl font-bold text-gray-800">
          €{stampDuty.toLocaleString('en-US', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
        </p>
      </div>
      <div>
        <p className="text-sm font-medium text-gray-700">{t('calculator.notaryFees')}</p>
        <p className="text-2xl font-bold text-gray-800">
          €{notaryFees.toLocaleString('en-US', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
        </p>
      </div>
      <div>
        <p
          className="text-sm font-medium text-gray-700">{t('calculator.registrationFees')}</p>
        <p className="text-2xl font-bold text-gray-800">
          €{registrationFees.toLocaleString('en-US', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
        </p>
      </div>
    </div>
  );

  return (
    <div className="p-[5px]">
      <h2 className="text-xl font-semibold mb-4">{t('calculator.costBreakdown')}</h2>
      <div className="space-y-4">
        <MaterialCard
          title={t('calculator.totalUpfrontCosts')}
          value={totalUpfrontCosts}
          color="blue"
        />
        <FoldableSection showSection={showBreakdown} setShowSection={setShowBreakdown}>
          {breakdown}
        </FoldableSection>
        <MaterialCard
          title={t('calculator.monthlyMortgagePayment')}
          value={monthlyPayment}
          color="green"
        />
        <MaterialCard
          title={t('calculator.taxesAndFees')}
          value={closingCosts}
          color="orange"
        />
      </div>
    </div>
  );
};

export default CostsBreakdown;
