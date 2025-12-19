import type { CSSProperties } from 'react';
import styles from './BarThousand.module.scss';

const BarThousand = ({
  pctg,
  text,
  style,
}: {
  pctg?: number;
  text?: string;
  style?: CSSProperties;
}) => {
  const divIndices = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  const getWidth = (pctg: number, index: number) => {
    const w = pctg - index * 100;
    return w < 0 ? '0%' : w < 100 ? w + '%' : '100%';
  };

  return (
    <div
      className={styles.barThousand}
      style={{ height: text ? '1.2rem' : '0.4rem' }}
    >
      {text ? <div className={styles.text}>{text}</div> : <></>}

      {pctg !== undefined
        ? divIndices.map((index) => (
            <div className={styles.tenth} key={index}>
              <div
                style={{
                  ...style,
                  width: getWidth(pctg, index),
                }}
              />
            </div>
          ))
        : divIndices.map((index) => (
            <div className={styles.percentage} key={index}>
              <div>{index < 3 ? `${(index + 1) * 100}%` : ''}</div>
            </div>
          ))}
    </div>
  );
};

export default BarThousand;
