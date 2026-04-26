export type Range = { min: number; max: number };

export type Language = 'fi' | 'en';

export type View = 'usda' | 'info' | 'fineli';

///////////////////
///////////////////
// FINELI
//
export type FineliViewMode = 'search' | 'limit';

export type FineliState = {
  // PRESET
  preset: FineliPreset;

  // SEARCH
  isRaw: boolean;
  hasScientific: boolean;
  language: 'fi' | 'en';

  // filterMode: FineliFilterMode;
  viewMode: FineliViewMode;

  // search
  // category: string | undefined;
  category: string;
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
  | 'TOGGLE_VIEW_MODE'
  | 'TOGGLE_LANGUAGE'
  | 'SET_SELECTED_FOOD'
  | 'SET_PAGE_INDEX'
  | 'SET_CATEGORY'
  | 'SET_SEARCH'
  | 'SET_LIMITS'
  | 'SET_PRESET'
  | 'RESET_LIMITS';

export type FineliPreset =
  | ''
  | 'Nuts & seeds'
  | 'Vegetables'
  | 'Fruits'
  | 'Legumes (wet & dry)'
  | 'Grains'
  | 'Animal products'
  | 'Visan energia';

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
export type UsdaViewMode = 'view categories' | 'search';

export type UsdaState = {
  // SEARCH

  // viewmode
  viewMode: UsdaViewMode;
  // search
  category: string | undefined;
  searchString: string;
  searchRaw: boolean;
  // limits
  energyDensity: Range;
  proteinOn: boolean;
  eaasOn: boolean;
  fiberOn: boolean;
  rdi: Range;

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
  | 'TOGGLE_RAW'
  | 'SET_LIMITS'
  | 'TOGGLE_PROTEIN'
  | 'TOGGLE_FIBER'
  | 'TOGGLE_EAAS'
  | 'SET_SELECTED_FOOD'
  | 'SET_PAGE_INDEX';

export type UsdaFood = {
  id: string;
  description: string;
  category: string;
  energy: number; // kJ
  protein: number; // % of RDI
  fiber: number; // % of RDI
  raw: boolean;

  eaas: {
    names: (keyof EAAs)[];
    abbreviations: string[];
    pctgOfRdi: number; // % of RDI
  }[];

  minEaaPctg: number; // % of RDI

  // // EAAS
  // tryptophan: number;
  // threonine: number;
  // isoleucine: number;
  // leucine: number;
  // lysine: number;
  // methionine: number;
  // cystine: number;
  // phenylalanine: number;
  // tyrosine: number;
  // valine: number;
  // histidine: number;
};

export type EAAs = {
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
