import { StakesType } from "../types/stakeTypes";

const initialStakingCardGroup:StakesType[] = [
    {
        apy: 2592000,
        rewardRate: 5,
        rewardAmount: 0,
        stakedAmount: 0,
        start: 0,
        withdrawAmount: 0
    },
    {
        apy: 5184000,
        rewardRate: 8,
        rewardAmount: 0,
        stakedAmount: 0,
        start: 0,
        withdrawAmount: 0
    },
    {
        apy: 7776000,
        rewardRate: 10,
        rewardAmount: 0,
        stakedAmount: 0,
        start: 0,
        withdrawAmount: 0
    },
    {
        apy: 10368000,
        rewardRate: 12,
        rewardAmount: 0,
        stakedAmount: 0,
        start: 0,
        withdrawAmount: 0
    },
    {
        apy: 15552000,
        rewardRate: 15,
        rewardAmount: 0,
        stakedAmount: 0,
        start: 0,
        withdrawAmount: 0
    },
];

type ExtraRewardRates = Map<number, Map<number, number>>;

const extraRewardRates = new Map([
    [2592000, new Map([[100, 0.5], [50, 0.25], [25, 0.125]])],
    [5184000, new Map([[100, 1], [50, 0.5], [25, 0.25]])],
    [7776000, new Map([[100, 2], [50, 1]])],
    [10368000, new Map([[100, 3], [50, 1.5]])],
    [15552000, new Map([[100, 4], [50, 2]])],
]);


export {initialStakingCardGroup, extraRewardRates};