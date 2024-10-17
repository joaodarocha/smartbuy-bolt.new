import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import MaterialInput from '../form/MaterialInput';
import MaterialSelect from '../form/MaterialSelect';

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
  const [downPaymentType, setDownPaymentType] = useState<'%' | '€'>('%');

  const handleDownPaymentChange = (value: number) => {
    if (downPaymentType === '%') {
      setDownPayment(value);
    }
    else {
      const percentageValue = ( value / propertyPrice ) * 100;
      setDownPayment(percentageValue);
    }
  };

  const formattedDownPayment = downPaymentType === '%' ? downPayment : ( downPayment / 100 ) * propertyPrice;

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
        <div className="flex items-center space-x-2">
          <MaterialInput
            label={t('calculator.downPayment')}
            value={formattedDownPayment}
            onChange={handleDownPaymentChange}
            type={downPaymentType === '%' ? 'percentage' : 'currency'}
          />
          <MaterialSelect
            value={downPaymentType}
            onChange={(value) => setDownPaymentType(value as '%' | '€')}
            options={['%', '€']}
            label={t('calculator.downPaymentType')}
          />
        </div>
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
        <MaterialSelect
          value={location}
          onChange={setLocation}
          options={['Continente', 'Madeira', 'Açores']}
          label={t('calculator.location')}
        />
      </div>
    </div>
  );
};

export default PropertyDetailsForm;
