import styles from './Toggle.module.scss';

const Toggle = ({ isOn, toggleIsOn }: { isOn: boolean, toggleIsOn: () => void }) => {

  return (
    <div
      className={`${styles.toggle} ${isOn ? styles['toggle--isOn'] : ''}`}
      onClick={toggleIsOn}
      onKeyDown={(e) => e.code === 'Space' && toggleIsOn}
      tabIndex={0}
    >
      <div className={`${styles.ball}`} />
    </div>
  );
};

export default Toggle;
