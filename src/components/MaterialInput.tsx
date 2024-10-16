import InputAdornment from '@mui/material/InputAdornment/index';
import TextField from '@mui/material/TextField';
import React from 'react';

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

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(Number(event.target.value));
  };

  return (
    <TextField
      label={label}
      value={value}
      onChange={handleChange}
      InputProps={{
        startAdornment: type === 'currency' ?
          <InputAdornment position="start">€</InputAdornment> : null,
        endAdornment: type === 'percentage' ?
          <InputAdornment position="end">%</InputAdornment> : null,
      }}
      fullWidth
      variant="outlined"
    />
  );
};

export default MaterialInput;
