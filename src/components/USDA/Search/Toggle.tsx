import { useContext } from 'react';
import type { FineliReducerActionType } from '../../../types';
import styles from './Toggle.module.scss';
import { FineliContext } from '../../../context/FineliContext';

const Toggle = ({ type, isOn }: { type: FineliReducerActionType; isOn: boolean }) => {
  const { dispatch } = useContext(FineliContext);

  return (
    <div
      className={`${styles.toggle} ${isOn ? styles['toggle--isOn'] : ''}`}
      onClick={() => dispatch({ type })}
      onKeyDown={(e) => e.code === 'Space' && dispatch({ type })}
      tabIndex={0}
    >
      <div className={`${styles.ball}`} />
    </div>
  );
};

export default Toggle;
