// calculate-imt.ts
interface CalculateIMTProps {
  propertyPrice: number;
  location: string;
  isFirstProperty: boolean;
  isYoungBuyer: boolean;
}

export const calculateIMT = ({
                               propertyPrice,
                               location,
                               isFirstProperty,
                               isYoungBuyer
                             }: CalculateIMTProps): { imt: number, rate: number } => {
  let imt = 0;
  let rate = 0;

  if (location === 'Continente') {
    if (isFirstProperty) {
      if (isYoungBuyer) {
        if (propertyPrice <= 316772) {
          imt = 0;
          rate = 0;
        }
        else if (propertyPrice <= 633453) {
          imt = propertyPrice * 0.08 - 25341.76;
          rate = 8;
        }
        else if (propertyPrice <= 1102920) {
          imt = propertyPrice * 0.06;
          rate = 6;
        }
        else {
          imt = propertyPrice * 0.075;
          rate = 7.5;
        }
      }
      else {
        if (propertyPrice <= 101917) {
          imt = 0;
          rate = 0;
        }
        else if (propertyPrice <= 139412) {
          imt = propertyPrice * 0.02 - 1019.17;
          rate = 2;
        }
        else if (propertyPrice <= 190086) {
          imt = propertyPrice * 0.05 - 5201.53;
          rate = 5;
        }
        else if (propertyPrice <= 316772) {
          imt = propertyPrice * 0.07 - 9003.25;
          rate = 7;
        }
        else if (propertyPrice <= 607528) {
          imt = propertyPrice * 0.08 - 12170.97;
          rate = 8;
        }
        else if (propertyPrice <= 1102920) {
          imt = propertyPrice * 0.06;
          rate = 6;
        }
        else {
          imt = propertyPrice * 0.075;
          rate = 7.5;
        }
      }
    }
    else {
      if (propertyPrice <= 101917) {
        imt = propertyPrice * 0.01;
        rate = 1;
      }
      else if (propertyPrice <= 139412) {
        imt = propertyPrice * 0.02 - 1019.17;
        rate = 2;
      }
      else if (propertyPrice <= 190086) {
        imt = propertyPrice * 0.05 - 5201.53;
        rate = 5;
      }
      else if (propertyPrice <= 316772) {
        imt = propertyPrice * 0.07 - 9003.25;
        rate = 7;
      }
      else if (propertyPrice <= 607528) {
        imt = propertyPrice * 0.08 - 12170.97;
        rate = 8;
      }
      else if (propertyPrice <= 1102920) {
        imt = propertyPrice * 0.06;
        rate = 6;
      }
      else {
        imt = propertyPrice * 0.075;
        rate = 7.5;
      }
    }
  }
  else if (location === 'Madeira' || location === 'Açores') {
    if (isFirstProperty) {
      if (isYoungBuyer) {
        if (propertyPrice <= 395965) {
          imt = 0;
          rate = 0;
        }
        else if (propertyPrice <= 791816) {
          imt = propertyPrice * 0.08 - 31677.20;
          rate = 8;
        }
        else if (propertyPrice <= 1378650) {
          imt = propertyPrice * 0.06;
          rate = 6;
        }
        else {
          imt = propertyPrice * 0.075;
          rate = 7.5;
        }
      }
      else {
        if (propertyPrice <= 127396) {
          imt = 0;
          rate = 0;
        }
        else if (propertyPrice <= 174265) {
          imt = propertyPrice * 0.02 - 2547.92;
          rate = 2;
        }
        else if (propertyPrice <= 237608) {
          imt = propertyPrice * 0.05 - 7775.87;
          rate = 5;
        }
        else if (propertyPrice <= 395965) {
          imt = propertyPrice * 0.07 - 12528.03;
          rate = 7;
        }
        else if (propertyPrice <= 791816) {
          imt = propertyPrice * 0.08 - 16487.68;
          rate = 8;
        }
        else if (propertyPrice <= 1378650) {
          imt = propertyPrice * 0.06;
          rate = 6;
        }
        else {
          imt = propertyPrice * 0.075;
          rate = 7.5;
        }
      }
    }
    else {
      if (propertyPrice <= 127396) {
        imt = propertyPrice * 0.01;
        rate = 1;
      }
      else if (propertyPrice <= 174265) {
        imt = propertyPrice * 0.02 - 1273.96;
        rate = 2;
      }
      else if (propertyPrice <= 237608) {
        imt = propertyPrice * 0.05 - 6501.91;
        rate = 5;
      }
      else if (propertyPrice <= 395965) {
        imt = propertyPrice * 0.07 - 11254.07;
        rate = 7;
      }
      else if (propertyPrice <= 759410) {
        imt = propertyPrice * 0.08 - 15213.72;
        rate = 8;
      }
      else if (propertyPrice <= 1378650) {
        imt = propertyPrice * 0.06;
        rate = 6;
      }
      else {
        imt = propertyPrice * 0.075;
        rate = 7.5;
      }
    }
  }

  return { imt, rate };
};
