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
      <SliderBody sliderValue={sliderValue} setSliderValue={setSliderValue} />
    </SliderWrapper>
  );
};

const SliderBody = ({ sliderValue, setSliderValue }) => {
  const handleOnChange = e => {
    setSliderValue(e.target.value);
  };

  const setBackgroundDiv = () => {
    let arr = [];
    for (let i = 0; i <= 4; i++) {
      arr.push(
        <SliderBackground key={i} curValue={sliderValue} indiValue={i} />,
      );
    }
    return arr;
  };

  return (
    <SliderBodyWrapper>
      <div className="front">
        <SliderStyledInput
          type="range"
          value={sliderValue}
          onChange={handleOnChange}
        />
      </div>
      <div className="back">{setBackgroundDiv()}</div>
    </SliderBodyWrapper>
  );
};

const SliderBackground = ({ curValue, indiValue }) => {
  return (
    <SliderBackgroundWrapper curValue={curValue} indiValue={indiValue}>
      <div>
        <div></div>
      </div>
      <div className="pos-indicator"></div>
    </SliderBackgroundWrapper>
  );
};

const SliderBackgroundWrapper = Styled.div`
  width: 3.6rem;
  height: 5rem;

  & > div {
    width: 100%;
    height: 2rem;
    display: flex;
    align-items: center;
  }
  div:nth-child(1) {
    & > div {
      width: 0.5rem;
      height: 0.5rem;
      border-radius: 50%;
      background-color: ${props =>
        props.curValue > props.indiValue * 25 ? 'teal' : '#CCC'};
      margin-left: ${props => {
        switch (props.indiValue) {
          case 0:
            return 0;
          case 1:
            return 0.9;
          case 2:
            return 1.8 - 0.25;
          case 3:
            return 2.7 - 0.5;
          case 4:
            return 3.6 - 0.5;
        }
      }}rem;
    }
  }
`;

const SliderWrapper = Styled.div`
  width: 20rem;
  height: 10rem;

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

const SliderBodyWrapper = Styled.div`
  width: 18rem;
  height: 5rem;
  margin: 0.5rem 0.2rem;
  border: 1px solid black;

  display: flex;
  justify-content: center;

  position: relative;

  & > div {
    width: inherit;
    position: absolute;
    left: 0;
    top: 0;
  }

  .front {
    height: 2rem;

    z-index: 3;

    display: flex;
    align-items: center;
  }

  .back {
    height: 5rem;

    z-index: 2;

    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const SliderStyledInput = Styled.input.attrs({ type: 'range' })`
-webkit-appearance: none;
width: 100%;
height: 1.5rem;
background-color: transparent;
margin: 0;

&:focus {
  outline: none;
}

&::-webkit-slider-runnable-track {
  -webkit-appearance: none;
  height: 0.3rem;
  border-radius: 0.1rem;
  background: linear-gradient(to right, teal 0%, teal ${props =>
    props.value}%, #CCC ${props => props.value}%, #CCC 100%);
}

&::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;

  width: 1rem;
  height: 1rem;
  margin-top: -0.3rem;
  border: 3px solid white;
  border-radius: 50%;

  background: teal;
  cursor: pointer;
  box-shadow: 0 0 0.2rem rgba(0, 0, 0, 0.4);
}

&::-moz-range-track {
  height: 2rem;
  border-radius: 0.1rem;
  background-color: #EEE;
}

&::-moz-range-thumb {
  background-color: yellow;
}

input[type="range"]::-ms-thumb {
  margin: 0;
}

`;

export default Slider;
