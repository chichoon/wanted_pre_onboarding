import { useState, useEffect, useRef } from 'react'

import { useClickAway } from 'react-use'
import cx from 'classnames'

import styles from './Dropdown.module.scss'
import { SearchIcon, TopArrowIcon } from '../../assets/svgs'

function Dropdown({ dropdownArr, setFunc }) {
  const [selectedStr, setSelectedStr] = useState(dropdownArr[0])
  const [isHidden, setIsHidden] = useState(true)
  const [searchInput, setSearchInput] = useState('')
  const ref = useRef(null)

  const handleOnChange = (e) => setSearchInput(e.target.value)

  const handleTopClick = () => setIsHidden(false)

  const handleListClick = (v) => {
    setSelectedStr(v)
    setIsHidden(true)
  }

  useEffect(() => {
    setFunc(selectedStr)
  }, [setFunc, selectedStr])

  useClickAway(ref, () => setIsHidden(true))

  return (
    <div className={styles.dropdownDiv}>
      <button type='button' className={styles.dropdownTop} onClick={handleTopClick}>
        <span className={styles.dropdownTopSpan}>{selectedStr}</span>
        <TopArrowIcon className={styles.dropdownSvgs} />
      </button>
      <div className={cx(styles.dropdownBottom, { [styles.isHidden]: isHidden })} ref={ref}>
        <div className={styles.searchInput}>
          <SearchIcon className={styles.dropdownSvgs} />
          <input type='text' onChange={handleOnChange} value={searchInput} placeholder='Search Symbol' />
        </div>
        <ul className={styles.selectList}>
          {dropdownArr
            .filter((v) => {
              if (searchInput === '') return v
              if (v.toLowerCase().includes(searchInput)) return v
              return 0
            })
            .map((v) => (
              <li key={`dropdown-list-${v}`}>
                <button type='button' onClick={() => handleListClick(v)}>
                  {v}
                </button>
              </li>
            ))}
        </ul>
      </div>
    </div>
  )
}

export default Dropdown
