import React, { useState, useEffect } from 'react';

import styles from './Dropdown.module.scss';
import { TopArrow } from '../../svgs';
import DropdownBottom from './DropdownBottom';

const Dropdown = ({ dropdownArr, setFunc }) => {
  const [selectedStr, setSelectedStr] = useState(dropdownArr[0]);
  const [ifHidden, setIfHidden] = useState(true);

  const handleOnClick = e => {
    e.preventDefault();
    setIfHidden(ifHidden ? false : true);
  };

  useEffect(() => {
    setFunc(selectedStr);
  }, [selectedStr]);

  return (
    <div className={styles.dropdownDiv}>
      <div className={styles.dropdownTop} onClick={handleOnClick}>
        <div className={styles.dropdownTopHeader}>{selectedStr}</div>
        <TopArrow className={styles.topArrow} />
      </div>
      <DropdownBottom
        dropdownArr={dropdownArr}
        ifHidden={ifHidden}
        setIfHidden={setIfHidden}
        setStr={setSelectedStr}
      />
    </div>
  );
};

export default Dropdown;
