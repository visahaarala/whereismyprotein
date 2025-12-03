import { useContext } from 'react';
import styles from './Fineli.module.scss';
import { FineliContext } from '../context/FineliContext';
import Search from './Search';
import Results from './Results';
import Pages from './Pages';
import Settings from './Settings';
// import SettingsIcon from '../svg/SettingsIcon';
// import CloseIcon from '../svg/CloseIcon';
// import Pages from './Pages';
// import { categories } from '../data/fineli/categories';
// import getFoods from '../data/fineli/getFoods';
// import type { FineliFoodType, LanguageType } from '../@types/types';
// import FineliFood from './FineliFood';
// import capitalize from '../functions/capitalize';

const Fineli = ({ show }: { show: boolean }) => {
  // const [onlyRaw, setOnlyRaw] = useState(false);
  // const [onlyScientific, setOnlyScientific] = useState(false);
  // const [category, setCategory] = useState<string | undefined>(undefined);
  // const [search, setSearch] = useState('');
  // const [pageIndex, setPageIndex] = useState(0);
  // const [selectedFood, setSelectedFood] = useState<FineliFoodType | undefined>(
  //   undefined
  // );
  // const [showSettings, setShowSettings] = useState(false);
  // const [lang, setLang] = useState<LanguageType>(
  //   navigator.language.includes('fi') ? 'fi' : 'en'
  // );

  // const foodsAfterSettings = getFoods()
  //   .filter((food) => !onlyRaw || food.raw)
  //   .filter((food) => !onlyScientific || food.scientific);

  // const foodsAfterCategory = foodsAfterSettings.filter((food) =>
  //   category ? food.category === category : true
  // );

  // const foodsAfterSearch = foodsAfterCategory
  //   .filter((food) => {
  //     const words = search.split(' ').map((word) => word.toLowerCase());
  //     for (const word of words) {
  //       const foodName = food[lang].toLowerCase();
  //       if (word.charAt(0) === '-') {
  //         // must not include
  //         const excludeWord = word.slice(1);
  //         if (excludeWord.length > 0 && foodName.includes(excludeWord)) {
  //           return false;
  //         }
  //       } else {
  //         if (!foodName.includes(word)) {
  //           return false;
  //         }
  //       }
  //     }
  //     return true;
  //   })
  //   .sort((a, b) => a[lang].localeCompare(b[lang]));

  // const foodsOnPage = foodsAfterSearch.slice(
  //   pageIndex * 100,
  //   (pageIndex + 1) * 100
  // );

  const showSettings = useContext(FineliContext).showSettingsState[0];

  return (
    <div className={styles.fineli} style={{ display: show ? 'flex' : 'none' }}>
      <div style={showSettings ? { display: 'none' } : { display: 'flex' }}>
        <Search />
        <Results />
        <Pages />
      </div>
      <div style={showSettings ? { display: 'flex' } : { display: 'none' }}>
        <Settings />
      </div>

      {/* <div className={styles.search}>
        {showSettings ? (
          <div>
            <h2>Settings</h2>
            <div
              className={styles.settingsIcon}
              onClick={() => setShowSettings(false)}
            >
              <CloseIcon />
            </div>
          </div>
        ) : (
          <>
            <div>
              <select
                name='category'
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                  setPageIndex(0);
                }}
              >
                <option key='undefined' value={undefined}></option>
                {Object.keys(categories).map((key) => (
                  <option key={key} value={key}>
                    {categories[key][lang]}
                  </option>
                ))}
              </select>

              <div
                className={styles.settingsIcon}
                onClick={() => {
                  setShowSettings(true);
                  setPageIndex(0);
                }}
              >
                <SettingsIcon />
              </div>
            </div>
            <div>
              <input
                type='text'
                placeholder={lang === 'fi' ? 'Hae...' : 'Search...'}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <div
                className={styles.language}
                onClick={() => setLang(lang === 'en' ? 'fi' : 'en')}
              >
                <span
                  style={lang === 'en' ? { textDecoration: 'underline' } : {}}
                >
                  en
                </span>
                <div />
                <span
                  style={lang === 'fi' ? { textDecoration: 'underline' } : {}}
                >
                  fi
                </span>
              </div>
            </div>
          </>
        )}
      </div>
      {showSettings ? (
        <div className={styles.results}>
          <div className={styles.property}>
            <span>Unprocessed or raw</span>
            <input
              type='checkBox'
              checked={onlyRaw}
              onChange={() => setOnlyRaw(!onlyRaw)}
            />
          </div>
          <div className={styles.property}>
            <span>Has a scientific name</span>
            <input
              type='checkbox'
              checked={onlyScientific}
              onChange={() => setOnlyScientific(!onlyScientific)}
            />
          </div>
          <div className={styles.numResults}>
            {foodsAfterSettings.length} results
          </div>
        </div>
      ) : (
        <>
          <div
            className={styles.results}
            style={selectedFood ? { display: 'none' } : {}}
          >
            {foodsOnPage.map((food) => (
              <p key={food.id} onClick={() => setSelectedFood(food)}>
                {capitalize(food[lang])}
                {food.scientific ? (
                  <span>({capitalize(food.scientific)})</span>
                ) : (
                  <></>
                )}
              </p>
            ))}
          </div>
          <Pages
            numResults={foodsAfterSearch.length}
            numPages={Math.ceil(foodsAfterSearch.length / 100)}
            pageIndex={pageIndex}
            setPageIndex={setPageIndex}
            display={selectedFood === undefined}
          />
          <FineliFood
            food={selectedFood}
            lang={lang}
            setSelectedFood={setSelectedFood}
          />
        </>
      )}         */}
    </div>
  );
};

export default Fineli;
