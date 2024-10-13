import React from 'react';

interface MortgageTermInputProps {
  mortgageTerm: number;
  setMortgageTerm: (value: number) => void;
}

const MortgageTermInput: React.FC<MortgageTermInputProps> = ({
                                                               mortgageTerm,
                                                               setMortgageTerm,
                                                             }) => {
  return (
    <div>
      <label htmlFor="mortgageTerm" className="block text-sm font-medium text-gray-700">
        Mortgage Term (years)
      </label>
      <div className="mt-1 flex gap-2">
        {[10, 15, 20, 25, 30].map((term) => (
          <button
            key={term}
            onClick={() => setMortgageTerm(term)}
            className={`px-3 py-2 text-sm rounded transition-colors ${
              mortgageTerm === term ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            {term}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MortgageTermInput;
