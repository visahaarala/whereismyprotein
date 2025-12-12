import styles from './Fineli.module.scss';

import Pages from './Fineli/Results/Pages';
import Food from './Fineli/Food/Food';
import Search from './Fineli/Search/Search';
import Results from './Fineli/Results/Results';

const Fineli = ({ show }: { show: boolean }) => {
  // results 
  // if food chosen, show food
  // else show search, results & pages

  return (
    <div className={styles.fineli} style={show ? {} : { display: 'none' }}>
      <Search />
      <Results />
      <Pages />
      <Food />
    </div>
  );
};

export default Fineli;
