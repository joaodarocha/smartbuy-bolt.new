import React from 'react';

interface CostsBreakdownProps {
  totalUpfrontCosts: number;
  monthlyPayment: number;
  closingCosts: number;
}

const CostsBreakdown: React.FC<CostsBreakdownProps> = ({
  totalUpfrontCosts,
  monthlyPayment,
  closingCosts,
}) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Cost Breakdown</h2>
      <div className="space-y-4">
        <div>
          <p className="text-sm font-medium text-gray-700">Total Upfront Costs</p>
          <p className="text-2xl font-bold text-blue-600">€{totalUpfrontCosts.toFixed(2)}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-700">Monthly Mortgage Payment</p>
          <p className="text-2xl font-bold text-green-600">€{monthlyPayment.toFixed(2)}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-700">Closing Costs</p>
          <p className="text-2xl font-bold text-red-600">€{closingCosts.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};

export default CostsBreakdown;