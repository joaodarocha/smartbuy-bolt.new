import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Actions from './Actions';
import AdvancedOptions from './AdvancedOptions';
import CostsBreakdown from './CostsBreakdown';
import CostsChart from './CostsChart';
import PropertyDetailsForm from './PropertyDetailsForm';

interface BudgetCalculatorProps {
  // Add any props if needed
}

interface EuriborRates {
  euribor_1_week: number;
  euribor_1_month: number;
  euribor_3_months: number;
  euribor_6_months: number;
  euribor_12_months: number;
}

const BudgetCalculator: React.FC<BudgetCalculatorProps> = () => {
  const { t } = useTranslation();
  const [propertyPrice, setPropertyPrice] = useState<number>(200000);
  const [downPayment, setDownPayment] = useState<number>(20);
  const [mortgageTerm, setMortgageTerm] = useState<number>(30);
  const [interestRate, setInterestRate] = useState<number>(3);
  const [location, setLocation] = useState<string>('Continente');

  const [totalUpfrontCosts, setTotalUpfrontCosts] = useState<number>(0);
  const [monthlyPayment, setMonthlyPayment] = useState<number>(0);
  const [closingCosts, setClosingCosts] = useState<number>(0);
  const [showAdvancedOptions, setShowAdvancedOptions] = useState<boolean>(false);
  const [euriborRates, setEuriborRates] = useState<EuriborRates | null>(null);


  useEffect(() => {
    calculateCosts();
    fetchEuriborRates();

  }, [propertyPrice, downPayment, mortgageTerm, interestRate, location]);

  const calculateCosts = () => {
    const downPaymentAmount = ( propertyPrice * downPayment ) / 100;
    const loanAmount = propertyPrice - downPaymentAmount;
    const monthlyInterestRate = interestRate / 100 / 12;
    const numberOfPayments = mortgageTerm * 12;

    const monthlyPayment =
      ( loanAmount *
        ( monthlyInterestRate *
          Math.pow(1 + monthlyInterestRate, numberOfPayments) ) ) /
      ( Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1 );

    const imt = propertyPrice * 0.06;
    const stampDuty = propertyPrice * 0.008;
    const notaryFees = 1000;
    const registrationFees = 500;

    const totalClosingCosts = imt + stampDuty + notaryFees + registrationFees;
    const totalUpfrontCosts = downPaymentAmount + totalClosingCosts;

    setMonthlyPayment(monthlyPayment);
    setClosingCosts(totalClosingCosts);
    setTotalUpfrontCosts(totalUpfrontCosts);
  };

  const fetchEuriborRates = async () => {
    try {
      const response = await axios.get<EuriborRates>('http://localhost:3001/api/euribor-rates');
      setEuriborRates(response.data);
    } catch (error) {
      console.error('Error fetching Euribor rates:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-center">{t('calculator.title')}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <PropertyDetailsForm
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
        />
        <div>
          <CostsBreakdown
            totalUpfrontCosts={totalUpfrontCosts}
            monthlyPayment={monthlyPayment}
            closingCosts={closingCosts}
          />
          <CostsChart
            propertyPrice={propertyPrice}
            downPayment={downPayment}
          />
        </div>
      </div>
      {euriborRates && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Current Euribor Rates</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div>
              <p className="font-medium">1 Week</p>
              <p>{euriborRates.euribor_1_week.toFixed(3)}%</p>
            </div>
            <div>
              <p className="font-medium">1 Month</p>
              <p>{euriborRates.euribor_1_month.toFixed(3)}%</p>
            </div>
            <div>
              <p className="font-medium">3 Months</p>
              <p>{euriborRates.euribor_3_months.toFixed(3)}%</p>
            </div>
            <div>
              <p className="font-medium">6 Months</p>
              <p>{euriborRates.euribor_6_months.toFixed(3)}%</p>
            </div>
            <div>
              <p className="font-medium">12 Months</p>
              <p>{euriborRates.euribor_12_months.toFixed(3)}%</p>
            </div>
          </div>
        </div>
      )}
      <Actions/>
      <AdvancedOptions
        showAdvancedOptions={showAdvancedOptions}
        setShowAdvancedOptions={setShowAdvancedOptions}
      />
    </div>
  );
};

export default BudgetCalculator;
