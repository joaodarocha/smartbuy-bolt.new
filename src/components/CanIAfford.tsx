import { Info } from 'lucide-react';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import MaterialInput from './form/MaterialInput';
import MaterialSelect from './form/MaterialSelect';

const CanIAfford: React.FC = () => {
  const { t } = useTranslation();
  const [income, setIncome] = useState<number>(0);
  const [isMonthly, setIsMonthly] = useState<boolean>(true);
  const [debts, setDebts] = useState<number>(0);
  const [expenses, setExpenses] = useState<number>(0);
  const [propertyPrice, setPropertyPrice] = useState<number>(200000);
  const [downPayment, setDownPayment] = useState<number>(20);
  const [interestRate, setInterestRate] = useState<number>(3);
  const [mortgageTerm, setMortgageTerm] = useState<number>(30);

  const calculateMortgage = () => {
    const downPaymentAmount = ( propertyPrice * downPayment ) / 100;
    const loanAmount = propertyPrice - downPaymentAmount;
    const monthlyInterestRate = interestRate / 100 / 12;
    const numberOfPayments = mortgageTerm * 12;

    return (
      ( loanAmount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments) ) /
      ( Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1 )
    );
  };

  const monthlyIncome = isMonthly ? income : income / 12;
  const monthlyMortgage = calculateMortgage();
  const affordable = monthlyIncome * 0.35 >= monthlyMortgage;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-center">{t('canIAfford.title')}</h1>
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            {t('canIAfford.grossIncome')}
            <span className="ml-2 text-gray-400 cursor-pointer">
              <Info size={16}/>
            </span>
          </label>
          <div className="mt-1 flex">
            <MaterialInput
              label={t('canIAfford.grossIncome')}
              value={income}
              onChange={setIncome}
              type="currency"
            />
            <MaterialSelect
              value={isMonthly ? t('canIAfford.monthly') : t('canIAfford.yearly')}
              onChange={(value) => setIsMonthly(value === t('canIAfford.monthly'))}
              options={[t('canIAfford.monthly'), t('canIAfford.yearly')]}
              label={t('canIAfford.incomeType')}
            />
          </div>
        </div>

        <MaterialInput
          label={t('canIAfford.monthlyDebts')}
          value={debts}
          onChange={setDebts}
          type="currency"
        />

        <MaterialInput
          label={t('canIAfford.monthlyExpenses')}
          value={expenses}
          onChange={setExpenses}
          type="currency"
        />

        <MaterialInput
          label={t('canIAfford.propertyPrice')}
          value={propertyPrice}
          onChange={setPropertyPrice}
          type="currency"
        />

        <MaterialInput
          label={t('canIAfford.downPayment')}
          value={downPayment}
          onChange={setDownPayment}
          type="percentage"
        />

        <MaterialInput
          label={t('canIAfford.interestRate')}
          value={interestRate}
          onChange={setInterestRate}
          type="percentage"
        />

        <MaterialInput
          label={t('canIAfford.mortgageTerm')}
          value={mortgageTerm}
          onChange={setMortgageTerm}
          type="years"
        />

        <div className="mt-6">
          <h2
            className="text-xl font-semibold mb-4">{t('canIAfford.affordabilityResult')}</h2>
          <div className={`p-4 rounded-md ${affordable ? 'bg-green-100' : 'bg-red-100'}`}>
            {affordable ? (
              <p>{t('canIAfford.affordable', { price: propertyPrice.toLocaleString() })}</p>
            ) : (
              <p>{t('canIAfford.notAffordable')}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CanIAfford;
