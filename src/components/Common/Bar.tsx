import type { CSSProperties } from 'react';
import styles from './Bar.module.scss';

const Bar = ({
  text,
  span,
  percentage,
  style,
  disabled = false,
}: {
  text?: string;
  span?: string;
  percentage?: number;
  style?: CSSProperties;
  disabled?: boolean;
}) => {
  const pctg = percentage || 0;

  return (
    <div
      className={`${styles.bar} ${!text && styles['bar--thin']} ${disabled && styles['bar--disabled']}`}
    >
      {text ? (
        <p>
          {text}
          {span ? <span>{span}</span> : <></>}
        </p>
      ) : (
        <></>
      )}
      <div className={styles.fill} style={{ ...style, width: pctg + '%' }} />
    </div>
  );
};

export default Bar;
