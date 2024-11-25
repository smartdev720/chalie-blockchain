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

const formatTime = (seconds: number): string => {
    const days = Math.floor(seconds / (24 * 3600));
    const hours = Math.floor((seconds % (24 * 3600)) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${days.toString().padStart(2, "0")} / ${hours
      .toString()
      .padStart(2, "0")} : ${minutes.toString().padStart(2, "0")} : ${secs
      .toString()
      .padStart(2, "0")}`;
  };

export {isValidWithdraw, extaRewardRateOf, extendPercentsOf, formatTime};