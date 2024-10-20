import { Card, CardContent, Typography } from '@mui/material';
import React from 'react';

interface MaterialCardProps {
  title: string;
  value: number;
  color: string;
}

const MaterialCard: React.FC<MaterialCardProps> = ({ title, value, color }) => {
  return (
    <Card className="shadow-lg">
      <CardContent>
        <Typography variant="h6" color="textSecondary" gutterBottom>
          {title}
        </Typography>
        <Typography variant="h4" style={{ color }}>
          €{value.toLocaleString('en-US', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default MaterialCard;
