import { createContext, type Dispatch } from 'react';
import type { FineliState, FineliReducerAction } from '../types';
import getFoods from '../data/fineli/getFoods';

const initialLanguage = navigator.language.includes('fi') ? 'fi' : 'en';

export const initialState: FineliState = {
  isRaw: false,
  hasScientific: false,
  language: initialLanguage,

  // search
  fiberGrams: 0,
  category: undefined,
  searchString: '',

  // results
  results: getFoods().sort((a, b) =>
    a[initialLanguage].localeCompare(b[initialLanguage]),
  ),
  selectedFood: null,
  pageIndex: 0,
};

const getStateWithFilteredFoods = (state: FineliState) => {
  const results = getFoods()
    .filter((food) => !state.isRaw || food.raw)
    .filter((food) => !state.hasScientific || food.scientific)
    .filter((food) => {
      const kcal = food.energy / 4.184;
      return food.fiber * (2000 / kcal) >= state.fiberGrams;
    })
    .filter((food) => !state.category || food.category === state.category)
    .filter((food) => {
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
    // .filter((food) => {
    //   if (state.filterMode !== 'Limit') return true;
    //   return (
    //     getEnergyDensity(food.energy) >= state.energyDensity.min &&
    //     getEnergyDensity(food.energy) <= state.energyDensity.max
    //   );
    // })
    // .filter((food) => {
    //   if (state.filterMode !== 'Limit') return true;
    //   const pctgs = getEnergyDistribution(food);
    //   for (const key of distributionKeys) {
    //     if (pctgs[key] < state[key].min) {
    //       return false;
    //     }
    //     if (pctgs[key] > state[key].max) {
    //       return false;
    //     }
    //   }
    //   return true;
    // })
    .sort((a, b) => a[state.language].localeCompare(b[state.language]));
  return { ...state, results };
};

export const reducer = (
  state: FineliState,
  action: FineliReducerAction,
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
    // case 'TOGGLE_FILTER_MODE': {
    //   return getStateWithFilteredFoods({
    //     ...state,
    //     filterMode: state.filterMode === 'Limit' ? 'Search' : 'Limit',
    //     pageIndex: 0,
    //   });
    // }
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
    case 'SET_FIBER_GRAMS': {
      return getStateWithFilteredFoods({
        ...state,
        fiberGrams: action.payload!.fiberGrams!,
        pageIndex: 0,
      });
    }
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
    // case 'SET_LIMITS': {
    //   return getStateWithFilteredFoods({
    //     ...state,
    //     pageIndex: 0,
    //     ...action.payload!,
    //   });
    // }
  }
  return state;
};

export const FineliContext = createContext<{
  state: FineliState;
  dispatch: Dispatch<FineliReducerAction>;
}>({ state: initialState, dispatch: () => {} });
