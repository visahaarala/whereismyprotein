export type Range = { min: number; max: number };

export type Language = 'fi' | 'en';

export type View = 'usda' | 'info' | 'fineli';

///////////////////
// FINELI
//
export type FineliState = {
  // SEARCH
  isRaw: boolean;
  hasScientific: boolean;
  filterMode: 'search' | 'range';
  language: 'fi' | 'en';

  // search
  category: string | undefined;
  searchString: string;

  // limits
  energyDensity: Range;
  fat: Range;
  protein: Range;
  sugar: Range;
  starch: Range;
  fiber: Range;
  sugarAlcohol: Range;
  organicAcid: Range;
  alcohol: Range;

  // RESULTS
  results: FineliFood[];
  selectedFood: FineliFood | null;
  pageIndex: number;
};

export type FineliReducerAction = {
  type: FineliReducerActionType;
  payload?: Partial<FineliState>;
};

export type FineliReducerActionType =
  | 'TOGGLE_IS_RAW'
  | 'TOGGLE_HAS_SCIENTIFIC'
  | 'TOGGLE_FILTER_MODE'
  | 'TOGGLE_LANGUAGE'
  | 'SET_SELECTED_FOOD'
  | 'SET_PAGE_INDEX'
  | 'SET_CATEGORY'
  | 'SET_SEARCH'
  | 'SET_LIMITS';

export type FineliFood = {
  id: number;
  scientific: string | null;
  fi: string; // CHANGE
  en: string; // CHANGE
  raw: boolean;
  category: string; // CHANGE
  energy: number;
  fat: number;
  protein: number;
  sugar: number;
  starch: number;
  fiber: number;
  sugarAlcohol: number;
  organicAcid: number;
  alcohol: number;
};

export type FineliEnergyDistribution = {
  fat: number;
  protein: number;
  sugar: number;
  starch: number;
  fiber: number;
  sugarAlcohol: number;
  organicAcid: number;
  alcohol: number;
};

export type FineliMode = 'limit' | 'search';
