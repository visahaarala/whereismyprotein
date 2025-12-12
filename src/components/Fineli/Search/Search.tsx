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
          <span>Raw</span>
          <Toggle type={'TOGGLE_IS_RAW'} stateKey={'isRaw'} />
        </div>
        <div />
        <div>
          <span>Scientific</span>
          <Toggle type={'TOGGLE_HAS_SCIENTIFIC'} stateKey={'hasScientific'} />
        </div>
      </div>
      <div className={styles.modes}>
        <div className={styles.modes__line} />
        <div
          className={styles.modes__select}
          onClick={() => dispatch({ type: 'TOGGLE_FILTER_MODE' })}
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
            limit
          </span>
        </div>
        <div className={styles.modes__line} />
        <div
          className={styles.modes__select}
          onClick={() => dispatch({ type: 'TOGGLE_LANGUAGE' })}
        >
          <span
            style={
              state.language === 'en' ? { textDecoration: 'underline' } : {}
            }
          >
            english
          </span>
          <div />
          <span
            style={
              state.language === 'fi' ? { textDecoration: 'underline' } : {}
            }
          >
            finnish
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
          >
            <option key='undefined' value={undefined} />
            {Object.keys(categories).map((key) => (
              <option key={key} value={key}>
                {categories[key][state.language]}
              </option>
            ))}
          </select>
          <input
            type='text'
            placeholder={state.language === 'fi' ? 'Hae' : 'Search'}
            value={state.searchString}
            onChange={(e) =>
              dispatch({
                type: 'SET_SEARCH',
                payload: { searchString: e.target.value },
              })
            }
          />
        </>
      ) : (
        <Limits />
      )}
    </div>
  );
};

export default Search;
