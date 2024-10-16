import { HelpCircle } from 'lucide-react';
import React, { useState } from 'react';

interface LocationInputProps {
  location: string;
  setLocation: (value: string) => void;
}

const LocationInput: React.FC<LocationInputProps> = ({
                                                       location,
                                                       setLocation,
                                                     }) => {
  const [isLocationDropdownOpen, setIsLocationDropdownOpen] = useState<boolean>(false);

  return (
    <div>
      <label htmlFor="location" className="block text-sm font-medium text-gray-700">
        Location
      </label>
      <div className="mt-1 relative">
        <button
          type="button"
          className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          onClick={() => setIsLocationDropdownOpen(!isLocationDropdownOpen)}
        >
          <span className="block truncate">{location}</span>
          <span
            className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <HelpCircle className="h-5 w-5 text-gray-400" aria-hidden="true"/>
          </span>
        </button>
        {isLocationDropdownOpen && (
          <div
            className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
            {['Lisboa', 'Porto', 'Faro', 'Coimbra', 'Braga'].map((city) => (
              <div
                key={city}
                className={`${
                  city === location ? 'text-white bg-blue-600' : 'text-gray-900'
                } cursor-default select-none relative py-2 pl-3 pr-9`}
                onClick={() => {
                  setLocation(city);
                  setIsLocationDropdownOpen(false);
                }}
              >
                {city}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LocationInput;
