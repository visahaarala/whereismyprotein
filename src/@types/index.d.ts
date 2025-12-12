export type ProgramState = {
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

  // energyDistributionLimits: EnergyDistributionLimit;

  // RESULTS
  results: FineliFood[];
  selectedFood: FineliFood | null;
  pageIndex: number;
};

export type ReducerAction = {
  type: ReducerActionType;
  payload?: Partial<ProgramState>;
};

export type ReducerActionType =
  | 'TOGGLE_IS_RAW'
  | 'TOGGLE_HAS_SCIENTIFIC'
  | 'TOGGLE_FILTER_MODE'
  | 'TOGGLE_LANGUAGE'
  | 'SET_SELECTED_FOOD'
  | 'SET_PAGE_INDEX'
  | 'SET_CATEGORY'
  | 'SET_SEARCH'
  | 'SET_LIMITS'
  // | 'SET_ENERGY_DENSITY_RANGE'
  // | 'SET_ENERGY_DISTRIBUTION_LIMIT'
  // | 'SET_FIBER_RANGE'
  // | 'SET_FAT_RANGE'
  // | 'SET_PROTEIN_RANGE'
  // | 'SET_SUGAR_RANGE'
  // | 'SET_STARCH_RANGE'
  // | 'SET_ORGANIC_ACID_RANGE'
  // | 'SET_SUGAR_ALCOHOL_RANGE';

export type Range = { min: number; max: number };

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
  sugarAlcohol: number | null;
  organicAcid: number | null;
};

export type EnergyDistribution = {
  fat: number;
  protein: number;
  sugar: number;
  starch: number;
  fiber: number;
  sugarAlcohol: number;
  organicAcid: number;
};

// export type EnergyDistributionLimit = {
//   fat: Range;
//   protein: Range;
//   sugar: Range;
//   starch: Range;
//   fiber: Range;
//   sugarAlcohol: Range;
//   organicAcid: Range;
// };

export type Language = 'fi' | 'en';

export type Mode = 'limit' | 'search';

export type View = 'usda' | 'info' | 'fineli';

export type Limit = { min: number; max: number };

export type MacroLimits = { [key in keyof FineliEnergy]: Limit };
