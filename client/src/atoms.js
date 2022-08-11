import { atom } from 'recoil';

// toggles add bet form on and off
export const addBetState = atom({
  key: 'addBetState',
  default: false,
});

export const betListState = atom({
  key: 'betListState',
  default: false,
});

export const betAnalysisState = atom({
  key: 'betAnalysisState',
  default: false,
});

// keeps track of all in season sports
export const currentSportsState = atom({
  key: 'currentSportsState',
  default: [],
});

export const userIDState = atom({
  key: 'userIDState',
  default: 1,
});

export const updateBetListState = atom({
  key: 'updateBetListState',
  default: 1,
});

export const myBetsState = atom({
  key: 'myBetsState',
  default: [],
});
