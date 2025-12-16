import {
  type KeyboardEvent,
} from 'react';
import LeftIcon from '../../svg/LeftIcon';
import styles from './Pages.module.scss';

const RESULTS_PER_PAGE = 100;

const Pages = ({
  numResults,
  pageIndex,
  isFoodSelected,
  setPage,
}: {
  numResults: number;
  pageIndex: number;
  isFoodSelected: boolean;
  setPage: (pageIndex: number) => void;
}) => {
  const numPages = Math.ceil(numResults / RESULTS_PER_PAGE);

  const keyDownHandler = (e: KeyboardEvent, change: number) => {
    if (e.code === 'Space' || e.code === 'Enter') {
      e.preventDefault();
      handleChange(change);
    }
  };

  const handleChange = (change: number) => {
    if (change === -1 && pageIndex > 0) {
      setPage(pageIndex - 1);
    }
    if (change === 1 && pageIndex < numPages - 1) {
      setPage(pageIndex + 1);
    }
  };

  return (
    <div
      className={styles.pages}
      style={isFoodSelected ? { display: 'none' } : {}}
    >
      <div
        id='prevPage'
        className={`${styles.leftIcon}
         ${pageIndex === 0 ? styles.disabled : ''}
        `}
        onClick={() => handleChange(-1)}
        onKeyDown={(e) => keyDownHandler(e, -1)}
        tabIndex={0}
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
        id='nextPage'
        className={`${styles.rightIcon} ${
          pageIndex >= numPages - 1 ? styles.disabled : ''
        }`}
        onClick={() => handleChange(1)}
        onKeyDown={(e) => keyDownHandler(e, 1)}
        tabIndex={0}
      >
        <LeftIcon />
      </div>
    </div>
  );
};

export default Pages;
