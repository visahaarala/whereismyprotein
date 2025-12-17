import { useContext } from 'react';
import styles from './Categories.module.scss';
import { UsdaContext } from '../../context/UsdaContext';
import { categories } from '../../data/usda/categories';
import Bar from '../Common/Bar';
import getFoods from '../../data/usda/getFoods';

const Categories = () => {
  const { state } = useContext(UsdaContext);

  const allFoods = getFoods();

  const categoryTotals: { [key: string]: number } = {};
  for (const food of allFoods) {
    if (!categoryTotals[food.category]) {
      categoryTotals[food.category] = 1;
    } else {
      categoryTotals[food.category]++;
    }
  }

  const categoryFiltered: { [key: string]: number } = {};
  for (const food of state.results) {
    if (!categoryFiltered[food.category]) {
      categoryFiltered[food.category] = 1;
    } else {
      categoryFiltered[food.category]++;
    }
  }

  const categoryNames = Object.keys(categories).map((key) => categories[key]);

  return (
    <div
      className={styles.categories}
      style={state.viewMode !== 'view categories' ? { display: 'none' } : {}}
    >
      {categoryNames.map((name) => {
        const percentage = categoryFiltered[name]
          ? Math.round((categoryFiltered[name] / categoryTotals[name]) * 100)
          : 0;

        return <Bar key={name} name={name} percentage={percentage} />;
      })}
    </div>
  );
};

export default Categories;
