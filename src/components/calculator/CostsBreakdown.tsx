import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import MaterialCard from '../MaterialCard';
import CostItem from './CostItem';
import FoldableSection from './FoldableSection';

interface CostsBreakdownProps {
  totalUpfrontCosts: number;
  monthlyPayment: number;
  closingCosts: number;
  downPaymentAmount: number;
  stampDuty: number;
  notaryFees: number;
  registrationFees: number;
  imt: number;
  rate: number;
}

const CostsBreakdown: React.FC<CostsBreakdownProps> = ({
                                                         totalUpfrontCosts,
                                                         monthlyPayment,
                                                         closingCosts,
                                                         downPaymentAmount,
                                                         stampDuty,
                                                         notaryFees,
                                                         registrationFees,
                                                         imt,
                                                         rate,
                                                       }) => {
  const { t } = useTranslation();
  const [showBreakdown, setShowBreakdown] = useState(false);

  const breakdown = (
    <div>
      <CostItem labelKey="calculator.downPayment" amount={downPaymentAmount}/>
      <CostItem labelKey="calculator.imt" amount={imt}
                tooltipMessage={t('calculator.imtExplanation', { rate })}/>
      <CostItem labelKey="calculator.stampDuty" amount={stampDuty}
                tooltipMessage={t('calculator.stampDutyExplanation')}/>
      <CostItem labelKey="calculator.notaryFees" amount={notaryFees}
                tooltipMessage={t('calculator.notaryFeeExplanation')}/>
      <CostItem labelKey="calculator.registrationFees" amount={registrationFees}/>
    </div>
  );

  return (
    <div className="p-[5px]">
      <h2 className="text-xl font-semibold mb-4">{t('calculator.costBreakdown')}</h2>
      <div className="space-y-4">
        <MaterialCard title={t('calculator.totalUpfrontCosts')} value={totalUpfrontCosts}
                      color="blue">
          <FoldableSection className="mt-2" showSection={showBreakdown}
                           setShowSection={setShowBreakdown}>
            {breakdown}
          </FoldableSection>
        </MaterialCard>
        <MaterialCard title={t('calculator.monthlyMortgagePayment')}
                      value={monthlyPayment} color="green"/>
        <MaterialCard title={t('calculator.taxesAndFees')} value={closingCosts}
                      color="orange"/>
      </div>
    </div>
  );
};

export default CostsBreakdown;
