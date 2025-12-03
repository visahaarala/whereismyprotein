import { createContext, type Dispatch, type SetStateAction } from 'react';
import type { FineliFoodType, LanguageType } from '../@types/types';

export const FineliContext = createContext<{
  searchState: [string, Dispatch<SetStateAction<string>>];
  showSettingsState: [boolean, Dispatch<SetStateAction<boolean>>];
  pageIndexState: [number, Dispatch<SetStateAction<number>>];
  settingsResultsState: [
    FineliFoodType[],
    Dispatch<SetStateAction<FineliFoodType[]>>
  ];
  searchResultsState: [
    FineliFoodType[],
    Dispatch<SetStateAction<FineliFoodType[]>>
  ];
  languageState: [LanguageType, Dispatch<SetStateAction<LanguageType>>];
  categoryState: [
    string | undefined,
    Dispatch<SetStateAction<string | undefined>>
  ];
  foodsOnPageState: [
    FineliFoodType[],
    Dispatch<SetStateAction<FineliFoodType[]>>
  ];
  onlyRawState: [boolean, Dispatch<SetStateAction<boolean>>];
  onlyScientificState: [boolean, Dispatch<SetStateAction<boolean>>];
  selectedFoodState: [
    FineliFoodType | undefined,
    Dispatch<SetStateAction<FineliFoodType | undefined>>
  ];
}>({
  searchState: ['', () => {}],
  showSettingsState: [false, () => {}],
  pageIndexState: [0, () => {}],
  settingsResultsState: [[], () => {}],
  searchResultsState: [[], () => {}],
  languageState: ['fi', () => {}],
  categoryState: [undefined, () => {}],
  foodsOnPageState: [[], () => {}],
  onlyRawState: [false, () => {}],
  onlyScientificState: [false, () => {}],
  selectedFoodState: [undefined, () => {}],
});
