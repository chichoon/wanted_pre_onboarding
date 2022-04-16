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
    <TabWrapper length={selectorArr.length} index={selectedIndex}>
      <div>
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
      <div>
        <div></div>
      </div>
    </TabWrapper>
  );
};

const TabWrapper = Styled.div`
  width: 30rem;
  height: 3rem;

  padding: 0.3rem;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  & > div {
    width: 25rem;
  }

  & > div:nth-child(1){
    height: 2.7rem;

    display: flex;
    flex-direction: row;
    justify-content: center;
  }

  & > div:nth-child(2) {
    height: 0.3rem;

    background-color: lightgray;

    div {
      width: calc(24rem / ${props => props.length});
      height: 0.3rem;

      margin-left: calc(0.5rem + 24rem * ${props =>
        props.index / props.length});

      background-color: teal;
      transition: margin-left 0.2s;
    }
  }

`;

const SelectorDiv = Styled.div`
  width: calc(24rem / ${props => props.length});

  margin-bottom: 0.3rem;
  background-color: white;
  color: rgba(0, 0, 0, 0.3);

  display: flex;
  justify-content: center;
  align-items: center;

  font-weight: 700;
  transition: color 0.2s;

  &.selected {
    color: rgba(0, 0, 0, 1);
  }

  &:hover {
    cursor: pointer;
    &:not(.selected) {
    color: rgba(0, 0, 0, 0.5);
    }
  }
`;

export default Tab;
