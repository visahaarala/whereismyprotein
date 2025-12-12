import { useState, type FC, type ReactNode } from 'react';
import { FineliContext, initialMacroLimits } from './OldFineliContext';
import type {
  Language,
  FineliFood,
  Mode,
  View,
} from '../@types';
import getFoods from '../data/fineli/getFoods';

const FineliContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const initialLanguage = navigator.language.includes('fi') ? 'fi' : 'en';

  return (
    <FineliContext.Provider
      value={{
        viewState: useState<View>('fineli'),
        searchState: useState(''),
        pageIndexState: useState(0),
        modeState: useState<Mode>('search'),
        // settingsResultsState: useState<FineliFoodType[]>(getFoods()),
        searchResultsState: useState<FineliFood[]>(getFoods()),
        languageState: useState<Language>(initialLanguage),
        categoryState: useState<string | undefined>(undefined),
        foodsOnPageState: useState<FineliFood[]>(getFoods()),
        onlyRawState: useState(false),
        hasScientificState: useState(false),
        selectedFoodState: useState(),
        energyLimitState: useState({ min: 0, max: 100 }),
        macroLimitsState: useState(initialMacroLimits),
      }}
    >
      {children}
    </FineliContext.Provider>
  );
};

export default FineliContextProvider;
