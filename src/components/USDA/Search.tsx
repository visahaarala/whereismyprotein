import { useContext } from 'react';
import styles from './Search.module.scss';

import Toggle from '../Common/Toggle';
import { UsdaContext } from '../../context/UsdaContext';
import { categories } from '../../data/usda/categories';
import RangeSlider from '../Common/RangeSlider';
import ModeSelect from '../Common/ModeSelect';
import type { UsdaViewMode } from '../../types';
import SearchInput from '../Common/SearchInput';
import Categories from './Categories';

const Search = () => {
  const { state, dispatch } = useContext(UsdaContext);

  return (
    <div
      className={styles.search}
      style={
        state.selectedFood
          ? { display: 'none' }
          : state.viewMode === 'view categories'
            ? { flex: 1 }
            : {}
      }
    >
      <h6>energy density</h6>

      <RangeSlider
        // displayRange={{ min: 0, max: 900 }}
        // unit='kcal/100g'
        endText='of 900kcal/100g'
        value={state.energyDensity}
        setValue={(energyDensity) =>
          dispatch({ type: 'SET_LIMITS', payload: { energyDensity } })
        }
      />

      <h6>percentage of rdi</h6>

      <div className={styles.property}>
        <div />
        <div>
          <Toggle
            name='EAAs'
            isOn={state.eaasOn}
            toggleIsOn={() => dispatch({ type: 'TOGGLE_EAAS' })}
          />
        </div>
        <div />
        <div>
          <Toggle
            name='Protein'
            isOn={state.proteinOn}
            toggleIsOn={() => dispatch({ type: 'TOGGLE_PROTEIN' })}
          />
        </div>
        <div />
        <div>
          <Toggle
            name='Fiber'
            isOn={state.fiberOn}
            toggleIsOn={() => dispatch({ type: 'TOGGLE_FIBER' })}
          />
        </div>
        <div />
      </div>

      <RangeSlider
        name='RDI'
        value={state.rdi}
        setValue={(rdi) => dispatch({ type: 'SET_LIMITS', payload: { rdi } })}
        type='min'
      />

      <div className={styles.modeAndRaw}>
        <ModeSelect<UsdaViewMode>
          options={['search', 'view categories']}
          selectedOption={state.viewMode}
          toggleFn={() => dispatch({ type: 'TOGGLE_VIEW_MODE' })}
        />
        <Toggle
          name='raw'
          isOn={state.searchRaw}
          toggleIsOn={() => dispatch({ type: 'TOGGLE_RAW' })}
        />
      </div>

      {state.viewMode === 'search' ? (
        <>
          <select
            id='usdaCategory'
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
          <SearchInput
            id='usdaSearch'
            placeholder='Search'
            value={state.searchString}
            setValue={(searchString: string) =>
              dispatch({
                type: 'SET_SEARCH',
                payload: { searchString },
              })
            }
          />
        </>
      ) : (
        <Categories />
      )}
    </div>
  );
};

export default Search;
