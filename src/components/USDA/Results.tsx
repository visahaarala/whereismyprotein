import { useContext, useEffect, useRef, type KeyboardEvent } from 'react';
import styles from './Results.module.scss';
import capitalize from '../../util/capitalize';
import { UsdaContext } from '../../context/UsdaContext';
import type { UsdaFood } from '../../types';

const Results = () => {
  const { state, dispatch } = useContext(UsdaContext);

  const resultsRef = useRef<HTMLDivElement>(null);

  const resultsOnPage = state.results.slice(
    state.pageIndex * 100,
    (state.pageIndex + 1) * 100
  );

  useEffect(() => {
    if (resultsRef.current) {
      resultsRef.current.scrollTop = 0;
    }
  }, [state.pageIndex]);

  const keyDownHandler = (e: KeyboardEvent, food: UsdaFood) => {
    const indexChange =
      e.code === 'ArrowUp' ? -1 : e.code === 'ArrowDown' ? 1 : undefined;
    if (indexChange !== undefined) {
      e.preventDefault();
      const tabs = window.document.querySelectorAll('[tabIndex]');
      const index = Array.from(tabs).indexOf(e.target as Element);
      (tabs[index + indexChange] as HTMLElement).focus();
      return;
    }
    if (e.code === 'Tab') {
      e.preventDefault();
      if (e.shiftKey === true) {
        document.getElementById('searchInput')?.focus();
      } else {
        document.getElementById('prevPage')?.focus();
      }
    }
    if (e.code === 'Enter' || e.code === 'Space') {
      dispatch({
        type: 'SET_SELECTED_FOOD',
        payload: { selectedFood: food },
      });
    }
  };

  return (
    <div
      className={styles.results}
      style={
        state.selectedFood || state.viewMode === 'view categories'
          ? { display: 'none' }
          : {}
      }
      id='FineliResults'
      ref={resultsRef}
      tabIndex={-1}
    >
      {resultsOnPage.map((food) => (
        <p
          key={food.id}
          onClick={() =>
            dispatch({
              type: 'SET_SELECTED_FOOD',
              payload: { selectedFood: food },
            })
          }
          tabIndex={0}
          onKeyDown={(e) => keyDownHandler(e, food)}
        >
          {capitalize(food.description)}
        </p>
      ))}
    </div>
  );
};

export default Results;
