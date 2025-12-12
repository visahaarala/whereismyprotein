import styles from './Navigation.module.scss';

import type { Dispatch, SetStateAction } from 'react';
import type { View } from '../@types';

const Navigation = ({
  view,
  setView,
}: {
  view: View;
  setView: Dispatch<SetStateAction<View>>;
}) => {
  
  return (
    <nav className={styles.nav}>
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
  );
};

export default Navigation;
