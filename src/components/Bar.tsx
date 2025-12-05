import type { CSSProperties } from 'react';
import styles from './Bar.module.scss';

const Bar = ({
  name,
  percentage,
  fillStyle,
}: {
  name?: string;
  percentage?: number;
  fillStyle?: CSSProperties;
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
        style={{ width: pctg + '%', ...fillStyle }}
      />
    </div>
  );
};

export default Bar;
