import styles from './USDA.module.scss';

// import Food from './Fineli/Food/Food';
// import Results from './USDA/Results/Results';
import Search from './USDA/Search/Search';
// import Pages from './Common/Pages';

const USDA = ({ show }: { show: boolean }) => {
  return (
    <div className={styles.usda} style={show ? {} : { display: 'none' }}>
      <Search />
      {/* <Results /> */}
      {/* <Food /> */}
      {/* <Pages /> */}
    </div>
  );
};

export default USDA;
