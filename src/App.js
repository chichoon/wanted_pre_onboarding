import { useState } from 'react'

import { Dropdown, Input, Slider, Tab, Toggle } from './components'

import styles from './App.module.scss'

function App() {
  const [toggleSelected, setToggleSelected] = useState('')
  const [tabSelected, setTabSelected] = useState('')
  const [sliderValue, setSliderValue] = useState(0)
  const [inputEmail, setInputEmail] = useState('')
  const [inputPassword, setInputPassword] = useState('')
  const [dropdownSelected, setDropdownSelected] = useState('')

  return (
    <div className={styles.app}>
      <section className={styles.appSection}>
        <Toggle firstString='기본' secondString='상세' setFunc={setToggleSelected} />
        <h4 className={styles.componentValue}>Selected: {toggleSelected}</h4>
      </section>
      <section className={styles.appSection}>
        <Tab selectorArr={['감자', '고구마', '카레라이스']} setFunc={setTabSelected} />
        <h4 className={styles.componentValue}>Selected: {tabSelected}</h4>
      </section>
      <section className={styles.appSection}>
        <Slider setFunc={setSliderValue} />
        <h4 className={styles.componentValue}>Value: {sliderValue}</h4>
      </section>
      <section className={styles.appSection}>
        <Input setFuncEmail={setInputEmail} setFuncPassword={setInputPassword} />
        <h4 className={styles.componentValue}>Email: {inputEmail}</h4>
        <h4 className={styles.componentValue}>Password: {inputPassword}</h4>
      </section>
      <section className={styles.appSection}>
        <Dropdown
          dropdownArr={['BTCUSD.PERP', 'BCHUSD.PERP', 'ETHUSD.PERP', 'BANUSD.PERP', 'XPRUSD.PERP']}
          setFunc={setDropdownSelected}
        />
        <h4 className={styles.componentValue}>Selected: {dropdownSelected} </h4>
      </section>
    </div>
  )
}

export default App
