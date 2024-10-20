import { Check } from 'lucide-react';
import React from 'react';

const PricingTier: React.FC<{
  name: string;
  price: string;
  features: string[];
  recommended?: boolean;
}> = ({ name, price, features, recommended }) => (
  <div
    className={`bg-white rounded-lg shadow-md p-6 flex flex-col ${recommended ? 'border-2 border-blue-500' : ''}`}>
    {recommended && (
      <span
        className="bg-blue-500 text-white text-xs font-semibold px-3 py-1 rounded-full self-start mb-4">
        Recommended
      </span>
    )}
    <h3 className="text-xl font-semibold mb-2">{name}</h3>
    <p className="text-3xl font-bold mb-4">{price}<span className="text-sm font-normal"> one-time payment</span>
    </p>
    <ul className="space-y-3 mb-6">
      {features.map((feature, index) => (
        <li key={index} className="flex items-center space-x-2">
          <Check className="h-5 w-5 text-green-500"/>
          <span>{feature}</span>
        </li>
      ))}
    </ul>
    <button className={`mt-auto py-2 px-4 rounded-full font-semibold ${
      recommended ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
    } transition duration-300`}>
      Choose Plan
    </button>
  </div>
);

const Pricing: React.FC = () => {
  const tiers = [
    {
      name: 'Advanced',
      price: '20€',
      features: [
        'Down payment calculation',
        'Monthly mortgage cost estimation',
        'Basic ROI calculations',
        'Suitable for home buyers',
      ],
    },
    {
      name: 'Premium',
      price: '50€',
      features: [
        'All Advanced features',
        'Advanced ROI calculations',
        'Cash flow analysis',
        'Property appreciation forecasts',
        'Suitable for real estate investors',
      ],
      recommended: true,
    },
  ];

  return (
    <div id="pricing" className="bg-gray-100 py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Choose Your Plan</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {tiers.map((tier, index) => (
            <PricingTier key={index} {...tier} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pricing;
