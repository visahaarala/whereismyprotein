import { useState } from 'react';
import './App.scss';
import Fineli from './components/Fineli';
import USDA from './components/USDA';
import Info from './components/Info';
import FineliContextProvider from './context/FineliContextProvider';

const App = () => {
  const [view, setView] = useState<'fineli' | 'usda' | 'info'>('info');

  return (
    <>
      <header>
        <h1>Where is my protein?</h1>
        <nav>
          <div
            style={view === 'info' ? { backgroundColor: '#8404' } : {}}
            onClick={() => setView('info')}
          >
            Info
          </div>
          <div
            style={view === 'fineli' ? { backgroundColor: '#4805' } : {}}
            onClick={() => setView('fineli')}
          >
            Fineli
          </div>
          <div
            style={view === 'usda' ? { backgroundColor: '#0484' } : {}}
            onClick={() => setView('usda')}
          >
            USDA
          </div>
        </nav>
      </header>
      <main>
        <FineliContextProvider>
          <Fineli show={view === 'fineli'} />
        </FineliContextProvider>
        <USDA show={view === 'usda'} />
        <Info show={view === 'info'} />
      </main>
    </>
  );
};

export default App;
