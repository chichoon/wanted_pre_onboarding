import { React, useEffect, useState } from 'react';

import Styled from 'styled-components';

import SliderBody from './SliderBody';

const Slider = ({ setFunc }) => {
  const [sliderValue, setSliderValue] = useState(0);

  useEffect(() => {
    setFunc(sliderValue);
  }, [sliderValue]);

  return (
    <SliderWrapper>
      <div className="slider-head">
        <div>{sliderValue}</div>
        <div>%</div>
      </div>
      <SliderBody sliderValue={sliderValue} setSliderValue={setSliderValue} />
    </SliderWrapper>
  );
};

const SliderWrapper = Styled.div`
  width: 20rem;

  padding: 0.3rem;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .slider-head {
    width: 18rem;
    height: 3rem;
    background-color: #EEE;

    border: 1px solid #AAA;
    border-radius: 0.3rem;

    display: flex;
    flex-direction: row;
    justify-content: right;
    align-items: center;

    div:nth-child(1) {
      width: 12rem;

      padding: 0.5rem 0.6rem;
      text-align: right;
      font-weight: 700;
    }

    div:nth-child(2) {
      margin: 0 0.5rem;
      color: rgba(0, 0, 0, 0.5);
    }
  }
`;

export default Slider;
