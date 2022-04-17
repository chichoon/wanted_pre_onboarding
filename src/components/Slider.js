import { React, useEffect, useState } from 'react';

import Styled from 'styled-components';

const Slider = ({ setFunc }) => {
  const [sliderValue, setSliderValue] = useState(0);
  //const [dragStart, setDragStart] = useState(0);
  //const [dragEnd, setDragEnd] = useState(0);

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
  const handleOnChange = e => {
    console.log(e.target.value);
    setSliderFunc(1);
  };

  return (
    <SliderBodyWrapper>
      <div className="front">
        <SliderStyledInput type="range" onChange={handleOnChange} />
      </div>
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
  height: 10rem;

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
  width: 17.2rem;
  height: 4.2rem;
  padding: 0.4rem;
  margin-top: 0.5rem;
  border: 1px solid black;

  display: flex;
  justify-content: center;

  position: relative;

  .front {
    width: inherit;
    height: 2rem;
    padding: 0.1rem;
    border: 1px solid red;

    display: flex;
    align-items: center;
`;

const SliderStyledInput = Styled.input.attrs({ type: 'range' })`
-webkit-appearance: none;
width: 100%;
height: 1rem;
background-color: transparent;

&:focus {
  outline: none;
}

&::-webkit-slider-runnable-track {
  -webkit-appearance: none;
  height: 0.3rem;
  border-radius: 0.1rem;
  background-color: #EEE;
}

&::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 1rem;
  height: 1rem;
  margin: 0px;
  border: 3px solid white;
  border-radius: 50%;
  background: teal;
}

&::-moz-range-track {
  height: 2rem;
  border-radius: 0.1rem;
  background-color: #EEE;
}

&::-moz-range-thumb {
  background-color: yellow;
}

`;

export default Slider;
