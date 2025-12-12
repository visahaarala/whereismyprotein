import { createContext, type Dispatch, type SetStateAction } from 'react';
import type {
  FineliFood,
  Language,
  Limit,
  MacroLimits,
  Mode,
  View,
} from '../@types';

export const initialMacroLimits: MacroLimits = {
  fat: { min: 0, max: 100 },
  fiber: { min: 0, max: 100 },
  protein: { min: 0, max: 100 },
  sugar: { min: 0, max: 100 },
  starch: { min: 0, max: 100 },
  organic_acid: { min: 0, max: 100 },
  sugar_alcohol: { min: 0, max: 100 },
};

export const FineliContext = createContext<{
  viewState: [View, Dispatch<SetStateAction<View>>];
  searchState: [string, Dispatch<SetStateAction<string>>];
  pageIndexState: [number, Dispatch<SetStateAction<number>>];
  // settingsResultsState: [
  //   FineliFoodType[],
  //   Dispatch<SetStateAction<FineliFoodType[]>>
  // ];
  modeState: [Mode, Dispatch<SetStateAction<Mode>>];
  searchResultsState: [
    FineliFood[],
    Dispatch<SetStateAction<FineliFood[]>>
  ];
  languageState: [Language, Dispatch<SetStateAction<Language>>];
  categoryState: [
    string | undefined,
    Dispatch<SetStateAction<string | undefined>>
  ];
  foodsOnPageState: [
    FineliFood[],
    Dispatch<SetStateAction<FineliFood[]>>
  ];
  onlyRawState: [boolean, Dispatch<SetStateAction<boolean>>];
  hasScientificState: [boolean, Dispatch<SetStateAction<boolean>>];
  selectedFoodState: [
    FineliFood | undefined,
    Dispatch<SetStateAction<FineliFood | undefined>>
  ];
  energyLimitState: [Limit, Dispatch<SetStateAction<Limit>>];
  macroLimitsState: [
    MacroLimits,
    Dispatch<SetStateAction<MacroLimits>>
  ];
}>({
  viewState: ['fineli', () => {}],
  searchState: ['', () => {}],
  pageIndexState: [0, () => {}],
  // settingsResultsState: [[], () => {}],
  modeState: ['search', () => {}],
  searchResultsState: [[], () => {}],
  languageState: ['fi', () => {}],
  categoryState: [undefined, () => {}],
  foodsOnPageState: [[], () => {}],
  onlyRawState: [false, () => {}],
  hasScientificState: [false, () => {}],
  selectedFoodState: [undefined, () => {}],
  energyLimitState: [{ min: 0, max: 100 }, () => {}],
  macroLimitsState: [initialMacroLimits, () => {}],
});
