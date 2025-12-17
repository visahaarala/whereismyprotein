import styles from './Toggle.module.scss';

const Toggle = ({
  name,
  isOn,
  toggleIsOn,
}: {
  name: string;
  isOn: boolean;
  toggleIsOn: () => void;
}) => {
  return (
    <div className={styles.toggle} onClick={toggleIsOn}>
      <div
        className={`${styles.switch} ${isOn ? styles['switch--isOn'] : ''}`}
        // onKeyDown={(e) => e.code === 'Space' && toggleIsOn}
        // tabIndex={0}
      >
        <div className={`${styles.ball}`} />
      </div>
      <span>{name}</span>
    </div>
  );
};

export default Toggle;
