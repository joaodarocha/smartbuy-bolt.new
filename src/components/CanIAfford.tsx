import { Info } from 'lucide-react';
import React, { useState } from 'react';

const CanIAfford: React.FC = () => {
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
      <h1 className="text-3xl font-bold mb-6 text-center">Can I afford it?</h1>
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Gross Income
            <span className="ml-2 text-gray-400 cursor-pointer">
              <Info size={16}/>
            </span>
          </label>
          <div className="mt-1 flex">
            <input
              type="number"
              className="focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
              value={income}
              onChange={(e) => setIncome(Number(e.target.value))}
            />
            <select
              className="ml-2 block w-32 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              value={isMonthly ? 'Monthly' : 'Yearly'}
              onChange={(e) => setIsMonthly(e.target.value === 'Monthly')}
            >
              <option>Monthly</option>
              <option>Yearly</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Monthly Debts
            <span className="ml-2 text-gray-400 cursor-pointer">
              <Info size={16}/>
            </span>
          </label>
          <input
            type="number"
            className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
            value={debts}
            onChange={(e) => setDebts(Number(e.target.value))}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Monthly Expenses
            <span className="ml-2 text-gray-400 cursor-pointer">
              <Info size={16}/>
            </span>
          </label>
          <input
            type="number"
            className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
            value={expenses}
            onChange={(e) => setExpenses(Number(e.target.value))}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Property Price
          </label>
          <input
            type="number"
            className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
            value={propertyPrice}
            onChange={(e) => setPropertyPrice(Number(e.target.value))}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Down Payment (%)
          </label>
          <input
            type="number"
            className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
            value={downPayment}
            onChange={(e) => setDownPayment(Number(e.target.value))}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Interest Rate (%)
          </label>
          <input
            type="number"
            className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
            value={interestRate}
            onChange={(e) => setInterestRate(Number(e.target.value))}
            step="0.1"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Mortgage Term (years)
          </label>
          <input
            type="number"
            className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
            value={mortgageTerm}
            onChange={(e) => setMortgageTerm(Number(e.target.value))}
          />
        </div>

        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-4">Affordability Result</h2>
          <div className={`p-4 rounded-md ${affordable ? 'bg-green-100' : 'bg-red-100'}`}>
            {affordable ? (
              <p>You can comfortably afford a mortgage of up to
                €{propertyPrice.toLocaleString()}.</p>
            ) : (
              <p>Based on your financial situation, a mortgage may stretch your
                budget.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CanIAfford;
