import React from 'react';
import DownPaymentInput from './DownPaymentInput';
import InterestRateInput from './InterestRateInput';
import LocationInput from './LocationInput';
import MortgageTermInput from './MortgageTermInput';
import PropertyPriceInput from './PropertyPriceInput';

interface PropertyDetailsFormProps {
  propertyPrice: number;
  setPropertyPrice: (value: number) => void;
  downPayment: number;
  setDownPayment: (value: number) => void;
  mortgageTerm: number;
  setMortgageTerm: (value: number) => void;
  interestRate: number;
  setInterestRate: (value: number) => void;
  location: string;
  setLocation: (value: string) => void;
}

const PropertyDetailsForm: React.FC<PropertyDetailsFormProps> = ({
                                                                   propertyPrice,
                                                                   setPropertyPrice,
                                                                   downPayment,
                                                                   setDownPayment,
                                                                   mortgageTerm,
                                                                   setMortgageTerm,
                                                                   interestRate,
                                                                   setInterestRate,
                                                                   location,
                                                                   setLocation,
                                                                 }) => {
  const adjustDownPayment = (amount: number) => {
    setDownPayment(Math.max(0, Math.min(100, downPayment + amount)));
  };

  const presetPropertyPrices = [100000, 150000, 200000, 250000, 300000];

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Property Details</h2>
      <div className="space-y-4">
        <PropertyPriceInput
          propertyPrice={propertyPrice}
          setPropertyPrice={setPropertyPrice}
          presetPropertyPrices={presetPropertyPrices}
        />
        <DownPaymentInput
          downPayment={downPayment}
          setDownPayment={setDownPayment}
          adjustDownPayment={adjustDownPayment}
        />
        <MortgageTermInput
          mortgageTerm={mortgageTerm}
          setMortgageTerm={setMortgageTerm}
        />
        <InterestRateInput
          interestRate={interestRate}
          setInterestRate={setInterestRate}
        />
        <LocationInput
          location={location}
          setLocation={setLocation}
        />
      </div>
    </div>
  );
};

export default PropertyDetailsForm;
