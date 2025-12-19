import { createContext, type Dispatch } from 'react';
import type { FineliState, FineliReducerAction } from '../types';
import getFoods from '../data/fineli/getFoods';
import getEnergyDensity from '../util/getEnergyDensity';
import { distributionKeys } from '../util/variables';
import getEnergyDistribution from '../util/getEnergyDistribution';

const initialLanguage = navigator.language.includes('fi') ? 'fi' : 'en';

export const initialState: FineliState = {
  isRaw: false,
  hasScientific: false,
  filterMode: 'Search',
  language: initialLanguage,

  // search
  category: undefined,
  searchString: '',

  // limits
  energyDensity: { min: 0, max: 100 },
  fat: { min: 0, max: 100 },
  sugar: { min: 0, max: 100 },
  protein: { min: 0, max: 100 },
  fiber: { min: 0, max: 100 },
  starch: { min: 0, max: 100 },
  organicAcid: { min: 0, max: 100 },
  sugarAlcohol: { min: 0, max: 100 },
  alcohol: { min: 0, max: 100 },

  // results
  results: getFoods().sort((a, b) =>
    a[initialLanguage].localeCompare(b[initialLanguage])
  ),
  selectedFood: null,
  pageIndex: 0,
};

const getStateWithFilteredFoods = (state: FineliState) => {
  const results = getFoods()
    .filter((food) => !state.isRaw || food.raw)
    .filter((food) => !state.hasScientific || food.scientific)
    .filter(
      (food) =>
        // filter category ONLY if mode is search
        state.filterMode !== 'Search' ||
        !state.category ||
        food.category === state.category
    )
    .filter((food) => {
      // filter searchString ONLY if mode is search
      if (state.filterMode !== 'Search') return true;
      const words = state.searchString.split(' ').map((w) => w.toLowerCase());
      for (const word of words) {
        if (word.charAt(0) === '-') {
          if (
            word.length > 1 &&
            (food[state.language].toLowerCase().includes(word.slice(1)) ||
              food.scientific?.toLowerCase().includes(word.slice(1)))
          ) {
            return false;
          }
        } else {
          if (
            !food[state.language].toLowerCase().includes(word) &&
            !food.scientific?.toLowerCase().includes(word)
          ) {
            return false;
          }
        }
      }
      return true;
    })
    .filter((food) => {
      if (state.filterMode !== 'Limit') return true;
      return (
        getEnergyDensity(food.energy) >= state.energyDensity.min &&
        getEnergyDensity(food.energy) <= state.energyDensity.max
      );
    })
    .filter((food) => {
      if (state.filterMode !== 'Limit') return true;
      const pctgs = getEnergyDistribution(food);
      for (const key of distributionKeys) {
        if (pctgs[key] < state[key].min) {
          return false;
        }
        if (pctgs[key] > state[key].max) {
          return false;
        }
      }
      return true;
    })
    .sort((a, b) => a[state.language].localeCompare(b[state.language]));
  return { ...state, results };
};

export const reducer = (
  state: FineliState,
  action: FineliReducerAction
): FineliState => {
  switch (action.type) {
    case 'TOGGLE_IS_RAW': {
      return getStateWithFilteredFoods({
        ...state,
        isRaw: !state.isRaw,
        pageIndex: 0,
      });
    }
    case 'TOGGLE_HAS_SCIENTIFIC': {
      return getStateWithFilteredFoods({
        ...state,
        hasScientific: !state.hasScientific,
        pageIndex: 0,
      });
    }
    case 'TOGGLE_FILTER_MODE': {
      return getStateWithFilteredFoods({
        ...state,
        filterMode: state.filterMode === 'Limit' ? 'Search' : 'Limit',
        pageIndex: 0,
      });
    }
    case 'TOGGLE_LANGUAGE': {
      return getStateWithFilteredFoods({
        ...state,
        language: state.language === 'fi' ? 'en' : 'fi',
      });
    }
    case 'SET_PAGE_INDEX': {
      return { ...state, pageIndex: action.payload!.pageIndex! };
    }
    case 'SET_SELECTED_FOOD': {
      return { ...state, selectedFood: action.payload!.selectedFood! };
    }

    // SEARCH
    case 'SET_CATEGORY': {
      return getStateWithFilteredFoods({
        ...state,
        category: action.payload!.category!,
        searchString: '',
        pageIndex: 0,
      });
    }
    case 'SET_SEARCH': {
      return getStateWithFilteredFoods({
        ...state,
        searchString: action.payload!.searchString!,
        pageIndex: 0,
      });
    }

    // LIMITS
    case 'SET_LIMITS': {
      return getStateWithFilteredFoods({
        ...state,
        pageIndex: 0,
        ...action.payload!,
      });
    }
  }
  return state;
};

export const FineliContext = createContext<{
  state: FineliState;
  dispatch: Dispatch<FineliReducerAction>;
}>({ state: initialState, dispatch: () => {} });
