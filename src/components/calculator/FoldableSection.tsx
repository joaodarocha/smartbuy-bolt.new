import { HelpCircle } from 'lucide-react';
import React from 'react';

interface HideAbleSectionProps {
  showSection: boolean;
  setShowSection: (value: boolean) => void;
  children: React.ReactNode;
}

const FoldableSection: React.FC<HideAbleSectionProps> = ({
                                                           showSection,
                                                           setShowSection,
                                                           children,
                                                         }) => {
  return (
    <div className="mt-8">
      <button
        className="text-blue-600 hover:text-blue-800 flex items-center"
        onClick={() => setShowSection(!showSection)}
      >
        {showSection ? 'Hide' : 'Show'} Details
        <HelpCircle className="h-4 w-4 ml-1"/>
      </button>
      {showSection && (
        <div className="mt-4 p-4 bg-gray-100 rounded-md">
          {children}
        </div>
      )}
    </div>
  );
};

export default FoldableSection;
