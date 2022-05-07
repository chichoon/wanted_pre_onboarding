import { useEffect, useState } from 'react'

import cx from 'classnames'

import styles from './Tab.module.scss'

function Tab({ selectorArr, setFunc }) {
  const selectorLength = selectorArr.length
  const [selectedIndex, setSelectedIndex] = useState(0)

  const handleOnClick = (index) => {
    setSelectedIndex(index)
  }

  useEffect(() => {
    setFunc([selectorArr[selectedIndex]])
  }, [setFunc, selectorArr, selectedIndex])

  return (
    <div className={styles.tabDiv}>
      <section className={styles.tabTop}>
        {selectorArr.map((v, i) => (
          <button
            type='button'
            className={cx(styles.selectorDiv, { [styles.selectedDiv]: selectedIndex === i })}
            key={`selector-arr-${v}`}
            onClick={() => handleOnClick(i)}
            style={{ width: `calc(24rem / ${selectorLength})` }}
          >
            {selectorArr[i]}
          </button>
        ))}
      </section>
      <section className={styles.tabBottom}>
        <div
          className={styles.tabBar}
          style={{
            'margin-left': `calc(0.5rem + 24rem * ${selectedIndex / selectorLength})`,
            width: `calc(24rem / ${selectorLength})`,
          }}
        />
      </section>
    </div>
  )
}

export default Tab
