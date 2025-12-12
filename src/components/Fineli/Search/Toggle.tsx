// import type { Dispatch, SetStateAction } from 'react';
import { useContext } from 'react';
import type { ProgramState, ReducerActionType } from '../../../@types';
import styles from './Toggle.module.scss';
import { FineliContext } from '../../../context/FineliContext';

const Toggle = ({
  type,
  stateKey,
}: {
  type: ReducerActionType;
  stateKey: keyof ProgramState;
}) => {
  const { state, dispatch } = useContext(FineliContext);
  const isOn = state[stateKey];

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
