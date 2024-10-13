import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';
import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const AdvancedCalculator: React.FC = () => {
  const [purchasePrice, setPurchasePrice] = useState('');
  const [monthlyRent, setMonthlyRent] = useState('');
  const [annualExpenses, setAnnualExpenses] = useState('');
  const [propertyAppreciation, setPropertyAppreciation] = useState('');
  const [mortgageInterestRate, setMortgageInterestRate] = useState('');
  const [mortgageTerm, setMortgageTerm] = useState('');
  const [downPayment, setDownPayment] = useState('');
  const [roi, setRoi] = useState<number | null>(null);
  const [chartData, setChartData] = useState<any>(null);

  const calculateROI = () => {
    const price = parseFloat(purchasePrice);
    const rent = parseFloat(monthlyRent);
    const expenses = parseFloat(annualExpenses);
    const appreciation = parseFloat(propertyAppreciation) / 100;
    const interestRate = parseFloat(mortgageInterestRate) / 100;
    const term = parseFloat(mortgageTerm);
    const down = parseFloat(downPayment);

    if ([price, rent, expenses, appreciation, interestRate, term, down].some(isNaN)) {
      alert('Please enter valid numbers for all fields');
      return;
    }

    const loanAmount = price - down;
    const monthlyInterestRate = interestRate / 12;
    const numberOfPayments = term * 12;
    const monthlyMortgagePayment = ( loanAmount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments) ) / ( Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1 );

    const annualRent = rent * 12;
    const annualMortgagePayment = monthlyMortgagePayment * 12;
    const annualCashFlow = annualRent - expenses - annualMortgagePayment;
    const appreciationValue = price * appreciation;
    const totalReturn = annualCashFlow + appreciationValue;
    const calculatedRoi = ( totalReturn / down ) * 100;

    setRoi(parseFloat(calculatedRoi.toFixed(2)));

    // Calculate mortgage amortization and equity
    const labels = [];
    const principalData = [];
    const equityData = [];
    let remainingPrincipal = loanAmount;
    let propertyValue = price;

    for (let year = 0; year <= term; year++) {
      labels.push(`Year ${year}`);
      principalData.push(remainingPrincipal);
      equityData.push(propertyValue - remainingPrincipal);

      for (let month = 0; month < 12; month++) {
        if (year < term) {
          const interestPayment = remainingPrincipal * monthlyInterestRate;
          const principalPayment = monthlyMortgagePayment - interestPayment;
          remainingPrincipal -= principalPayment;
        }
      }
      propertyValue *= ( 1 + appreciation );
    }

    setChartData({
      labels,
      datasets: [
        {
          label: 'Remaining Principal',
          data: principalData,
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
          label: 'Total Equity',
          data: equityData,
          borderColor: 'rgb(53, 162, 235)',
          backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
      ],
    });
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-4">Advanced ROI Calculator</h2>
      <div className="space-y-4">
        <div>
          <label htmlFor="purchasePrice"
                 className="block text-sm font-medium text-gray-700">
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
          <label htmlFor="monthlyRent"
                 className="block text-sm font-medium text-gray-700">
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
          <label htmlFor="annualExpenses"
                 className="block text-sm font-medium text-gray-700">
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
        <div>
          <label htmlFor="propertyAppreciation"
                 className="block text-sm font-medium text-gray-700">
            Annual Property Appreciation (%)
          </label>
          <input
            type="number"
            id="propertyAppreciation"
            value={propertyAppreciation}
            onChange={(e) => setPropertyAppreciation(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="mortgageInterestRate"
                 className="block text-sm font-medium text-gray-700">
            Mortgage Interest Rate (%)
          </label>
          <input
            type="number"
            id="mortgageInterestRate"
            value={mortgageInterestRate}
            onChange={(e) => setMortgageInterestRate(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="mortgageTerm"
                 className="block text-sm font-medium text-gray-700">
            Mortgage Term (years)
          </label>
          <input
            type="number"
            id="mortgageTerm"
            value={mortgageTerm}
            onChange={(e) => setMortgageTerm(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="downPayment"
                 className="block text-sm font-medium text-gray-700">
            Down Payment (€)
          </label>
          <input
            type="number"
            id="downPayment"
            value={downPayment}
            onChange={(e) => setDownPayment(e.target.value)}
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
      {chartData && (
        <div className="mt-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Mortgage Principal and
            Equity Over Time</h3>
          <Line data={chartData} options={{
            responsive: true,
            plugins: {
              legend: {
                position: 'top' as const,
              },
              title: {
                display: true,
                text: 'Mortgage Principal and Equity',
              },
            },
          }}/>
        </div>
      )}
    </div>
  );
};

export default AdvancedCalculator;
