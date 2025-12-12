import { useContext } from 'react';
import type { ReducerActionType } from '../../../@types';
import styles from './Toggle.module.scss';
import { FineliContext } from '../../../context/FineliContext';

const Toggle = ({ type, isOn }: { type: ReducerActionType; isOn: boolean }) => {
  const { dispatch } = useContext(FineliContext);

  return (
    <div
      className={`${styles.toggle} ${isOn ? styles['toggle--isOn'] : ''}`}
      onClick={() => dispatch({ type })}
    >
      <div className={`${styles.ball}`} />
    </div>
  );
};

export default Toggle;
