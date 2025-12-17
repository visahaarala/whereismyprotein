import { createContext, type Dispatch } from 'react';
import type { UsdaReducerAction, UsdaState } from '../types';
import getFoods from '../data/usda/getFoods';
import getEnergyDensity from '../util/getEnergyDensity';

export const initialState: UsdaState = {
  viewMode: 'search',
  category: undefined,
  searchString: '',
  energyDensity: { min: 0, max: 100 },
  rdi: { min: 0, max: 100 },
  fiberOn: true,
  proteinOn: true,
  eaasOn: true,
  results: getFoods().sort((a, b) =>
    a.description.localeCompare(b.description)
  ),
  selectedFood: null,
  pageIndex: 0,
};

const getStateWithFilteredFoods = (state: UsdaState) => {
  const results = getFoods()
    .filter(
      (food) =>
        // filter category ONLY if mode is search
        state.viewMode !== 'search' ||
        !state.category ||
        food.category === state.category
    )
    .filter((food) => {
      // filter searchString ONLY if mode is search
      if (state.viewMode !== 'search') return true;
      const words = state.searchString.split(' ').map((w) => w.toLowerCase());
      for (const word of words) {
        if (word.charAt(0) === '-') {
          if (
            word.length > 1 &&
            food.description.toLowerCase().includes(word.slice(1))
          ) {
            return false;
          }
        } else {
          if (!food.description.toLowerCase().includes(word)) {
            return false;
          }
        }
      }
      return true;
    })
    .filter((food) => {
      return (
        getEnergyDensity(food.energy) >= state.energyDensity.min &&
        getEnergyDensity(food.energy) <= state.energyDensity.max
      );
    })
    .filter((food) => !state.eaasOn || food.minEaaPctg >= state.rdi.min)
    .filter((food) => !state.fiberOn || food.fiber >= state.rdi.min)
    .filter((food) => !state.proteinOn || food.protein >= state.rdi.min)
    .sort((a, b) => a.description.localeCompare(b.description));

  return { ...state, results };
};

export const reducer = (
  state: UsdaState,
  action: UsdaReducerAction
): UsdaState => {
  switch (action.type) {
    case 'TOGGLE_VIEW_MODE': {
      return getStateWithFilteredFoods({
        ...state,
        viewMode: state.viewMode === 'search' ? 'view categories' : 'search',
        pageIndex: 0,
      });
    }
    case 'TOGGLE_EAAS': {
      return getStateWithFilteredFoods({
        ...state,
        eaasOn: !state.eaasOn,
      });
    }
    case 'TOGGLE_FIBER': {
      return getStateWithFilteredFoods({
        ...state,
        fiberOn: !state.fiberOn,
      });
    }
    case 'TOGGLE_PROTEIN': {
      return getStateWithFilteredFoods({
        ...state,
        proteinOn: !state.proteinOn,
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

export const UsdaContext = createContext<{
  state: UsdaState;
  dispatch: Dispatch<UsdaReducerAction>;
}>({ state: initialState, dispatch: () => {} });
