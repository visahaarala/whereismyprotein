import type { JSX } from 'react';
import styles from './ModeSelect.module.scss';

const ModeSelect = <Mode,>({
  options,
  selectedOption,
  toggleFn,
}: {
  options: Mode[];
  selectedOption: Mode;
  toggleFn: () => void;
}) => {
  const optionElements: JSX.Element[] = [];
  for (const index in options) {
    optionElements.push(
      <span
        key={index}
        style={
          selectedOption === options[index]
            ? { textDecoration: 'underline' }
            : {}
        }
      >
        {options[index] as string}
      </span>
    );
    if (Number(index) < options.length - 1) {
      optionElements.push(<div key={index + '-'} />);
    }
  }

  return (
    <div className={styles.modeSelect}>
      <div className={styles.modeSelect__line} />
      <div className={styles.modeSelect__select} onClick={toggleFn}>
        {optionElements}
      </div>
      <div className={styles.modeSelect__line} />
    </div>
  );
};
export default ModeSelect;
