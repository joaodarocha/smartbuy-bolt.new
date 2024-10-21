import InfoIcon from '@mui/icons-material/Info';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import React from 'react';

interface MaterialInfoProps {
  description: string;
}

const MaterialInfo: React.FC<MaterialInfoProps> = ({ description }) => {
  return (
    <Tooltip title={description} arrow>
      <IconButton>
        <InfoIcon/>
      </IconButton>
    </Tooltip>
  );
};

export default MaterialInfo;
