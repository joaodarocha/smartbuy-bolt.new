import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import MaterialTable from '../MaterialTable';
import Actions from './Actions';
import CostsBreakdown from './CostsBreakdown';
import CostsChart from './CostsChart';
import DetailsForm from './DetailsForm';
import useCalculateIMT from './useCalculateIMT';

interface EuriborRates {
  euribor_3_months: number;
  euribor_6_months: number;
  euribor_12_months: number;
}

const CostsCalculator: React.FC = () => {
  const { t } = useTranslation();
  const [propertyPrice, setPropertyPrice] = useState<number>(200000);
  const [downPayment, setDownPayment] = useState<number>(20);
  const [mortgageTerm, setMortgageTerm] = useState<number>(30);
  const [interestRate, setInterestRate] = useState<number>(3);
  const [location, setLocation] = useState<string>('Continente');
  const [isFirstProperty, setIsFirstProperty] = useState<boolean>(true);
  const [isYoungBuyer, setIsYoungBuyer] = useState<boolean>(false);

  const [totalUpfrontCosts, setTotalUpfrontCosts] = useState<number>(0);
  const [monthlyPayment, setMonthlyPayment] = useState<number>(0);
  const [closingCosts, setClosingCosts] = useState<number>(0);
  const [downPaymentAmount, setDownPaymentAmount] = useState<number>(0);
  const [stampDuty, setStampDuty] = useState<number>(0);
  const [notaryFees, setNotaryFees] = useState<number>(0);
  const [registrationFees, setRegistrationFees] = useState<number>(0);
  const [euriborRates, setEuriborRates] = useState<EuriborRates | null>(null);

  const { imt, rate } = useCalculateIMT({
    propertyPrice,
    location,
    isFirstProperty,
    isYoungBuyer
  });

  useEffect(() => {
    calculateCosts();
    fetchEuriborRates();
  }, [propertyPrice, downPayment, mortgageTerm, interestRate, location, isFirstProperty, isYoungBuyer, imt]);

  const calculateCosts = () => {
    const downPaymentAmount = ( propertyPrice * downPayment ) / 100;
    const loanAmount = propertyPrice - downPaymentAmount;
    const monthlyInterestRate = interestRate / 100 / 12;
    const numberOfPayments = mortgageTerm * 12;

    const monthlyPayment =
      ( loanAmount * ( monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments) ) ) /
      ( Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1 );

    const stampDuty = propertyPrice * 0.008;
    const notaryFees = 1000;
    const registrationFees = 250;

    const totalClosingCosts = imt + stampDuty + notaryFees + registrationFees;
    const totalUpfrontCosts = downPaymentAmount + totalClosingCosts;

    setMonthlyPayment(monthlyPayment);
    setClosingCosts(totalClosingCosts);
    setTotalUpfrontCosts(totalUpfrontCosts);
    setDownPaymentAmount(downPaymentAmount);
    setStampDuty(stampDuty);
    setNotaryFees(notaryFees);
    setRegistrationFees(registrationFees);
  };

  const fetchEuriborRates = async () => {
    try {
      const response = await axios.get<EuriborRates>('http://localhost:3001/api/euribor-rates');
      setEuriborRates(response.data);
    } catch (error) {
      console.error('Error fetching Euribor rates:', error);
    }
  };

  const transformEuriborRates = (rates: EuriborRates | null) => {
    if (!rates) return [];
    return [
      {
        euribor_3_months: rates.euribor_3_months,
        euribor_6_months: rates.euribor_6_months,
        euribor_12_months: rates.euribor_12_months,
      },
    ];
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-center">{t('calculator.title')}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <DetailsForm
          propertyPrice={propertyPrice}
          setPropertyPrice={setPropertyPrice}
          downPayment={downPayment}
          setDownPayment={setDownPayment}
          mortgageTerm={mortgageTerm}
          setMortgageTerm={setMortgageTerm}
          interestRate={interestRate}
          setInterestRate={setInterestRate}
          location={location}
          setLocation={setLocation}
          isFirstProperty={isFirstProperty}
          setIsFirstProperty={setIsFirstProperty}
          isYoungBuyer={isYoungBuyer}
          setIsYoungBuyer={setIsYoungBuyer}
        />
        <div>
          <CostsBreakdown
            totalUpfrontCosts={totalUpfrontCosts}
            monthlyPayment={monthlyPayment}
            closingCosts={closingCosts}
            downPaymentAmount={downPaymentAmount}
            stampDuty={stampDuty}
            notaryFees={notaryFees}
            registrationFees={registrationFees}
            imt={imt}
            rate={rate}
          />
          <CostsChart
            propertyPrice={propertyPrice}
            downPayment={downPayment}
            imt={imt}
            stampDuty={stampDuty}
            notaryFees={notaryFees}
            registrationFees={registrationFees}
          />
        </div>
      </div>
      {euriborRates && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">{t('euriborRates')}</h2>
          <MaterialTable
            columns={['euribor_3_months', 'euribor_6_months', 'euribor_12_months']}
            data={transformEuriborRates(euriborRates)}
          />
        </div>
      )}
      <Actions/>
    </div>
  );
};

export default CostsCalculator;
