import InputAdornment from '@mui/material/InputAdornment/index';
import TextField from '@mui/material/TextField';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface MaterialInputProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  type: 'currency' | 'percentage' | 'years';
}

const MaterialInput: React.FC<MaterialInputProps> = ({
                                                       label,
                                                       value,
                                                       onChange,
                                                       type
                                                     }) => {
  const { t } = useTranslation();
  const [inputValue, setInputValue] = useState<string>(value.toString());
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value).replace('€', '').trim();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setInputValue(inputValue);

    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    const newTimeoutId = setTimeout(() => {
      const numericValue = type === 'currency' ? Number(inputValue.replace(/,/g, '')) : Number(inputValue);
      onChange(numericValue);
      setInputValue(type === 'currency' ? formatCurrency(numericValue) : numericValue.toString());
    }, 600);

    setTimeoutId(newTimeoutId);
  };

  useEffect(() => {
    setInputValue(type === 'currency' ? formatCurrency(value) : value.toString());
  }, [value, type]);

  return (
    <TextField
      label={label}
      value={inputValue}
      onChange={handleChange}
      InputProps={{
        startAdornment: type === 'currency' ?
          <InputAdornment position="start">€</InputAdornment> : null,
        endAdornment: type === 'percentage' ?
          <InputAdornment position="end">%</InputAdornment> :
          type === 'years' ? <InputAdornment
            position="end">{t('calculator.years')}</InputAdornment> : null,
      }}
      fullWidth
      variant="outlined"
    />
  );
};

export default MaterialInput;
