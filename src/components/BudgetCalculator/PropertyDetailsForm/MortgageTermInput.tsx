import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface MortgageTermInputProps {
  mortgageTerm: number;
  setMortgageTerm: (value: number) => void;
}

const MortgageTermInput: React.FC<MortgageTermInputProps> = ({
                                                               mortgageTerm,
                                                               setMortgageTerm,
                                                             }) => {
  const { t } = useTranslation();
  const [term, setTerm] = useState(40);

  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    setTerm(value);
    setMortgageTerm(value);
  };

  const handleButtonClick = (value: number) => {
    setTerm(value);
    setMortgageTerm(value);
  };

  return (
    <div>
      <label htmlFor="mortgageTerm" className="block text-sm font-medium text-gray-700">
        {t('calculator.mortgageTerm')}
      </label>
      <div className="mt-4 text-2xl font-bold text-center">
        {term} {t('shared.years')}
      </div>
      <input
        type="range"
        id="mortgageTerm"
        min="10"
        max="40"
        step="1"
        value={term}
        onChange={handleSliderChange}
        className="w-full mt-2"
      />
      <div className="mt-4 flex gap-2 justify-center">
        {[10, 15, 20, 25, 30, 35, 40].map((value) => (
          <button
            key={value}
            onClick={() => handleButtonClick(value)}
            className={`px-3 py-2 text-sm rounded transition-colors ${
              term === value ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            {value}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MortgageTermInput;
