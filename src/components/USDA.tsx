import { useState } from 'react';
import styles from './USDA.module.scss';

const USDA = ({ show }: { show: boolean }) => {
  const [search, setSearch] = useState('');

  return (
    <div className={styles.usda} style={{ display: show ? 'block' : 'none' }}>
      <div className={`search ${styles.search}`}>
        <input
          type='text'
          placeholder='Search...'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className={`results ${styles.results}`}>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium
          quia recusandae itaque ullam rerum porro, velit pariatur voluptatibus
          ea voluptate suscipit tempora totam quos minus incidunt odit tenetur
          dolores doloribus explicabo nisi consectetur earum! Id, delectus eos,
          dolores itaque accusamus quaerat totam repellendus sed temporibus
          facere deleniti incidunt consectetur debitis reiciendis ad commodi rem
          labore, eveniet possimus eius? Eum quis, quos velit tempore ad fugit!
          Autem, architecto unde temporibus cum minima deserunt odit inventore
          possimus laboriosam fugit at asperiores! Tempore, alias doloribus
          illum temporibus ut earum aliquid corrupti eum animi possimus laborum
          esse hic laudantium rem rerum quibusdam quis, fugit fugiat iure quo
          est eius quas iusto. Sed laboriosam sint natus modi minus maxime
          excepturi quod quia! Incidunt optio vitae provident earum deleniti
          dignissimos necessitatibus soluta eligendi minima, eveniet molestiae
          consectetur eius magni! Quis accusantium cum distinctio cumque
          placeat, laudantium velit nostrum non, ducimus, fugiat nobis a ipsam
          ex adipisci quasi rem nisi culpa repudiandae veritatis nulla mollitia.
          Inventore delectus maxime fugit dignissimos ipsum minima repellat vel
          in sint alias aut dolore ea ducimus, nostrum excepturi iure nam
          recusandae error laboriosam accusamus numquam suscipit incidunt
          consectetur est? Quia unde maxime illum dolorum tempore officia
          necessitatibus rem, odio doloremque, libero asperiores.
        </p>
      </div>
    </div>
  );
};

export default USDA;
