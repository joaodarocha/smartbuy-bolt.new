import InfoIcon from '@mui/icons-material/Info';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses, TooltipProps } from '@mui/material/Tooltip';
import React from 'react';

interface MaterialInfoProps {
  description: string;
}

const BiggerTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} children={props.children}/>
))(() => ( {
  [`& .${tooltipClasses.tooltip}`]: {
    opacity: 1,
    color: 'white',
    fontSize: '1.1em',
  },
} ));

const MaterialInfo: React.FC<MaterialInfoProps> = ({ description }) => {
  return (
    <BiggerTooltip title={description} arrow placement="top">
      <IconButton>
        <InfoIcon/>
      </IconButton>
    </BiggerTooltip>
  );
};

export default MaterialInfo;
