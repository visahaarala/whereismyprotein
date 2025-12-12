import styles from './Search.module.scss';

import { useContext } from 'react';
import { FineliContext } from '../../../context/OldFineliContext';
import { categories } from '../../../data/fineli/categories';
import type { FineliFood } from '../../../@types';
import Toggle from './Toggle';
import Limits from './Limits';
import getFoods from '../../../data/fineli/getFoods';

const Search = () => {
  const ctx = useContext(FineliContext);

  const [isRaw] = ctx.onlyRawState;

  const [hasScientific] = ctx.hasScientificState;

  const [mode, setMode] = ctx.modeState;
  const [lang, setLang] = ctx.languageState;

  const [category, setCategory] = ctx.categoryState;
  const [search, setSearch] = ctx.searchState;

  const setPageIndex = ctx.pageIndexState[1];
  const setSearchResults = ctx.searchResultsState[1];
  // const settingsResults = ctx.settingsResultsState[0];
  const setSelectedFood = ctx.selectedFoodState[1];

  const getNewResults = (customSearch?: string): FineliFood[] => {
    const rs = getFoods()
      .filter((food) => !isRaw || food.raw)
      .filter((food) => !hasScientific || food.scientific)
      .filter(
        (food) => mode === 'search' && (!category || food.category === category)
      )
      .filter((food) => mode === 'search' && true);

    // if (mode === 'search') {

    //   return rs;
    // }

    return rs;
  };

  // return getFoods();

  // getFoods()
  //   .filter((food) => {
  //     // CATEGORY
  //     return category ? category === food.category : true;
  //   })
  //   .filter((food) => {
  //     // SEARCH STRING
  //     const words = customSearch
  //       ? customSearch.split(' ')
  //       : search.split(' ');
  //     for (const word of words) {
  //       if (word.charAt(0) === '-') {
  //         if (
  //           word.length > 1 &&
  //           (food[lang].toLowerCase().includes(word.slice(1).toLowerCase()) ||
  //             food.scientific
  //               ?.toLowerCase()
  //               .includes(word.slice(1).toLowerCase()))
  //         ) {
  //           return false;
  //         }
  //       } else {
  //         if (
  //           !food[lang].toLowerCase().includes(word.toLowerCase()) &&
  //           !food.scientific?.toLowerCase().includes(word.toLowerCase())
  //         ) {
  //           return false;
  //         }
  //       }
  //     }
  //     return true;
  //   })
  //   .sort((a, b) => a[lang].localeCompare(b[lang]));
  // };

  // useEffect(() => {
  //   console.log('useEffect to get results');
  //   setSearchResults(getNewResults());
  // }, [isRaw, hasScientific, mode]);

  // useEffect(() => {
  //   console.log('useEffect to get results for category');
  //   setSearch('');
  //   setSearchResults(getNewResults(''));
  // }, [category]);

  // useEffect(() => {
  //   const newResults = getNewResults();
  //   setSearchResults(newResults);
  //   if (newResults.length === 1) {
  //     setSelectedFood(newResults[0]);
  //   } else {
  //     setSelectedFood(undefined);
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [search]);

  // useEffect(() => {
  //   setSearch('');
  //   setSearchResults(getNewResults(''));
  //   setSelectedFood(undefined);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [category]);

  // useEffect(() => {
  //   // Language change doesn't change selectedFood
  //   setSearchResults(getNewResults());
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [lang]);

  return (
    <div className={styles.search}>
      <div className={styles.property}>
        <div>
          <span>Raw</span>
          <Toggle state={ctx.onlyRawState} />
        </div>
        <div />
        <div>
          <span>Scientific</span>
          <Toggle state={ctx.hasScientificState} />
        </div>
      </div>
      <div className={styles.modes}>
        <div className={styles.modes__line} />
        <div
          className={styles.modes__select}
          onClick={() => setMode(mode === 'search' ? 'limit' : 'search')}
        >
          <span
            style={mode === 'search' ? { textDecoration: 'underline' } : {}}
          >
            search
          </span>
          <div />
          <span style={mode === 'limit' ? { textDecoration: 'underline' } : {}}>
            limit
          </span>
        </div>
        <div className={styles.modes__line} />
        <div
          className={styles.modes__select}
          onClick={() => setLang(lang === 'en' ? 'fi' : 'en')}
        >
          <span style={lang === 'en' ? { textDecoration: 'underline' } : {}}>
            english
          </span>
          <div />
          <span style={lang === 'fi' ? { textDecoration: 'underline' } : {}}>
            finnish
          </span>
        </div>
        <div className={styles.modes__line} />
      </div>
      {mode === 'search' ? (
        <>
          <select
            name='category'
            id='category'
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              setPageIndex(0);
            }}
          >
            <option key='undefined' value={undefined} />
            {Object.keys(categories).map((key) => (
              <option key={key} value={key}>
                {categories[key][lang]}
              </option>
            ))}
          </select>
          <input
            type='text'
            placeholder={lang === 'fi' ? 'Hae' : 'Search'}
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPageIndex(0);
            }}
          />
        </>
      ) : (
        <Limits />
      )}
    </div>
  );
};

export default Search;
