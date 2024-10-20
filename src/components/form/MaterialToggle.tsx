import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import React from 'react';

interface MaterialToggleProps {
  value: string;
  onChange: (event: React.MouseEvent<HTMLElement>, newValue: string) => void;
  options: { value: string; label: string }[];
  ariaLabel: string;
}

const MaterialToggle: React.FC<MaterialToggleProps> = ({
                                                         value,
                                                         onChange,
                                                         options,
                                                         ariaLabel
                                                       }) => {
  return (
    <ToggleButtonGroup value={value} exclusive onChange={onChange} aria-label={ariaLabel}>
      {options.map((option) => (
        <ToggleButton key={option.value} value={option.value} aria-label={option.label}>
          {option.label}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
};

export default MaterialToggle;
