import React, { useState, useEffect, useRef } from 'react';

import { useClickAway } from 'react-use';
import cx from 'classnames';

import styles from './Dropdown.module.scss';
import { SearchIcon, TopArrow } from '../../assets/svgs';

const Dropdown = ({ dropdownArr, setFunc }) => {
  const [selectedStr, setSelectedStr] = useState(dropdownArr[0]);
  const [isHidden, setIsHidden] = useState(true);
  const [searchInput, setSearchInput] = useState('');
  const ref = useRef(null);

  const handleOnChange = e => {
    setSearchInput(e.target.value);
  };

  const handleTopClick = e => {
    e.preventDefault();
    setIsHidden(isHidden ? false : true);
  };

  const handleListClick = (e, v) => {
    e.preventDefault();
    setSelectedStr(v);
    setIsHidden(true);
  };

  useEffect(() => {
    setFunc(selectedStr);
  }, [selectedStr]);

  useClickAway(ref, () => {
    console.log('clicked away');
    setIsHidden(true);
  });

  return (
    <div className={styles.dropdownDiv}>
      <div className={styles.dropdownTop} onClick={handleTopClick}>
        <div className={styles.dropdownTopHeader}>{selectedStr}</div>
        <TopArrow className={styles.topArrow} />
      </div>
      <div className={styles.dropdownBottom} ref={ref}>
        <div
          className={cx(styles.searchInput, { [styles.isHidden]: isHidden })}
        >
          <SearchIcon className={styles.searchIcon} />
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
              <li key={i} onClick={e => handleListClick(e, v)}>
                {v}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default Dropdown;
