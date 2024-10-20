import { useEffect, useState } from 'react';
import { calculateIMT } from './calculate-imt';

interface CalculateIMTProps {
  propertyPrice: number;
  location: string;
  isFirstProperty: boolean;
  isYoungBuyer: boolean;
}

const useCalculateIMT = ({
                           propertyPrice,
                           location,
                           isFirstProperty,
                           isYoungBuyer
                         }: CalculateIMTProps) => {
  const [imt, setIMT] = useState<number>(0);
  const [rate, setRate] = useState<number>(0);

  useEffect(() => {
    const { imt, rate } = calculateIMT({
      propertyPrice,
      location,
      isFirstProperty,
      isYoungBuyer
    });
    setIMT(imt);
    setRate(rate);
  }, [propertyPrice, location, isFirstProperty, isYoungBuyer]);

  return { imt, rate };
};

export default useCalculateIMT;
