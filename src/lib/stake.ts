import { extraRewardRates } from "../constant/staking";

const isValidWithdraw = (start: number, apy: number): boolean => {
    const currentTimestamp = Math.floor(Date.now() / 1000);
    return (currentTimestamp - start) >= apy;
};


const extaRewardRateOf = (apy: number, percent: number): string => {
    const rate = extraRewardRates.get(apy)?.get(percent) || 0;
    return rate.toString();
}

const extendPercentsOf = (apy: number): number[] => {
    const percentsMap: { [key: number]: number[] } = {
      30: [100, 50, 25],
      60: [100, 50, 25],
      90: [100, 50],
      120: [100, 50],
      180: [100, 50],
    };
  
    return percentsMap[apy] || [];
  };

export {isValidWithdraw, extaRewardRateOf, extendPercentsOf};