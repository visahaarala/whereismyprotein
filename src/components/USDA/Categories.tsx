import { useContext } from 'react';
import styles from './Categories.module.scss';
import { UsdaContext } from '../../context/UsdaContext';
import { categories } from '../../data/usda/categories';
import Bar from '../Common/Bar';

const Categories = () => {
  const { state } = useContext(UsdaContext);

  return (
    <div
      className={styles.categories}
      style={state.viewMode !== 'view categories' ? { display: 'none' } : {}}
    >
      {Object.keys(categories).map((key) => {
        return <Bar name={categories[key]} />;
      })}
    </div>
  );
};

export default Categories;
