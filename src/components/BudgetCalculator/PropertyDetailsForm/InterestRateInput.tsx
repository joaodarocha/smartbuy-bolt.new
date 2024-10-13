import React from 'react';

interface InterestRateInputProps {
  interestRate: number;
  setInterestRate: (value: number) => void;
}

const InterestRateInput: React.FC<InterestRateInputProps> = ({
                                                               interestRate,
                                                               setInterestRate,
                                                             }) => {
  return (
    <div>
      <label htmlFor="interestRate" className="block text-sm font-medium text-gray-700">
        Interest Rate (%)
      </label>
      <input
        type="number"
        id="interestRate"
        className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        value={interestRate}
        onChange={(e) => setInterestRate(Number(e.target.value))}
        step="0.1"
      />
    </div>
  );
};

export default InterestRateInput;
