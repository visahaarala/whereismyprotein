import { createContext, type Dispatch } from 'react';
import type { FineliState, FineliReducerAction, FineliPreset } from '../types';
import getFoods from '../data/fineli/getFoods';
import getEnergyDensity from '../util/getEnergyDensity';
import { distributionKeys } from '../util/variables';
import getEnergyDistribution from '../util/getEnergyDistribution';

const initialLanguage = navigator.language.includes('fi') ? 'fi' : 'en';

export const initialState: FineliState = {
  // preset
  preset: '',

  // toggles
  isRaw: false,
  hasScientific: false,
  language: initialLanguage,

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

  // viewmode
  viewMode: 'search',

  // search
  // category: undefined,
  category: '',
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
    .filter(
      (food) =>
        // filter category ONLY if mode is search
        state.viewMode !== 'search' ||
        !state.category ||
        food.category === state.category,
    )
    .filter((food) => {
      // filter searchString ONLY if mode is search
      if (state.viewMode !== 'search') return true;
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
      // filter limits ONLY if mode is 'limit'
      if (state.viewMode !== 'limit') return true;
      return (
        getEnergyDensity(food.energy) >= state.energyDensity.min &&
        getEnergyDensity(food.energy) <= state.energyDensity.max
      );
    })
    .filter((food) => {
      // filter limits ONLY if mode is 'limit'
      if (state.viewMode !== 'limit') return true;
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
  action: FineliReducerAction,
): FineliState => {
  switch (action.type) {
    case 'TOGGLE_IS_RAW': {
      return getStateWithFilteredFoods({
        ...state,
        isRaw: !state.isRaw,
        pageIndex: 0,
        preset: '',
      });
    }
    case 'TOGGLE_HAS_SCIENTIFIC': {
      return getStateWithFilteredFoods({
        ...state,
        hasScientific: !state.hasScientific,
        pageIndex: 0,
        preset: '',
      });
    }
    case 'TOGGLE_VIEW_MODE': {
      return getStateWithFilteredFoods({
        ...state,
        viewMode: state.viewMode === 'search' ? 'limit' : 'search',
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
        preset: '',
      });
    }

    // SET_PRESET
    case 'SET_PRESET': {
      const preset = action.payload!.preset! as unknown as FineliPreset;
      let presetValues: Partial<FineliState> = {};
      switch (preset) {
        case '': {
          presetValues = {
            ...state,
            isRaw: false,
            hasScientific: false,
            energyDensity: { min: 0, max: 100 },
            fiber: { min: 0, max: 100 },
            protein: { min: 0, max: 100 },
            sugar: { min: 0, max: 100 },
            fat: { min: 0, max: 100 },
          };
          break;
        }
        case 'Fruits': {
          presetValues = {
            ...state,
            isRaw: false,
            hasScientific: true,
            energyDensity: { min: 2, max: 10 },
            fiber: { min: 2, max: 20 },
            protein: { min: 0, max: 10 },
            sugar: { min: 45, max: 90 },
            fat: { min: 0, max: 10 },
          };
          break;
        }
        case 'Vegetables': {
          presetValues = {
            ...state,
            isRaw: false,
            hasScientific: true,
            energyDensity: { min: 0, max: 15 },
            fiber: { min: 4, max: 62 },
            protein: { min: 6, max: 61 },
            sugar: { min: 0, max: 71 },
            fat: { min: 0, max: 30 },
          };
          break;
        }
        case 'Nuts & seeds': {
          presetValues = {
            ...state,
            isRaw: false,
            hasScientific: true,
            energyDensity: { min: 50, max: 80 },
            fiber: { min: 1, max: 15 },
            protein: { min: 5, max: 25 },
            sugar: { min: 0, max: 5 },
            fat: { min: 65, max: 90 },
          };
          break;
        }
        case 'Legumes (wet & dry)': {
          presetValues = {
            ...state,
            isRaw: false,
            hasScientific: true,
            energyDensity: { min: 8, max: 39 },
            fiber: { min: 3, max: 20 },
            protein: { min: 25, max: 35 },
            sugar: { min: 0, max: 8 },
            fat: { min: 0, max: 15 },
          };
          break;
        }
        case 'Grains': {
          presetValues = {
            ...state,
            isRaw: false,
            hasScientific: true,
            energyDensity: { min: 32, max: 41 },
            fiber: { min: 2, max: 20 },
            protein: { min: 9, max: 24 },
            sugar: { min: 0, max: 11 },
            fat: { min: 3, max: 20 },
          };
          break;
        }
        case 'Animal products': {
          presetValues = {
            ...state,
            isRaw: false,
            hasScientific: false,
            fiber: { min: 0, max: 0 },
            sugar: { min: 0, max: 0 },
            energyDensity: { min: 7, max: 52 },
            protein: { min: 14, max: 95 },
            fat: { min: 5, max: 85 },
          };
          break;
        }
        case 'Visan energia': {
          presetValues = {
            ...state,
            isRaw: false,
            hasScientific: true,
            energyDensity: { min: 7, max: 100 },
            fiber: { min: 2, max: 100 },
            protein: { min: 8, max: 100 },
            sugar: { min: 0, max: 5 },
            fat: { min: 0, max: 20 },
          };
        }
      }

      return getStateWithFilteredFoods({
        ...state,
        ...presetValues,
        preset,
        pageIndex: 0,
      });
    }

    // RESET
    case 'RESET_LIMITS': {
      return getStateWithFilteredFoods({
        ...state,
        isRaw: false,
        hasScientific: false,
        preset: '',
        energyDensity: { min: 0, max: 100 },
        fiber: { min: 0, max: 100 },
        protein: { min: 0, max: 100 },
        sugar: { min: 0, max: 100 },
        fat: { min: 0, max: 100 },
      });
    }
  }
  // return state;
};

export const FineliContext = createContext<{
  state: FineliState;
  dispatch: Dispatch<FineliReducerAction>;
}>({ state: initialState, dispatch: () => {} });
