enum ICategories {
  MOTOR = 'MOTOR',
  HEALTH = 'HEATLH',
  TRAVEL = 'TRAVEL',
  PROPERTY = 'PROPERTY',
  LIFE = 'LIFE',
}

const MappingCost = {
  MOTOR: {
    CAR: {},
    BIKE: {},
    PLANE: {},
    YATCH: {},
  },
  HEALTH: {
    HEALTH: {},
  },
  TRAVEL: {
    TRAVEL: {},
  },
  PROPERTY: {
    RESIDENTIAL: {},
    PUBLIC: {},
    PRIVATE: {},
    COMMERCIAL: {},
  },
  LIFE: {
    LIFE: {},
  },
};

const calculation = (
  _insuranceType: string,
  _subInsuranceType: string,
  coverage: any,
  merchant: any
) => {
  switch (_insuranceType) {
    case 'MOTOR':
      switch (_subInsuranceType) {
        case 'CAR':
          if (coverage == '100000') {
            return { baseAmount: '0.1', flowRate: '100' };
          } else if (coverage == '500000') {
            return { baseAmount: '210', flowRate: '1000000000000000000' };
          } else {
            // 1000000
            return { baseAmount: '310', flowRate: '1000000000000000000' };
          }

        case 'BIKE':
          if (coverage == '100000') {
            return { baseAmount: '50', flowRate: '1000000000000000000' };
          } else if (coverage == '500000') {
            return { baseAmount: '60', flowRate: '1000000000000000000' };
          } else {
            // 1000000
            return { baseAmount: '70', flowRate: '1000000000000000000' };
          }

        case 'PLANE':
          if (coverage == '100000') {
            return { baseAmount: '1100', flowRate: '1000000000000000000' };
          } else if (coverage == '500000') {
            return { baseAmount: '1500', flowRate: '1000000000000000000' };
          } else {
            // 1000000
            return { baseAmount: '2000', flowRate: '1000000000000000000' };
          }

        case 'YATCH':
          if (coverage == '100000') {
            return { baseAmount: '1100', flowRate: '1000000000000000000' };
          } else if (coverage == '500000') {
            return { baseAmount: '1200', flowRate: '1000000000000000000' };
          } else {
            // 1000000
            return { baseAmount: '1500', flowRate: '1000000000000000000' };
          }
        default:
          return { baseAmount: '100', flowRate: '1000000000000000000' };
      }

    case 'HEALTH':
      return { baseAmount: '200', flowRate: '1000000000000000000' };

    case 'TRAVEL':
      return { baseAmount: '50', flowRate: '1000000000000000000' };

    case 'LIFE':
      return { baseAmount: '220', flowRate: '1000000000000000000' };

    case 'PROPERTY':
      switch (_subInsuranceType) {
        case 'RESIDENTIAL':
          if (coverage == '100000') {
            return { baseAmount: '100', flowRate: '1000000000000000000' };
          } else if (coverage == '500000') {
            return { baseAmount: '150', flowRate: '1000000000000000000' };
          } else {
            // 1000000
            return { baseAmount: '200', flowRate: '1000000000000000000' };
          }

        case 'PUBLIC':
          if (coverage == '100000') {
            return { baseAmount: '100', flowRate: '1000000000000000000' };
          } else if (coverage == '500000') {
            return { baseAmount: '130', flowRate: '1000000000000000000' };
          } else {
            // 1000000
            return { baseAmount: '180', flowRate: '1000000000000000000' };
          }

        case 'PRIVATE':
          if (coverage == '100000') {
            return { baseAmount: '200', flowRate: '1000000000000000000' };
          } else if (coverage == '500000') {
            return { baseAmount: '300', flowRate: '1000000000000000000' };
          } else {
            // 1000000
            return { baseAmount: '400', flowRate: '1000000000000000000' };
          }

        case 'COMMERCIAL':
          if (coverage == '100000') {
            return { baseAmount: '600', flowRate: '1000000000000000000' };
          } else if (coverage == '500000') {
            return { baseAmount: '800', flowRate: '1000000000000000000' };
          } else {
            // 1000000
            return { baseAmount: '1200', flowRate: '1000000000000000000' };
          }
        default:
          return { baseAmount: '1000', flowRate: '1000000000000000000' };
      }
    default:
      return { baseAmount: '1000', flowRate: '1000000000000000000' };
  }
};

export default calculation;
