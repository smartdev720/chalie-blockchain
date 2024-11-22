const isValidWithdraw = (start: number, apy: number): boolean => {
    const currentTimestamp = Math.floor(Date.now() / 1000);
    return (currentTimestamp - start) >= apy * 24 * 60 * 60;
};

export {isValidWithdraw};