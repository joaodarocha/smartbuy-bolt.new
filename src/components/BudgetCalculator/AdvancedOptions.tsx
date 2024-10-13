import React from 'react';
import { HelpCircle } from 'lucide-react';

interface AdvancedOptionsProps {
  showAdvancedOptions: boolean;
  setShowAdvancedOptions: (value: boolean) => void;
}

const AdvancedOptions: React.FC<AdvancedOptionsProps> = ({
  showAdvancedOptions,
  setShowAdvancedOptions,
}) => {
  return (
    <div className="mt-8">
      <button
        className="text-blue-600 hover:text-blue-800 flex items-center"
        onClick={() => setShowAdvancedOptions(!showAdvancedOptions)}
      >
        {showAdvancedOptions ? 'Hide' : 'Show'} Advanced Options
        <HelpCircle className="h-4 w-4 ml-1" />
      </button>
      {showAdvancedOptions && (
        <div className="mt-4 p-4 bg-gray-100 rounded-md">
          <h3 className="text-lg font-semibold mb-2">Advanced Options</h3>
          {/* Add advanced options here */}
          <p>Additional customization options will be added here in future updates.</p>
        </div>
      )}
    </div>
  );
};

export default AdvancedOptions;