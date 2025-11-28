import LeftIcon from '../svg/LeftIcon';
import styles from './Pages.module.scss';

const Pages = ({
  numResults,
  pageNum,
  numPages,
}: {
  numResults: number;
  pageNum: number;
  numPages: number;
}) => {
  return (
    <div className={styles.pages}>
      <div
        className={`${styles.leftIcon} ${pageNum === 1 ? styles.disabled : ''}`}
      >
        <LeftIcon />
      </div>
      <div className={styles.info}>
        <div>{numResults} results</div>
        <div>
          page {pageNum}/{numPages}
        </div>
      </div>
      <div
        className={`${styles.rightIcon} ${
          pageNum === numPages ? styles.disabled : ''
        }`}
      >
        <LeftIcon />
      </div>
    </div>
  );
};

export default Pages;
