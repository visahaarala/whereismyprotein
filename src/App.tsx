import { useState } from 'react';
import './App.scss';
import Fineli from './components/Fineli';
import USDA from './components/USDA';
import Info from './components/Info';

const App = () => {
  const [view, setView] = useState<'fineli' | 'usda' | 'info'>('fineli');

  return (
    <>
      <header>
        <h1>Where is my protein?</h1>
        <nav>
          <div
            style={view === 'fineli' ? { backgroundColor: '#4805' } : {}}
            onClick={() => setView('fineli')}
          >
            Fineli
          </div>
          <div
            style={
              view === 'usda'
                ? {
                    backgroundColor: '#4084',
                    // #0845
                  }
                : {}
            }
            onClick={() => setView('usda')}
          >
            USDA
          </div>
          <div
            style={
              view === 'info'
                ? {
                    backgroundColor: '#8405',
                    // #0485
                  }
                : {}
            }
            onClick={() => setView('info')}
          >
            Info
          </div>
        </nav>
      </header>
      <main>
        <Fineli show={view === 'fineli'} />
        <USDA show={view === 'usda'} />
        <Info show={view === 'info'} />
      </main>
    </>
  );
};

export default App;
