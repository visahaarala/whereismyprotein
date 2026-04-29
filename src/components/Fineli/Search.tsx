import { useContext } from 'react';
import styles from './Search.module.scss';

import Toggle from '../Common/Toggle';
import { FineliContext } from '../../context/FineliContext';
import { categories } from '../../data/fineli/categories';
import SearchInput from '../Common/SearchInput';
import RangeSlider from '../Common/RangeSlider';

const Search = () => {
  const { state, dispatch } = useContext(FineliContext);

  console.log('fibergrams', state.fiberGrams);

  return (
    <div
      className={styles.search}
      style={state.selectedFood ? { display: 'none' } : {}}
    >
      <div className={styles.property}>
        <div />
        <div>
          <Toggle
            name='Raw'
            isOn={state.isRaw}
            toggleIsOn={() => dispatch({ type: 'TOGGLE_IS_RAW' })}
          />
        </div>
        <div />
        <div>
          <Toggle
            name='Scientific'
            isOn={state.hasScientific}
            toggleIsOn={() => dispatch({ type: 'TOGGLE_HAS_SCIENTIFIC' })}
          />
        </div>
        <div />
        <div>
          <Toggle
            name='Finnish'
            isOn={state.language === 'fi'}
            toggleIsOn={() => dispatch({ type: 'TOGGLE_LANGUAGE' })}
          />
        </div>
        <div />
      </div>

      <RangeSlider
        name='Fiber'
        type='min'
        unit='g / 2000kcal'
        value={{ min: state.fiberGrams, max: 100 }}
        setValue={(range) =>
          dispatch({
            type: 'SET_FIBER_GRAMS',
            payload: { fiberGrams: range.min },
          })
        }
      />

      <select
        id='fineliCategory'
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
      <SearchInput
        id='fineliSearch'
        placeholder={state.language === 'fi' ? 'Hae' : 'Search'}
        value={state.searchString}
        setValue={(searchString: string) =>
          dispatch({
            type: 'SET_SEARCH',
            payload: { searchString },
          })
        }
      />
    </div>
  );
};

export default Search;
