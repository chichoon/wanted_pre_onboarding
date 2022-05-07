import { useEffect, useState } from 'react'

import cx from 'classnames'

import SliderBody from './SliderBody'
import styles from './Slider.module.scss'
import { CircleIcon } from '../../assets/svgs'

const SLIDER_VALUES = [1, 25, 50, 75, 100]
const SLIDER_CLASSNAMES = [styles.slider1P, styles.slider25P, styles.slider50P, styles.slider75P, styles.slider100P]

function Slider({ setFunc }) {
  const [sliderValue, setSliderValue] = useState(1)

  const handleSliderChange = (e) => {
    setSliderValue(e.target.value)
  }

  const handleButtonClick = (v) => {
    setSliderValue(v)
  }

  const setBackgroundDiv = () => {
    let arr = []
    for (let i = 0; i < 5; i += 1) {
      arr.push(
        <li
          key={`slider-value-${SLIDER_VALUES[i]}`}
          className={cx(SLIDER_CLASSNAMES[i], styles.sliderBackElem, { [styles.sliderFilled]: sliderValue >= i })}
        >
          <div className={styles.sliderDot}>
            <CircleIcon />
          </div>
          <button
            type='button'
            className={styles.sliderIndicator}
            onClick={() => handleButtonClick(SLIDER_CLASSNAMES[i])}
          >
            {SLIDER_VALUES[i]}%
          </button>
        </li>
      )
    }
  }

  useEffect(() => {
    setFunc(sliderValue)
  }, [sliderValue, setFunc])

  return (
    <div className={styles.sliderDiv}>
      <section className={styles.sliderHead}>
        <span className={styles.sliderValue}>{sliderValue}</span>
        <span className={styles.sliderPercent}>%</span>
      </section>
      <section className={styles.sliderBody}>
        <div className={styles.sliderBodyFront}>
          <input
            type='range'
            value={sliderValue}
            min='1'
            max='100'
            onChange={handleSliderChange}
            style={{
              background: `linear-gradient(to right, #699092 0%, #699092 ${sliderValue}%, #cccccc ${sliderValue}%, #cccccc 100%)`,
            }}
          />
        </div>
        <div className={styles.sliderBodyBack}>{setBackgroundDiv()}</div>
      </section>
      <SliderBody sliderValue={sliderValue} setSliderValue={setSliderValue} />
    </div>
  )
}

export default Slider
