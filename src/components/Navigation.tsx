import styles from './Navigation.module.scss';

import type { Dispatch, SetStateAction } from 'react';
import type { View } from '../types';

const Navigation = ({
  view,
  setView,
}: {
  view: View;
  setView: Dispatch<SetStateAction<View>>;
}) => {
  const tabNames: View[] = ['info', 'fineli', 'usda'];

  return (
    <nav className={styles.nav}>
      {tabNames.map((tabName) => (
        <div
          className={`${styles.tab} ${
            view === tabName ? styles['tab--selected'] : ''
          }`}
          onClick={() => setView(tabName)}
        >
          {tabName}
        </div>
      ))}
      {/* <div
        // style={
        //   view === 'info'
        //     ? { backgroundColor: 'var(--background-color-info-tab)' }
        //     : {}
        // }
        onClick={() => setView('info')}
        onKeyDown={(e) => e.code === 'Space' && setView('info')}
        tabIndex={0}
      >
        Info
      </div>
      <div
        style={
          view === 'fineli'
            ? { backgroundColor: 'var(--background-color-fineli-tab)' }
            : {}
        }
        onClick={() => setView('fineli')}
        onKeyDown={(e) => e.code === 'Space' && setView('fineli')}
        tabIndex={0}
      >
        Fineli
      </div>
      <div
        style={view === 'usda' ? { backgroundColor: 'var(--background-color-usda-tab)' } : {}}
        onClick={() => setView('usda')}
        onKeyDown={(e) => e.code === 'Space' && setView('usda')}
        tabIndex={0}
      >
        USDA
      </div> */}
    </nav>
  );
};

export default Navigation;
