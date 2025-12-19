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

  const categoryInfo: {
    [key: string]: {
      percentage: number;
      totalFoods: number;
      filteredFoods: number;
    };
  } = {};

  categoryNames.forEach((name) => {
    const totalFoods = categoryTotals[name];
    const filteredFoods = categoryFiltered[name] || 0;
    const percentage = Math.round((filteredFoods / totalFoods) * 100);
    categoryInfo[name] = { totalFoods, filteredFoods, percentage };
  });

  return (
    <div
      className={styles.categories}
      style={state.viewMode !== 'view categories' ? { display: 'none' } : {}}
    >
      {Object.keys(categoryInfo).map((name) => {
        const {
          // totalFoods, filteredFoods,
          percentage,
        } = categoryInfo[name];
        return (
          <Bar
            key={name}
            percentage={percentage}
            text={`${name}: ${percentage}%`}
            // text={`${name}: ${percentage}% (${filteredFoods}/${totalFoods})`}
          />
        );
      })}
    </div>
  );
};

export default Categories;
