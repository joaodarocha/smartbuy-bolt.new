import { CheckCircle, XCircle } from 'lucide-react';
import React from 'react';

const Advantages: React.FC = () => {
  const disadvantages = [
    'Time-consuming manual calculations',
    'Prone to errors and miscalculations',
    'Difficulty in comparing multiple properties',
    'Lack of comprehensive analysis',
  ];

  const advantages = [
    'Quick and accurate ROI calculations',
    'Easy comparison of multiple properties',
    'Comprehensive analysis of investment potential',
    'Data-driven decision making',
  ];

  return (
    <div className="bg-gray-100 py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose Our ROI
          Calculator?</h2>
        <div className="flex flex-col md:flex-row space-y-8 md:space-y-0 md:space-x-8">
          <div className="bg-white rounded-lg shadow-md p-6 md:w-1/2">
            <h3 className="text-xl font-semibold mb-4 text-red-600">Life Before Our
              App</h3>
            <ul className="space-y-3">
              {disadvantages.map((item, index) => (
                <li key={index} className="flex items-center space-x-2">
                  <XCircle className="h-5 w-5 text-red-500"/>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 md:w-1/2">
            <h3 className="text-xl font-semibold mb-4 text-green-600">Life With Our
              App</h3>
            <ul className="space-y-3">
              {advantages.map((item, index) => (
                <li key={index} className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-500"/>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Advantages;
