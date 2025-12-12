import { useContext } from 'react';
import LeftIcon from '../../../svg/LeftIcon';
import styles from './Pages.module.scss';
import { FineliContext } from '../../../context/FineliContext';

const RESULTS_PER_PAGE = 100;

const Pages = () => {
  // const ctx = useContext(FineliContext);
  // const [pageIndex, setPageIndex] = ctx.pageIndexState;

  const { state, dispatch } = useContext(FineliContext);
  const numResults = state.results.length;
  const numPages = Math.ceil(numResults / RESULTS_PER_PAGE);
  // const searchResults = ctx.searchResultsState[0];
  // const setFoodsOnPage = ctx.foodsOnPageState[1];
  // const [selectedFood] = ctx.selectedFoodState;

  // useEffect(() => {
  //   setFoodsOnPage(searchResults.slice(pageIndex * 100, (pageIndex + 1) * 100));
  //   document.getElementById('FineliResults')!.scrollTop = 0;
  // }, [searchResults, pageIndex, setFoodsOnPage]);

  return (
    <div
      className={styles.pages}
      style={state.selectedFood ? { display: 'none' } : {}}
    >
      <div
        className={`${styles.leftIcon}
         ${state.pageIndex === 0 ? styles.disabled : ''}
        `}
        onClick={() => {
          if (state.pageIndex > 0) {
            dispatch({
              type: 'SET_PAGE_INDEX',
              payload: { pageIndex: state.pageIndex - 1 },
            });
          }
        }}
      >
        <LeftIcon />
      </div>
      <div className={styles.info}>
        <div>{numResults} results</div>
        <div>
          page {state.pageIndex + 1}/{numPages}
        </div>
      </div>
      <div
        className={`${styles.rightIcon} ${
          state.pageIndex >= numPages - 1 ? styles.disabled : ''
        }`}
        onClick={() => {
          if (state.pageIndex < numPages - 1) {
            dispatch({
              type: 'SET_PAGE_INDEX',
              payload: { pageIndex: state.pageIndex + 1 },
            });
          }
        }}
      >
        <LeftIcon />
      </div>
    </div>
  );
};

export default Pages;
