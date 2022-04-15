import React, { useEffect, useState } from 'react';

import Styled from 'styled-components';

const Tab = ({ selectorArr, setFunc }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleOnClick = (e, index) => {
    e.preventDefault();
    setSelectedIndex(index);
  };

  useEffect(() => {
    setFunc([selectorArr[selectedIndex]]);
  }, [selectedIndex]);

  return (
    <TabWrapper>
      <div className="selector-parent">
        <div className="front">
          {selectorArr.map((v, i) => (
            <SelectorFrontDiv
              className={selectedIndex === i ? 'selected' : ''}
              key={i}
              onClick={e => handleOnClick(e, i)}
              length={selectorArr.length}
            >
              {selectorArr[i]}
            </SelectorFrontDiv>
          ))}
        </div>
        <div className="back">
          <SelectorBackDiv length={selectorArr.length} index={selectedIndex} />
        </div>
      </div>
    </TabWrapper>
  );
};

const TabWrapper = Styled.div`
  width: 30rem;
  height: 3rem;

  padding: 0.3rem;
  background-color: white;

  display: flex;
  justify-content: center;

  .selector-parent {
    width: 25rem;

    position: relative;
    z-index: 3;

    & > div {
      width: 25rem;

      position: absolute;
      left: 0px;
      top: 0px;
    }

    .front {
      height: 2.7rem;

      z-index: 2;

      display: flex;
      flex-direction: row;
      justify-content: center;

      background-color: white;
    }

    .back {
      height: 3rem;
      z-index: 1;
      background-color: lightgray;
    }
  }
`;

const SelectorFrontDiv = Styled.div`
  width: calc(24rem / ${props => props.length});

  margin-bottom: 0.3rem;
  background-color: white;

  display: flex;
  justify-content: center;
  align-items: center;

  transition: font-weight 0.2s;
  &.selected {
    font-weight: 700;
  }
`;

const SelectorBackDiv = Styled.div`
width: calc(24rem / ${props => props.length});
height: 3rem;

margin-left: calc(0.5rem + 24rem * ${props => props.index / props.length});

background-color: teal;
transition: margin-left 0.2s;
`;

export default Tab;
