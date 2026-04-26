import { useContext } from 'react';
import { UsdaContext } from '../context/UsdaContext';
import styles from './USDA.module.scss';
import Food from './USDA/Food';
import Results from './USDA/Results';

import Search from './USDA/Search';
import Pages from './Common/Pages';

const USDA = ({ show }: { show: boolean }) => {
  const { state, dispatch } = useContext(UsdaContext);

  const setPage = (pageIndex: number) => {
    dispatch({ type: 'SET_PAGE_INDEX', payload: { pageIndex } });
  };

  return (
    <div className={styles.usda} style={show ? {} : { display: 'none' }}>
      <Search />
      <Results />
      <Food />
      <Pages
        numResults={state.results.length}
        pageIndex={state.pageIndex}
        show={state.viewMode === 'search' && state.selectedFood === null}
        setPage={setPage}
      />
    </div>
  );
};

export default USDA;
