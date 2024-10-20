import { useEffect, useState } from 'react';

interface CalculateIMTProps {
  propertyPrice: number;
  location: string;
  isFirstProperty: boolean;
  isYoungBuyer: boolean;
}

const imtContinenteFirstPropertyYoungBuyer = (propertyPrice: number) => {
  if (propertyPrice <= 316772) return { imt: 0, rate: 0 };
  if (propertyPrice <= 633453) return { imt: propertyPrice * 0.08 - 25341.76, rate: 8 };
  if (propertyPrice <= 1102920) return { imt: propertyPrice * 0.06, rate: 6 };
  return { imt: propertyPrice * 0.075, rate: 7.5 };
};

const imtContinenteFirstProperty = (propertyPrice: number) => {
  if (propertyPrice <= 101917) return { imt: 0, rate: 0 };
  if (propertyPrice <= 139412) return { imt: propertyPrice * 0.02 - 2038.34, rate: 2 };
  if (propertyPrice <= 190086) return { imt: propertyPrice * 0.05 - 6220.70, rate: 5 };
  if (propertyPrice <= 316772) return { imt: propertyPrice * 0.07 - 10022.42, rate: 7 };
  if (propertyPrice <= 633453) return { imt: propertyPrice * 0.08 - 13190.14, rate: 8 };
  if (propertyPrice <= 1102920) return { imt: propertyPrice * 0.06, rate: 6 };
  return { imt: propertyPrice * 0.075, rate: 7.5 };
};

const imtContinente = (propertyPrice: number) => {
  if (propertyPrice <= 101917) return { imt: propertyPrice * 0.01, rate: 1 };
  if (propertyPrice <= 139412) return { imt: propertyPrice * 0.02 - 1019.17, rate: 2 };
  if (propertyPrice <= 190086) return { imt: propertyPrice * 0.05 - 5201.53, rate: 5 };
  if (propertyPrice <= 316772) return { imt: propertyPrice * 0.07 - 9003.25, rate: 7 };
  if (propertyPrice <= 607528) return { imt: propertyPrice * 0.08 - 12170.97, rate: 8 };
  if (propertyPrice <= 1102920) return { imt: propertyPrice * 0.06, rate: 6 };
  return { imt: propertyPrice * 0.075, rate: 7.5 };
};

const imtMadeiraAcoresFirstPropertyYoungBuyer = (propertyPrice: number) => {
  if (propertyPrice <= 395965) return { imt: 0, rate: 0 };
  if (propertyPrice <= 791816) return { imt: propertyPrice * 0.08 - 31677.20, rate: 8 };
  if (propertyPrice <= 1378650) return { imt: propertyPrice * 0.06, rate: 6 };
  return { imt: propertyPrice * 0.075, rate: 7.5 };
};

const imtMadeiraAcoresFirstProperty = (propertyPrice: number) => {
  if (propertyPrice <= 127396) return { imt: 0, rate: 0 };
  if (propertyPrice <= 174265) return { imt: propertyPrice * 0.02 - 2547.92, rate: 2 };
  if (propertyPrice <= 237608) return { imt: propertyPrice * 0.05 - 7755.87, rate: 5 };
  if (propertyPrice <= 395965) return { imt: propertyPrice * 0.07 - 12528.03, rate: 7 };
  if (propertyPrice <= 791816) return { imt: propertyPrice * 0.08 - 16487.68, rate: 8 };
  if (propertyPrice <= 1378650) return { imt: propertyPrice * 0.06, rate: 6 };
  return { imt: propertyPrice * 0.075, rate: 7.5 };
};

const imtMadeiraAcores = (propertyPrice: number) => {
  if (propertyPrice <= 127396) return { imt: propertyPrice * 0.01, rate: 1 };
  if (propertyPrice <= 174265) return { imt: propertyPrice * 0.02 - 1273.96, rate: 2 };
  if (propertyPrice <= 237608) return { imt: propertyPrice * 0.05 - 6501.91, rate: 5 };
  if (propertyPrice <= 395965) return { imt: propertyPrice * 0.07 - 11254.07, rate: 7 };
  if (propertyPrice <= 759410) return { imt: propertyPrice * 0.08 - 15213.72, rate: 8 };
  if (propertyPrice <= 1378650) return { imt: propertyPrice * 0.06, rate: 6 };
  return { imt: propertyPrice * 0.075, rate: 7.5 };
};

const calculateIMT = ({
                        propertyPrice,
                        location,
                        isFirstProperty,
                        isYoungBuyer
                      }: CalculateIMTProps) => {
  if (location === 'Continente') {
    if (isFirstProperty) {
      return isYoungBuyer
        ? imtContinenteFirstPropertyYoungBuyer(propertyPrice)
        : imtContinenteFirstProperty(propertyPrice);
    }
    return imtContinente(propertyPrice);
  }
  else if (location === 'Madeira' || location === 'Açores') {
    if (isFirstProperty) {
      return isYoungBuyer
        ? imtMadeiraAcoresFirstPropertyYoungBuyer(propertyPrice)
        : imtMadeiraAcoresFirstProperty(propertyPrice);
    }
    return imtMadeiraAcores(propertyPrice);
  }
  return { imt: 0, rate: 0 };
};

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
