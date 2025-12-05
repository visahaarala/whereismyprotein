export type FineliFoodType = {
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

export type FineliEnergy = {
  fat: number;
  protein: number;
  sugar: number;
  starch: number;
  fiber: number;
  sugarAlcohol: number;
  organicAcid: number;
  // totalEnergy: number;
};

export type LanguageType = 'fi' | 'en';
