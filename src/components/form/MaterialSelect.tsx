import InfoIcon from '@mui/icons-material/Info';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Tooltip from '@mui/material/Tooltip';
import React from 'react';

interface MaterialSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: string[];
  label: string;
  tooltip: string;
}

const MaterialSelect: React.FC<MaterialSelectProps> = ({
                                                         value,
                                                         onChange,
                                                         options,
                                                         label,
                                                         tooltip
                                                       }) => {
  return (
    <div>
      <div className="flex items-center mb-2">
        <InputLabel>{label}</InputLabel>
        <Tooltip title={tooltip}>
          <InfoIcon className="ml-2"/>
        </Tooltip>
      </div>
      <FormControl fullWidth variant="outlined">
        <Select
          value={value}
          onChange={(event) => onChange(event.target.value as string)}
        >
          {options.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default MaterialSelect;
