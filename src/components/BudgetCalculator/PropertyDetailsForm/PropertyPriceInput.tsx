import { Euro } from 'lucide-react';
import React from 'react';

interface PropertyPriceInputProps {
  propertyPrice: number;
  setPropertyPrice: (value: number) => void;
  presetPropertyPrices: number[];
}

const PropertyPriceInput: React.FC<PropertyPriceInputProps> = ({
                                                                 propertyPrice,
                                                                 setPropertyPrice,
                                                                 presetPropertyPrices,
                                                               }) => {
  return (
    <div>
      <label htmlFor="propertyPrice" className="block text-sm font-medium text-gray-700">
        Property Price (€)
      </label>
      <div className="mt-1 relative rounded-md shadow-sm">
        <div
          className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Euro className="h-5 w-5 text-gray-400"/>
        </div>
        <input
          type="number"
          id="propertyPrice"
          className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 pr-12 sm:text-sm border-gray-300 rounded-md"
          value={propertyPrice}
          onChange={(e) => setPropertyPrice(Number(e.target.value))}
        />
      </div>
      <div className="mt-2 flex flex-wrap gap-2">
        {presetPropertyPrices.map((price) => (
          <button
            key={price}
            onClick={() => setPropertyPrice(price)}
            className="px-2 py-1 text-sm bg-gray-200 rounded hover:bg-gray-300 transition-colors"
          >
            €{price.toLocaleString()}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PropertyPriceInput;
