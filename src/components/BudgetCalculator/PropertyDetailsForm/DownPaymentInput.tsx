import { Minus, Plus } from 'lucide-react';
import React from 'react';

interface DownPaymentInputProps {
  downPayment: number;
  setDownPayment: (value: number) => void;
  adjustDownPayment: (amount: number) => void;
}

const DownPaymentInput: React.FC<DownPaymentInputProps> = ({
                                                             downPayment,
                                                             setDownPayment,
                                                             adjustDownPayment,
                                                           }) => {
  return (
    <div>
      <label htmlFor="downPayment" className="block text-sm font-medium text-gray-700">
        Down Payment (%)
      </label>
      <div className="mt-1 flex rounded-md shadow-sm">
        <input
          type="number"
          id="downPayment"
          className="focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-l-md"
          value={downPayment}
          onChange={(e) => setDownPayment(Number(e.target.value))}
        />
        <button
          onClick={() => adjustDownPayment(-5)}
          className="inline-flex items-center px-3 rounded-none border border-l-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm hover:bg-gray-100"
        >
          <Minus className="h-4 w-4"/>
        </button>
        <button
          onClick={() => adjustDownPayment(5)}
          className="inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm hover:bg-gray-100"
        >
          <Plus className="h-4 w-4"/>
        </button>
      </div>
      <div className="mt-2 flex gap-2">
        {[10, 20, 30].map((percent) => (
          <button
            key={percent}
            onClick={() => setDownPayment(percent)}
            className="px-2 py-1 text-sm bg-gray-200 rounded hover:bg-gray-300 transition-colors"
          >
            {percent}%
          </button>
        ))}
      </div>
    </div>
  );
};

export default DownPaymentInput;
