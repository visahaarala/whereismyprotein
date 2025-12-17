import styles from './Fineli.module.scss';

import Pages from './Common/Pages';
import Food from './Fineli/Food';
import Search from './Fineli/Search';
import Results from './Fineli/Results';
import { FineliContext } from '../context/FineliContext';
import { useContext } from 'react';

const Fineli = ({ show }: { show: boolean }) => {
  const { state, dispatch } = useContext(FineliContext);

  const setPage = (pageIndex: number) => {
    dispatch({ type: 'SET_PAGE_INDEX', payload: { pageIndex } });
  };

  return (
    <div className={styles.fineli} style={show ? {} : { display: 'none' }}>
      <Search />
      <Results />
      <Pages
        numResults={state.results.length}
        pageIndex={state.pageIndex}
        isFoodSelected={state.selectedFood !== null}
        setPage={setPage}
      />
      <Food />
    </div>
  );
};

export default Fineli;
