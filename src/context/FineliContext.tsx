import { createContext, type Dispatch } from 'react';
import type { ProgramState, ReducerAction } from '../@types';
import getFoods from '../data/fineli/getFoods';
import energyDensity from '../functions/getEnergyDensity';
import { distributionKeys } from '../util/variables';
import getEnergyDistribution from '../functions/getEnergyDistribution';

export const initialState: ProgramState = {
  isRaw: false,
  hasScientific: false,
  filterMode: 'search',
  language: navigator.language.includes('fi') ? 'fi' : 'en',

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

  // results
  results: getFoods(),
  selectedFood: null,
  pageIndex: 0,
};

const getStateWithFilteredFoods = (state: ProgramState) => {
  const results = getFoods()
    .filter((food) => !state.isRaw || food.raw)
    .filter((food) => !state.hasScientific || food.scientific)
    .filter(
      (food) =>
        // filter category ONLY if mode is search
        state.filterMode !== 'search' ||
        !state.category ||
        food.category === state.category
    )
    .filter((food) => {
      // filter searchString ONLY if mode is search
      if (state.filterMode !== 'search') return true;
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
      if (state.filterMode !== 'range') return true;
      return (
        energyDensity(food.energy) >= state.energyDensity.min &&
        energyDensity(food.energy) <= state.energyDensity.max
      );
    })
    .filter((food) => {
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
  state: ProgramState,
  action: ReducerAction
): ProgramState => {
  switch (action.type) {
    case 'TOGGLE_IS_RAW': {
      return getStateWithFilteredFoods({ ...state, isRaw: !state.isRaw });
    }
    case 'TOGGLE_HAS_SCIENTIFIC': {
      return getStateWithFilteredFoods({
        ...state,
        hasScientific: !state.hasScientific,
      });
    }
    case 'TOGGLE_FILTER_MODE': {
      return getStateWithFilteredFoods({
        ...state,
        filterMode: state.filterMode === 'range' ? 'search' : 'range',
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
      });
    }
    case 'SET_SEARCH': {
      return getStateWithFilteredFoods({
        ...state,
        searchString: action.payload!.searchString!,
      });
    }

    // LIMITS
    // case 'SET_ENERGY_DENSITY_RANGE': {
    //   return state;
    //   return getStateWithLimits({
    //     ...state,
    //     pageIndex: 0,
    //     energyDensity: action.payload!.energyDensity!,
    //   });
    // }
    case 'SET_LIMITS': {
      return getStateWithFilteredFoods({
        ...state,
        pageIndex: 0,
        ...action.payload!,
      });
    }
    // case 'SET_FAT_RANGE': {
    //   return getStateWithLimits(
    //     {
    //       ...state,
    //       pageIndex: 0,
    //       fat: action.payload!.fat!,
    //     },
    //     'fat'
    //   );
    // }
    // case 'SET_PROTEIN_RANGE': {
    //   return getStateWithLimits(
    //     {
    //       ...state,
    //       pageIndex: 0,
    //       protein: action.payload!.protein!,
    //     },
    //     'protein'
    //   );
    // }
    // case 'SET_SUGAR_RANGE': {
    //   return getStateWithLimits(
    //     {
    //       ...state,
    //       pageIndex: 0,
    //       sugar: action.payload!.sugar!,
    //     },
    //     'sugar'
    //   );
    // }
    // case 'SET_STARCH_RANGE': {
    //   return getStateWithLimits(
    //     {
    //       ...state,
    //       pageIndex: 0,
    //       starch: action.payload!.starch!,
    //     },
    //     'starch'
    //   );
    // }
    // case 'SET_ORGANIC_ACID_RANGE': {
    //   return getStateWithLimits(
    //     {
    //       ...state,
    //       pageIndex: 0,
    //       organicAcid: action.payload!.organicAcid!,
    //     },
    //     'organicAcid'
    //   );
    // }
    // case 'SET_SUGAR_ALCOHOL_RANGE': {
    //   return getStateWithLimits(
    //     {
    //       ...state,
    //       pageIndex: 0,
    //       sugarAlcohol: action.payload!.sugarAlcohol!,
    //     },
    //     'sugarAlcohol'
    //   );
    // }
  }
  return state;
};

export const FineliContext = createContext<{
  state: ProgramState;
  dispatch: Dispatch<ReducerAction>;
}>({ state: initialState, dispatch: () => {} });
