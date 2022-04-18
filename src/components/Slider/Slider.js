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
      <SliderBody sliderValue={sliderValue} setSliderValue={setSliderValue} />
    </SliderWrapper>
  );
};

const SliderBody = ({ sliderValue, setSliderValue }) => {
  const handleOnChange = e => {
    setSliderValue(e.target.value);
  };

  const handleOnClick = (e, buttonValue) => {
    e.preventDefault();
    setSliderValue(buttonValue);
  };

  const setBackgroundDiv = () => {
    let arr = [];
    for (let i = 0; i <= 4; i++) {
      arr.push(
        <SliderBackgroundWrapper key={i} curValue={sliderValue} indiValue={i}>
          <div className="pos-dot">
            <div></div>
          </div>
          <div
            className="pos-indicator"
            onClick={e => handleOnClick(e, i * 25)}
          >
            <div>{i * 25}%</div>
          </div>
        </SliderBackgroundWrapper>,
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

const SliderBodyWrapper = Styled.div`
  width: 18rem;
  height: 4rem;
  margin: 0.5rem 0.2rem;

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
    height: 4rem;

    z-index: 2;

    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const SliderBackgroundWrapper = Styled.div`
  width: 3.6rem;
  height: 4rem;

  & > div {
    width: 100%;
    height: 2rem;
    display: flex;
    align-items: center;
  }

  .pos-dot {
    & > div {
      width: 0.5rem;
      height: 0.5rem;
      border-radius: 50%;
      background-color: ${props =>
        props.curValue >= props.indiValue * 25 ? 'teal' : '#CCC'};

      margin-left: ${props => (0.9 - 0.125) * props.indiValue}rem;
    }
  }

  .pos-indicator {
    & > div {
      width: 2rem;
      height: 1rem;
      border-radius: 0.3rem;
      background-color: #AAA;
      color: white;

      font-size: 0.5rem;

      display: flex;
      align-items: center;
      justify-content: center;

      margin-left: ${props => (0.9 - 0.5) * props.indiValue}rem;
      ${props =>
        props.indiValue === 1
          ? `margin-left: ${0.9 - 0.75}rem;`
          : props.indiValue === 3
          ? `margin-left: ${2.7 - 1.25}rem;`
          : ''}
      cursor: pointer;
      transition: background-color 0.1s;

      &:hover {
        background-color: teal;
      }
    }
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
