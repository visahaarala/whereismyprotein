import { useState, type FC, type ReactNode } from 'react';
import { FineliContext } from './FineliContext';
import type { LanguageType, FineliFoodType } from '../@types/types';
import getFoods from '../data/fineli/getFoods';

const FineliContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const initialLanguage = navigator.language.includes('fi') ? 'fi' : 'en';

  return (
    <FineliContext.Provider
      value={{
        searchState: useState(''),
        showSettingsState: useState(false),
        pageIndexState: useState(0),
        settingsResultsState: useState<FineliFoodType[]>(getFoods()),
        searchResultsState: useState<FineliFoodType[]>(getFoods()),
        languageState: useState<LanguageType>(initialLanguage),
        categoryState: useState<string | undefined>(undefined),
        foodsOnPageState: useState<FineliFoodType[]>(getFoods()),
        onlyRawState: useState(false),
        onlyScientificState: useState(false),
      }}
    >
      {children}
    </FineliContext.Provider>
  );
};

export default FineliContextProvider;
