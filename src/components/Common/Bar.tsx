import type { CSSProperties } from 'react';
import styles from './Bar.module.scss';

const Bar = ({
  name,
  percentage,
  style,
}: {
  name?: string;
  percentage?: number;
  style?: CSSProperties;
}) => {
  const pctg = percentage || 0;

  return (
    <div className={`${styles.bar} ${!name && styles['bar--thin']}`}>
      {name ? (
        <p>
          {name}: {percentage}%
        </p>
      ) : (
        <></>
      )}
      <div
        className={styles.fill}
        style={{ width: pctg + '%', ...style }}
      />
    </div>
  );
};

export default Bar;
