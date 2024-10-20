import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import React from 'react';

interface MaterialSwitchProps {
  label: string;
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const MaterialSwitch: React.FC<MaterialSwitchProps> = ({ label, checked, onChange }) => {
  return (
    <FormControlLabel
      control={<Switch checked={checked} onChange={onChange}/>}
      label={label}
    />
  );
};

export default MaterialSwitch;
