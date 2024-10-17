import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import React from 'react';

interface MaterialSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: string[];
  label: string;
}

const MaterialSelect: React.FC<MaterialSelectProps> = ({
                                                         value,
                                                         onChange,
                                                         options,
                                                         label
                                                       }) => {
  return (
    <FormControl fullWidth variant="outlined">
      <InputLabel>{label}</InputLabel>
      <Select
        value={value}
        onChange={(event) => onChange(event.target.value as string)}
        label={label}
      >
        {options.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default MaterialSelect;
