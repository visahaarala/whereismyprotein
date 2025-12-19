import type { CSSProperties } from 'react';
import styles from './Bar.module.scss';

const Bar = ({
  text,
  percentage,
  style,
}: {
  text?: string;
  percentage?: number;
  style?: CSSProperties;
}) => {
  const pctg = percentage || 0;

  return (
    <div className={`${styles.bar} ${!text && styles['bar--thin']}`}>
      {text ? <p>{text}</p> : <></>}
      <div className={styles.fill} style={{ ...style, width: pctg + '%' }} />
    </div>
  );
};

export default Bar;
