import React, { useState } from 'react';

import Styled from 'styled-components';

const Tab = ({ selectorArr }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleOnClick = (e, index) => {
    e.preventDefault();
    setSelectedIndex(index);
  };

  return (
    <TabWrapper>
      <div className="selector-parent" selectedIndex={selectedIndex}>
        <div className="front">
          {selectorArr.map((v, i) => (
            <SelectorDiv
              className={selectedIndex === i ? 'selected' : ''}
              key={i}
              onClick={e => handleOnClick(e, i)}
              length={selectorArr.length}
            >
              {selectorArr[i]}
            </SelectorDiv>
          ))}
        </div>
        <div className="back">
          <div></div>
        </div>
      </div>
    </TabWrapper>
  );
};

const TabWrapper = Styled.div`
  width: 30rem;
  height: 4rem;

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
      height: 4rem;

      position: absolute;
      left: 0px;
      top: 0px;
    }

    .front {
      display: flex;
      flex-direction: row;
      z-index: 2;
    }

    .back {
      z-index: 1;
      background-color: lightgray;
    }
  }
`;

const SelectorDiv = Styled.div`
  width: calc(100% / ${props => props.length});

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

export default Tab;
