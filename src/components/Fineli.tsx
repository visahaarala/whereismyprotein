import { useState } from 'react';
import styles from './Fineli.module.scss';
import SettingsIcon from '../svg/SettingsIcon';
import CloseIcon from '../svg/CloseIcon';
import Pages from './Pages';

const Fineli = ({ show }: { show: boolean }) => {
  const [search, setSearch] = useState('');
  const [showSettings, setShowSettings] = useState(false);
  const [lang, setLang] = useState<'en' | 'fi'>(
    navigator.language.includes('fi') ? 'fi' : 'en'
  );

  return (
    <div className={styles.fineli} style={{ display: show ? 'flex' : 'none' }}>
      <div className={styles.search}>
        {showSettings ? (
          <h2>Settings</h2>
        ) : (
          <>
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
          </>
        )}
        <div
          className={styles.settingsIcon}
          onClick={() => setShowSettings(!showSettings)}
        >
          {showSettings ? <CloseIcon /> : <SettingsIcon />}
        </div>
      </div>
      {showSettings ? (
        <div className={styles.results}>
          <h3>Type & info limits</h3>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Temporibus
            accusantium sapiente cupiditate numquam? Nam magnam, asperiores
            assumenda veniam natus dolores.
          </p>
          <h3>Percentage limits</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusamus
            culpa quo, eos perferendis, odit doloremque ratione quam mollitia
            nostrum neque laborum recusandae veritatis rerum pariatur distinctio
            nesciunt at adipisci nam.
          </p>
        </div>
      ) : (
        <>
          <div className={styles.results}>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Praesentium quia recusandae itaque ullam rerum porro, velit
              pariatur voluptatibus ea voluptate suscipit tempora totam quos
              minus incidunt odit tenetur dolores doloribus explicabo nisi
              consectetur earum! Id, delectus eos, dolores itaque accusamus
              quaerat totam repellendus sed temporibus facere deleniti incidunt
              consectetur debitis reiciendis ad commodi rem labore, eveniet
              possimus eius? Eum quis, quos velit tempore ad fugit! Autem,
              architecto unde temporibus cum minima deserunt odit inventore
              possimus laboriosam fugit at asperiores! Tempore, alias doloribus
              illum temporibus ut earum aliquid corrupti eum animi possimus
              laborum esse hic laudantium rem rerum quibusdam quis, fugit fugiat
              iure quo est eius quas iusto. Sed laboriosam sint natus modi minus
              maxime excepturi quod quia! Incidunt optio vitae provident earum
              deleniti dignissimos necessitatibus soluta eligendi minima,
              eveniet molestiae consectetur eius magni! Quis accusantium cum
              distinctio cumque placeat, laudantium velit nostrum non, ducimus,
              fugiat nobis a ipsam ex adipisci quasi rem nisi culpa repudiandae
              veritatis nulla mollitia. Inventore delectus maxime fugit
              dignissimos ipsum minima repellat vel in sint alias aut dolore ea
              ducimus, nostrum excepturi iure nam recusandae error laboriosam
              accusamus numquam suscipit incidunt consectetur est? Quia unde
              maxime illum dolorum tempore officia necessitatibus rem, odio
              doloremque, libero asperiores.
            </p>
          </div>
          <Pages numResults={350} numPages={7} pageNum={7} />
        </>
      )}
    </div>
  );
};

export default Fineli;
