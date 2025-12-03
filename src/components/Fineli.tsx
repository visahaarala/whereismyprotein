import { useContext } from 'react';
import styles from './Fineli.module.scss';
import { FineliContext } from '../context/FineliContext';
import Search from './Search';
import Results from './Results';
import Pages from './Pages';
import Settings from './Settings';
import Food from './Food';

const Fineli = ({ show }: { show: boolean }) => {
  const showSettings = useContext(FineliContext).showSettingsState[0];

  return (
    <div className={styles.fineli} style={show ? {} : { display: 'none' }}>
      <div style={showSettings ? { display: 'none' } : {}}>
        <Search />
        <Results />
        <Pages />
        <Food />
      </div>
      <div style={showSettings ? {} : { display: 'none' }}>
        <Settings />
      </div>
    </div>
  );
};

export default Fineli;
