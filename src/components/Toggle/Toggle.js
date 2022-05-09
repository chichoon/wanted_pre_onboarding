import { useEffect, useState } from 'react';

import cx from 'classnames';

import styles from './Toggle.module.scss';

function Toggle({ firstString, secondString, setFunc }) {
  const [isSelected, setIsSelected] = useState(false);

  const handleToggleClick = () => {
    setIsSelected((prevState) => !prevState);
  };

  useEffect(() => {
    setFunc(isSelected ? secondString : firstString);
  }, [isSelected, firstString, secondString, setFunc]);

  return (
    <div className={styles.toggleDiv}>
      <button type='button' className={styles.toggleParent} onClick={handleToggleClick}>
        <div className={styles.toggleFront}>
          <div className={cx(styles.toggleElement, { [styles.selected]: !isSelected })}>{firstString}</div>
          <div className={cx(styles.toggleElement, { [styles.selected]: isSelected })}>{secondString}</div>
        </div>
        <div className={styles.toggleBack}>
          <div className={cx(styles.toggleThumb, { [styles.moved]: isSelected })} />
        </div>
      </button>
    </div>
  );
}

export default Toggle;
