import React, { useState } from 'react';

const BasicCalculator: React.FC = () => {
  const [purchasePrice, setPurchasePrice] = useState('');
  const [monthlyRent, setMonthlyRent] = useState('');
  const [annualExpenses, setAnnualExpenses] = useState('');
  const [roi, setRoi] = useState<number | null>(null);

  const calculateROI = () => {
    const price = parseFloat(purchasePrice);
    const rent = parseFloat(monthlyRent);
    const expenses = parseFloat(annualExpenses);

    if (isNaN(price) || isNaN(rent) || isNaN(expenses)) {
      alert('Please enter valid numbers for all fields');
      return;
    }

    const annualRent = rent * 12;
    const annualProfit = annualRent - expenses;
    const calculatedRoi = (annualProfit / price) * 100;
    setRoi(parseFloat(calculatedRoi.toFixed(2)));
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-4">Basic ROI Calculator</h2>
      <div className="space-y-4">
        <div>
          <label htmlFor="purchasePrice" className="block text-sm font-medium text-gray-700">
            Purchase Price (€)
          </label>
          <input
            type="number"
            id="purchasePrice"
            value={purchasePrice}
            onChange={(e) => setPurchasePrice(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="monthlyRent" className="block text-sm font-medium text-gray-700">
            Monthly Rent (€)
          </label>
          <input
            type="number"
            id="monthlyRent"
            value={monthlyRent}
            onChange={(e) => setMonthlyRent(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="annualExpenses" className="block text-sm font-medium text-gray-700">
            Annual Expenses (€)
          </label>
          <input
            type="number"
            id="annualExpenses"
            value={annualExpenses}
            onChange={(e) => setAnnualExpenses(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <button
          onClick={calculateROI}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Calculate ROI
        </button>
      </div>
      {roi !== null && (
        <div className="mt-6 p-4 bg-gray-50 rounded-md">
          <h3 className="text-lg font-medium text-gray-900">Result</h3>
          <p className="mt-2 text-3xl font-bold text-blue-600">{roi}% ROI</p>
        </div>
      )}
    </div>
  );
};

export default BasicCalculator;