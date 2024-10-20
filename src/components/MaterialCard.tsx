import { Card, CardContent, Typography } from '@mui/material';
import React, { useState } from 'react';
import FoldableSection from './calculator/FoldableSection';

interface MaterialCardProps {
  title: string;
  value: number;
  color: string;
  breakdown: React.ReactNode;
}

const MaterialCard: React.FC<MaterialCardProps> = ({
                                                     title,
                                                     value,
                                                     color,
                                                     breakdown
                                                   }) => {
  const [showBreakdown, setShowBreakdown] = useState(false);

  return (
    <Card>
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
        <FoldableSection showSection={showBreakdown} setShowSection={setShowBreakdown}>
          {breakdown}
        </FoldableSection>
      </CardContent>
    </Card>
  );
};

export default MaterialCard;
