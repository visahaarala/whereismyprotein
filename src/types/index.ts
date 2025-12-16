export type Range = { min: number; max: number };

export type Language = 'fi' | 'en';

export type View = 'usda' | 'info' | 'fineli';

///////////////////
///////////////////
// FINELI
//
export type FineliState = {
  // SEARCH
  isRaw: boolean;
  hasScientific: boolean;
  filterMode: 'search' | 'limit';
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
  fi: string;
  en: string;
  raw: boolean;
  category: string;
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

//

//

///////////////////
// USDA
//
export type UsdaState = {
  // SEARCH

  // viewmode
  viewMode: 'categoryDistribution' | 'search';
  // search
  category: string | undefined;
  searchString: string;
  // limits
  energyDensity: Range;
  rdi: Range;
  protein: boolean;
  eaas: boolean;
  fiber: boolean;

  // RESULTS

  results: UsdaFood[];
  selectedFood: UsdaFood | null;
  pageIndex: number;
};

export type UsdaReducerAction = {
  type: UsdaReducerActionType;
  payload?: Partial<UsdaState>;
};

export type UsdaReducerActionType =
  | 'TOGGLE_VIEW_MODE'
  | 'SET_CATEGORY'
  | 'SET_SEARCH'
  | 'SET_LIMITS'
  | 'TOGGLE_PROTEIN'
  | 'TOGGLE_FIBER'
  | 'TOGGLE_EAAS'
  | 'SET_SELECTED_FOOD'
  | 'SET_PAGE_INDEX';

export type UsdaFood = {
  id: number;
  description: string;
  category: string;
  energy: number;
  protein: number;
  fiber: number;
  tryptophan: number;
  threonine: number;
  isoleucine: number;
  leucine: number;
  lysine: number;
  methionine: number;
  cystine: number;
  phenylalanine: number;
  tyrosine: number;
  valine: number;
  histidine: number;
};
