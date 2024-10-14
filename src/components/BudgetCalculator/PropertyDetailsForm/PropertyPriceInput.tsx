import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(propertyPrice);

  const formatCurrency = (value: number) => {
    return `€${value.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  const handleEditChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditValue(Number(event.target.value));
  };

  const handleEditBlur = () => {
    setPropertyPrice(editValue);
    setIsEditing(false);
  };

  const handleEditClick = () => {
    setEditValue(propertyPrice);
    setIsEditing(true);
  };

  return (
    <div>
      <label htmlFor="propertyPrice" className="block text-sm font-medium text-gray-700">
        {t('calculator.propertyPrice')} (€)
      </label>
      <div
        className="mt-1 relative rounded-md shadow-sm flex items-center justify-center">
        {isEditing ? (
          <input
            type="number"
            value={editValue}
            onChange={handleEditChange}
            onBlur={handleEditBlur}
            className="text-center text-2xl border-gray-300 rounded-md"
            autoFocus
          />
        ) : (
          <div
            className="text-center text-2xl cursor-pointer"
            onClick={handleEditClick}
          >
            {formatCurrency(propertyPrice)}
          </div>
        )}
      </div>
      <div className="mt-2 flex flex-wrap gap-2 justify-center">
        {[100000, 200000, 300000, 400000, 500000, 600000].map((price) => (
          <button
            key={price}
            onClick={() => setPropertyPrice(price)}
            className="px-2 py-1 text-sm bg-gray-200 rounded hover:bg-gray-300 transition-colors"
          >
            {formatCurrency(price)}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PropertyPriceInput;
