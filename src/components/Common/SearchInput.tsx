import styles from './SearchInput.module.scss';

import type { ChangeEvent } from 'react';
import CloseIcon from '../../svg/CloseIcon';

const SearchInput = ({
  id,
  placeholder,
  value,
  setValue,
}: {
  id: string;
  placeholder: string;
  value: string;
  setValue: (value: string) => void;
}) => {
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <div className={styles.searchInput}>
      <input
        id={id}
        type='text'
        placeholder={placeholder}
        onChange={onChange}
        value={value}
      />
      <div
        className={styles.clear}
        onClick={() => {
          setValue('');
          document.getElementById(id)?.focus();
        }}
        style={{
          opacity: value.length === 0 ? 0 : 100,
          transition: 'all .1s',
          // cursor: value.length === 0 ? 'default' : 'pointer',
        }}
      >
        <CloseIcon strokeWidth={18} />
      </div>
    </div>
  );
};

export default SearchInput;
