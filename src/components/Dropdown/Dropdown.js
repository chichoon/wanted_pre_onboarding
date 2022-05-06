import React, { useState, useEffect, useRef } from 'react';

import { useClickAway } from 'react-use';
import cx from 'classnames';

import styles from './Dropdown.module.scss';
import { SearchIcon, TopArrowIcon } from '../../assets/svgs';

const Dropdown = ({ dropdownArr, setFunc }) => {
  const [selectedStr, setSelectedStr] = useState(dropdownArr[0]);
  const [isHidden, setIsHidden] = useState(true);
  const [searchInput, setSearchInput] = useState('');
  const ref = useRef(null);

  const handleOnChange = e => setSearchInput(e.target.value);

  const handleTopClick = () => setIsHidden(false);

  const handleListClick = v => {
    setSelectedStr(v);
    setIsHidden(true);
  };

  useEffect(() => {
    setFunc(selectedStr);
  }, [selectedStr]);

  useClickAway(ref, () => setIsHidden(true));

  return (
    <div className={styles.dropdownDiv}>
      <button className={styles.dropdownTop} onClick={handleTopClick}>
        <span className={styles.dropdownTopSpan}>{selectedStr}</span>
        <TopArrowIcon className={styles.svgs} />
      </button>
      <div
        className={cx(styles.dropdownBottom, { [styles.isHidden]: isHidden })}
        ref={ref}
      >
        <div className={styles.searchInput}>
          <SearchIcon className={styles.svgs} />
          <input
            type="text"
            onChange={handleOnChange}
            value={searchInput}
            placeholder="Search Symbol"
          />
        </div>
        <ul className={styles.selectList}>
          {dropdownArr
            .filter(v => {
              if (searchInput === '') return v;
              else if (v.toLowerCase().includes(searchInput)) return v;
            })
            .map((v, i) => (
              <li key={i} onClick={() => handleListClick(v)}>
                {v}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default Dropdown;
