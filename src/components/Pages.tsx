import { useContext, useEffect } from 'react';
import LeftIcon from '../svg/LeftIcon';
import styles from './Pages.module.scss';
import { FineliContext } from '../context/FineliContext';

const RESULTS_PER_PAGE = 100;

const Pages = () => {
  const ctx = useContext(FineliContext);
  const [pageIndex, setPageIndex] = ctx.pageIndexState;
  const numResults = ctx.searchResultsState[0].length;
  const numPages = Math.ceil(numResults / RESULTS_PER_PAGE);
  const searchResults = ctx.searchResultsState[0];
  const setFoodsOnPage = ctx.foodsOnPageState[1];

  useEffect(() => {
    setFoodsOnPage(searchResults.slice(pageIndex * 100, (pageIndex + 1) * 100));
  }, [searchResults, pageIndex]);

  return (
    <div className={styles.pages}>
      <div
        className={`${styles.leftIcon}
         ${pageIndex === 0 ? styles.disabled : ''}
        `}
        onClick={() => {
          if (pageIndex > 0) {
            setPageIndex(pageIndex - 1);
          }
        }}
      >
        <LeftIcon />
      </div>
      <div className={styles.info}>
        <div>{numResults} results</div>
        <div>
          page {pageIndex + 1}/{numPages}
        </div>
      </div>
      <div
        className={`${styles.rightIcon} ${
          pageIndex >= numPages - 1 ? styles.disabled : ''
        }`}
        onClick={() => {
          if (pageIndex < numPages - 1) {
            setPageIndex(pageIndex + 1);
          }
        }}
      >
        <LeftIcon />
      </div>
    </div>
  );
};

export default Pages;
