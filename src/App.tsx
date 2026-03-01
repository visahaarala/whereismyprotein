import './App.scss';

import { useState } from 'react';
import Fineli from './components/Fineli';
import USDA from './components/USDA';
import Info from './components/Info';
// import FineliContextProvider from './context/OldFineliContextProvider';
import FineliContextProvider from './context/FineliContextProvider';
import Navigation from './components/Navigation';
import type { View } from './types';
import UsdaContextProvider from './context/UsdaContextProvider';
import isMobile from './util/isMobile';

if (isMobile()) {
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute('content', '#222324');
}

const App = () => {
  const [view, setView] = useState<View>('info');

  return (
    <>
      <header>
        <Navigation view={view} setView={setView} />
      </header>
      <main>
        <Info show={view === 'info'} />
        <FineliContextProvider>
          <Fineli show={view === 'fineli'} />
        </FineliContextProvider>
        <UsdaContextProvider>
          <USDA show={view === 'usda'} />
        </UsdaContextProvider>
      </main>
    </>
  );
};

export default App;
