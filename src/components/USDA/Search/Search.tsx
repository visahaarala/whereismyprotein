import { useContext } from 'react';
import styles from './Search.module.scss';

import Toggle from '../../Common/Toggle';
import { UsdaContext } from '../../../context/UsdaContext';
import { categories } from '../../../data/usda/categories';
import RangeSlider from '../../Common/RangeSlider';

const Search = () => {
  const { state, dispatch } = useContext(UsdaContext);

  return (
    <div
      className={styles.search}
      style={state.selectedFood ? { display: 'none' } : {}}
    >
      <RangeSlider
        name={'energy density'}
        value={state.energyDensity}
        setValue={() => {}}
      />
      <RangeSlider
        name={'rdi'}
        value={state.rdi}
        setValue={() => {}}
      />
      <div className={styles.property}>
        <div>
          <Toggle
            isOn={state.eaas}
            toggleIsOn={() => dispatch({ type: 'TOGGLE_EAAS' })}
          />
          <span>EAAs</span>
        </div>
        <div />
        <div>
          <Toggle
            isOn={state.protein}
            toggleIsOn={() => dispatch({ type: 'TOGGLE_PROTEIN' })}
          />
          <span>Protein</span>
        </div>
        <div />
        <div>
          <Toggle
            isOn={state.fiber}
            toggleIsOn={() => dispatch({ type: 'TOGGLE_FIBER' })}
          />
          <span>Fiber</span>
        </div>
        {/* <RangeSlider margin={5} /> */}
      </div>
      <div className={styles.modes}>
        <div className={styles.modes__line} />
        <div
          className={styles.modes__select}
          onClick={() => {
            console.log('toggle view mode');
            dispatch({ type: 'TOGGLE_VIEW_MODE' });
          }}
          tabIndex={0}
        >
          <span
            style={
              state.viewMode === 'search' ? { textDecoration: 'underline' } : {}
            }
          >
            search
          </span>
          <div />
          <span
            style={
              state.viewMode === 'categoryDistribution'
                ? { textDecoration: 'underline' }
                : {}
            }
          >
            category distribution
          </span>
        </div>
        <div className={styles.modes__line} />
      </div>
      {state.viewMode === 'search' ? (
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
              <option key={key} value={categories[key]}>
                {categories[key]}
              </option>
            ))}
          </select>
          <input
            id='searchInput'
            type='text'
            placeholder='Search'
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
        <p>category distribution</p>
      )}
    </div>
  );
};

export default Search;
