import { useContext } from 'react';
import styles from './Search.module.scss';

import Toggle from './Toggle';
import { FineliContext } from '../../../context/FineliContext';
import { categories } from '../../../data/fineli/categories';
import Limits from './Limits';

const Search = () => {
  const { state, dispatch } = useContext(FineliContext);

  return (
    <div
      className={styles.search}
      style={state.selectedFood ? { display: 'none' } : {}}
    >
      <div className={styles.property}>
        <div>
          <Toggle type={'TOGGLE_IS_RAW'} isOn={state.isRaw} />
          <span>Raw</span>
        </div>
        {/* <RangeSlider margin={5} /> */}
      </div>
      <div className={styles.modes}>
        <div className={styles.modes__line} />
        <div
          className={styles.modes__select}
          onClick={() => dispatch({ type: 'TOGGLE_FILTER_MODE' })}
          tabIndex={0}
        >
          <span
            style={
              state.filterMode === 'search'
                ? { textDecoration: 'underline' }
                : {}
            }
          >
            search
          </span>
          <div />
          <span
            style={
              state.filterMode === 'range'
                ? { textDecoration: 'underline' }
                : {}
            }
          >
            category distribution
          </span>
        </div>
        <div className={styles.modes__line} />
      </div>
      {state.filterMode === 'search' ? (
        <>
          <select
            name='category'
            id='category'
            value={state.category}
            onChange={(e) =>
              dispatch({
                type: 'SET_CATEGORY',
                payload: { category: e.target.value },
              })
            }
            tabIndex={0}
          >
            <option key='undefined' value={undefined} />
            {Object.keys(categories).map((key) => (
              <option key={key} value={key}>
                {categories[key][state.language]}
              </option>
            ))}
          </select>
          <input
            id='searchInput'
            type='text'
            placeholder={state.language === 'fi' ? 'Hae' : 'Search'}
            value={state.searchString}
            onChange={(e) =>
              dispatch({
                type: 'SET_SEARCH',
                payload: { searchString: e.target.value },
              })
            }
            tabIndex={0}
          />
        </>
      ) : (
        <Limits />
      )}
    </div>
  );
};

export default Search;
