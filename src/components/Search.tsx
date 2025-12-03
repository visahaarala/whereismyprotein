import styles from './Search.module.scss';

import { useContext, useEffect } from 'react';
import { FineliContext } from '../context/FineliContext';
import SettingsIcon from '../svg/SettingsIcon';
import { categories } from '../data/fineli/categories';

const Search = () => {
  const ctx = useContext(FineliContext);
  const setShowSettings = ctx.showSettingsState[1];
  const [lang, setLang] = ctx.languageState;
  const [search, setSearch] = ctx.searchState;
  const [category, setCategory] = ctx.categoryState;
  const setPageIndex = ctx.pageIndexState[1];
  const setSearchResults = ctx.searchResultsState[1];
  const settingsResults = ctx.settingsResultsState[0];

  useEffect(() => {
    setSearchResults(
      settingsResults
        .filter((food) => {
          return category ? category === food.category : true;
        })
        .filter((food) => {
          const words = search.split(' ');
          for (const word of words) {
            if (word.charAt(0) === '-') {
              if (
                word.length > 1 &&
                (food[lang]
                  .toLowerCase()
                  .includes(word.slice(1).toLowerCase()) ||
                  food.scientific
                    ?.toLowerCase()
                    .includes(word.slice(1).toLowerCase()))
              ) {
                return false;
              }
            } else {
              if (
                !food[lang].toLowerCase().includes(word.toLowerCase()) &&
                !food.scientific?.toLowerCase().includes(word.toLowerCase())
              ) {
                return false;
              }
            }
          }
          return true;
        })
        .sort((a, b) => a[lang].localeCompare(b[lang]))
    );
  }, [category, search, settingsResults, lang, setSearchResults]);

  return (
    <div className={styles.search}>
      <div>
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
        <div
          className={styles.language}
          onClick={() => setLang(lang === 'en' ? 'fi' : 'en')}
        >
          <span style={lang === 'en' ? { textDecoration: 'underline' } : {}}>
            en
          </span>
          <div />
          <span style={lang === 'fi' ? { textDecoration: 'underline' } : {}}>
            fi
          </span>
        </div>
      </div>
      <div>
        <input
          type='text'
          placeholder={lang === 'fi' ? 'Hae' : 'Search'}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div
          className={styles.settingsIcon}
          onClick={() => setShowSettings(true)}
        >
          <SettingsIcon />
        </div>
      </div>
    </div>
  );
};

export default Search;
