import { Calculator, LogOut } from 'lucide-react';
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import AdvancedCalculator from './AdvancedCalculator';
import BasicCalculator from './BasicCalculator';
import Footer from './Footer';
import PremiumCalculator from './PremiumCalculator';

const HomePage: React.FC = () => {
  const { logout } = useAuth();
  const [activeCalculator, setActiveCalculator] = useState<'basic' | 'advanced' | 'premium'>('basic');
  const [totalInvestment, setTotalInvestment] = useState(0);
  const [netRoi, setNetRoi] = useState(0);
  const [annualRoi, setAnnualRoi] = useState(0);

  const updateOverview = (investment: number, roi: number) => {
    setTotalInvestment(investment);
    setNetRoi(roi);
    setAnnualRoi(roi / 5); // Assuming a 5-year investment period
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-white shadow">
        <div
          className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <Calculator className="h-8 w-8 text-blue-600 mr-2"/>
            ROI Calculator
          </h1>
          <button
            onClick={logout}
            className="flex items-center text-gray-600 hover:text-gray-900"
          >
            <LogOut className="h-5 w-5 mr-1"/>
            Logout
          </button>
        </div>
      </header>
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="bg-white shadow rounded-lg p-6 mb-6">
              <h2 className="text-2xl font-semibold mb-4">Investment Overview</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-blue-100 p-4 rounded-lg">
                  <h3 className="text-lg font-medium text-blue-800">Total Investment</h3>
                  <p
                    className="text-2xl font-bold text-blue-600">€{totalInvestment.toLocaleString()}</p>
                </div>
                <div className="bg-green-100 p-4 rounded-lg">
                  <h3 className="text-lg font-medium text-green-800">Net ROI</h3>
                  <p
                    className="text-2xl font-bold text-green-600">{netRoi.toFixed(2)}%</p>
                </div>
                <div className="bg-purple-100 p-4 rounded-lg">
                  <h3 className="text-lg font-medium text-purple-800">Annual ROI</h3>
                  <p
                    className="text-2xl font-bold text-purple-600">{annualRoi.toFixed(2)}%</p>
                </div>
              </div>
            </div>
            <div className="bg-white shadow rounded-lg p-6">
              <div className="mb-6">
                <h2 className="text-2xl font-semibold mb-4">ROI Calculator</h2>
                <div className="flex space-x-4">
                  <button
                    onClick={() => setActiveCalculator('basic')}
                    className={`px-4 py-2 rounded-md ${activeCalculator === 'basic' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                  >
                    Basic
                  </button>
                  <button
                    onClick={() => setActiveCalculator('advanced')}
                    className={`px-4 py-2 rounded-md ${activeCalculator === 'advanced' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                  >
                    Advanced
                  </button>
                  <button
                    onClick={() => setActiveCalculator('premium')}
                    className={`px-4 py-2 rounded-md ${activeCalculator === 'premium' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                  >
                    Premium
                  </button>
                </div>
              </div>
              {activeCalculator === 'basic' && <BasicCalculator/>}
              {activeCalculator === 'advanced' && <AdvancedCalculator/>}
              {activeCalculator === 'premium' && <PremiumCalculator/>}
            </div>
          </div>
        </div>
      </main>
      <Footer/>
    </div>
  );
};

export default HomePage;
