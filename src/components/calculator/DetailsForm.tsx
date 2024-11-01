import InputContainer from '@/components/form/InputContainer';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import MaterialSelect from '../form/MaterialSelect';
import MaterialSwitch from '../form/MaterialSwitch';
import MaterialToggle from '../form/MaterialToggle';

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
  isFirstProperty: boolean;
  setIsFirstProperty: (value: boolean) => void;
  isYoungBuyer: boolean;
  setIsYoungBuyer: (value: boolean) => void;
}

const DetailsForm: React.FC<PropertyDetailsFormProps> = ({
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
                                                           isFirstProperty,
                                                           setIsFirstProperty,
                                                           isYoungBuyer,
                                                           setIsYoungBuyer,
                                                         }) => {
  const { t } = useTranslation();
  const [downPaymentType, setDownPaymentType] = useState<string>('%');

  const handleDownPaymentChange = (value: number) => {
    if (downPaymentType === '%') {
      setDownPayment(value);
    }
    else {
      const percentageValue = ( value / propertyPrice ) * 100;
      setDownPayment(percentageValue);
    }
  };

  const handleDownPaymentTypeChange = (
    event: React.MouseEvent<HTMLElement>,
    newType: string
  ) => {
    if (newType !== null) {
      setDownPaymentType(newType);
    }
  };

  const formattedDownPayment =
    downPaymentType === '%' ? downPayment : ( downPayment / 100 ) * propertyPrice;

  const downPaymentLabelKey =
    downPaymentType === '%' ? 'calculator.downPaymentPercentage' : 'calculator.downPaymentCurrency';

  return (
    <div className="p-[5px]">
      <h2 className="text-xl font-semibold mb-4">{t('calculator.propertyDetails')}</h2>
      <div className="space-y-4">
        <div>
          <InputContainer
            title={t('calculator.propertyPrice')}
            tooltip={t('calculator.propertyPriceInfo')}
            value={propertyPrice}
            onChange={setPropertyPrice}
            type="currency"
          />
        </div>
        <div>
          <MaterialSwitch
            label={t('calculator.isFirstProperty')}
            checked={isFirstProperty}
            onChange={(e) => setIsFirstProperty(e.target.checked)}
          />
        </div>
        <div>
          <MaterialSwitch
            label={t('calculator.isYoungBuyer')}
            checked={isYoungBuyer}
            onChange={(e) => setIsYoungBuyer(e.target.checked)}
          />
        </div>
        <div>
          <MaterialToggle
            value={downPaymentType}
            onChange={handleDownPaymentTypeChange}
            options={[
              { value: '%', label: '%' },
              { value: '€', label: '€' }
            ]}
            ariaLabel={t('calculator.downPayment')}
          />
          <InputContainer
            title={t(downPaymentLabelKey)}
            tooltip={t('calculator.downPaymentInfo')}
            value={formattedDownPayment}
            onChange={handleDownPaymentChange}
            type={downPaymentType === '%' ? 'percentage' : 'currency'}
          />
        </div>
        <div>
          <InputContainer
            title={t('calculator.mortgageTerm')}
            tooltip={t('calculator.mortgageTermInfo')}
            value={mortgageTerm}
            onChange={setMortgageTerm}
            type="years"
          />
        </div>
        <div>
          <InputContainer
            title={t('calculator.interestRate')}
            tooltip={t('calculator.interestRateInfo')}
            value={interestRate}
            onChange={setInterestRate}
            type="percentage"
          />
        </div>
        <div>
          <MaterialSelect
            value={location}
            onChange={setLocation}
            options={['Continente', 'Madeira e Açores']}
            label={t('calculator.location')}
            tooltip={t('calculator.locationInfo')}
          />
        </div>
      </div>
    </div>
  );
};

export default DetailsForm;
