import React from 'react';
import { Save, FileDown } from 'lucide-react';

const Actions: React.FC = () => {
  const handleSave = () => {
    // Implement save functionality
    console.log('Saving calculation...');
  };

  const handleExport = () => {
    // Implement export functionality
    console.log('Exporting calculation...');
  };

  return (
    <div className="mt-8">
      <button
        className="mr-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        onClick={handleSave}
      >
        <Save className="h-5 w-5 mr-2" />
        Save Calculation
      </button>
      <button
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        onClick={handleExport}
      >
        <FileDown className="h-5 w-5 mr-2" />
        Export as PDF
      </button>
    </div>
  );
};

export default Actions;