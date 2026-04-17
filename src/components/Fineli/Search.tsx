import { useContext } from 'react';
import styles from './Search.module.scss';

import Toggle from '../Common/Toggle';
import { FineliContext } from '../../context/FineliContext';
import { categories } from '../../data/fineli/categories';
import Limits from './Limits';
import ModeSelect from '../Common/ModeSelect';
import type { FineliFilterMode } from '../../types';
import SearchInput from '../Common/SearchInput';

const Search = () => {
  const { state, dispatch } = useContext(FineliContext);

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

      <ModeSelect<FineliFilterMode>
        options={['Search', 'Limit']}
        selectedOption={state.filterMode}
        toggleFn={() => dispatch({ type: 'TOGGLE_FILTER_MODE' })}
      />

      {state.filterMode === 'Search' ? (
        <>
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
        </>
      ) : (
        <Limits />
      )}
    </div>
  );
};

export default Search;
