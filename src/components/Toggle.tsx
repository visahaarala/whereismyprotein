import type { Dispatch, SetStateAction } from 'react';
import styles from './toggle.module.scss';

const Toggle = ({
  state,
}: {
  state: [boolean, Dispatch<SetStateAction<boolean>>];
}) => {
  const [isOn, setIsOn] = state;

  return (
    <div
      className={`${styles.toggle} ${isOn ? styles['toggle--isOn'] : ''}`}
      onClick={() => setIsOn(!isOn)}
    >
      <div className={`${styles.ball}`} />
    </div>
  );
};

export default Toggle;
