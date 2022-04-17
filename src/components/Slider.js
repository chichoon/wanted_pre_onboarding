import { React, useEffect, useState } from 'react';

import Styled from 'styled-components';

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
      <SliderBody setSliderFunc={setSliderValue} />
    </SliderWrapper>
  );
};

const SliderBody = ({ setSliderFunc }) => {
  /*
  const handleOnDrag = e => {
    console.log(e);
    setSliderValue(sliderValue + 1);
  };
*/
  setSliderFunc(0);
  return (
    <SliderBodyWrapper>
      <div className="front"></div>
      <div className="back">
        <div className="background">
          <div></div>
          <div className="stick"></div>
        </div>
      </div>
    </SliderBodyWrapper>
  );
};

const SliderWrapper = Styled.div`
  width: 20rem;
  height: 8rem;

  padding: 0.3rem;
  border: 1px solid blue;

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

const SliderBodyWrapper = Styled.div`
  width: 18rem;
  height: 3rem;
  border: 1px solid black;
`;

export default Slider;
