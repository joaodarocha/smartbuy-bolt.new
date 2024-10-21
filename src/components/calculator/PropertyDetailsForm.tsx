import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import MaterialInfo from '../form/MaterialInfo';
import MaterialInput from '../form/MaterialInput';
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
        <div className="flex items-center space-x-2">
          <MaterialInput
            label={t('calculator.propertyPrice')}
            value={propertyPrice}
            onChange={setPropertyPrice}
            type="currency"
          />
          <MaterialInfo description={t('calculator.propertyPriceInfo')}/>
        </div>
        <div className="flex items-center space-x-2">
          <MaterialSwitch
            label={t('calculator.isFirstProperty')}
            checked={isFirstProperty}
            onChange={(e) => setIsFirstProperty(e.target.checked)}
          />
          <MaterialInfo description={t('calculator.isFirstPropertyInfo')}/>
        </div>
        <div className="flex items-center space-x-2">
          <MaterialSwitch
            label={t('calculator.isYoungBuyer')}
            checked={isYoungBuyer}
            onChange={(e) => setIsYoungBuyer(e.target.checked)}
          />
          <MaterialInfo description={t('calculator.isYoungBuyerInfo')}/>
        </div>
        <div className="flex items-center space-x-2">
          <MaterialInput
            label={t(downPaymentLabelKey)}
            value={formattedDownPayment}
            onChange={handleDownPaymentChange}
            type={downPaymentType === '%' ? 'percentage' : 'currency'}
          />
          <MaterialToggle
            value={downPaymentType}
            onChange={handleDownPaymentTypeChange}
            options={[
              { value: '%', label: '%' },
              { value: '€', label: '€' }
            ]}
            ariaLabel={t('calculator.downPayment')}
          />
          <MaterialInfo description={t('calculator.downPaymentInfo')}/>
        </div>
        <div className="flex items-center space-x-2">
          <MaterialInput
            label={t('calculator.mortgageTerm')}
            value={mortgageTerm}
            onChange={setMortgageTerm}
            type="years"
          />
          <MaterialInfo description={t('calculator.mortgageTermInfo')}/>
        </div>
        <div className="flex items-center space-x-2">
          <MaterialInput
            label={t('calculator.interestRate')}
            value={interestRate}
            onChange={setInterestRate}
            type="percentage"
          />
          <MaterialInfo description={t('calculator.interestRateInfo')}/>
        </div>
        <div className="flex items-center space-x-2">
          <MaterialSelect
            value={location}
            onChange={setLocation}
            options={['Continente', 'Madeira e Açores']}
            label={t('calculator.location')}
          />
          <MaterialInfo description={t('calculator.locationInfo')}/>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailsForm;
