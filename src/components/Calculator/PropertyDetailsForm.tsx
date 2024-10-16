import React from 'react';
import { useTranslation } from 'react-i18next';
import MaterialInput from '../MaterialInput';
import LocationInput from './LocationInput';

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
  const { t } = useTranslation();

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">{t('calculator.propertyDetails')}</h2>
      <div className="space-y-4">
        <MaterialInput
          label={t('calculator.propertyPrice')}
          value={propertyPrice}
          onChange={setPropertyPrice}
          type="currency"
        />
        <MaterialInput
          label={t('calculator.downPayment')}
          value={downPayment}
          onChange={setDownPayment}
          type="percentage"
        />
        <MaterialInput
          label={t('calculator.mortgageTerm')}
          value={mortgageTerm}
          onChange={setMortgageTerm}
          type="years"
        />
        <MaterialInput
          label={t('calculator.interestRate')}
          value={interestRate}
          onChange={setInterestRate}
          type="percentage"
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
