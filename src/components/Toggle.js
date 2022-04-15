import { React, useEffect, useState } from 'react';
import Styled from 'styled-components';

const Toggle = ({ firstString, secondString, setFunc }) => {
  const [ifToggle, setIfToggle] = useState(false);

  const handleOnClick = e => {
    e.preventDefault();
    setIfToggle(ifToggle ? false : true);
  };

  useEffect(() => {
    setFunc(ifToggle ? secondString : firstString);
  }, [ifToggle]);

  return (
    <ToggleWrapper toggle={ifToggle}>
      <div className="selector-parent" onClick={handleOnClick}>
        <div className="front">
          <SelectorWrapper>
            <div className={!ifToggle ? ' selected' : ''}>{firstString}</div>
            <div className={ifToggle ? ' selected' : ''}>{secondString}</div>
          </SelectorWrapper>
        </div>
        <div className="back">
          <div></div>
        </div>
      </div>
    </ToggleWrapper>
  );
};

const ToggleWrapper = Styled.div`
  width: 20rem;
  height: 3rem;

  padding: 0.2rem;
  border-radius: 2rem;

  background: lightgray;
  display: flex;

  .selector-parent {
	position: relative;
    z-index: 3;

    & > div {
      width: 20rem;
      height: 3rem;

      position: absolute;
      left: 0px;
	  top: 0px;
	}

    .back {
      z-index: 1;
      & > div {
        width: 50%;
        height: 3rem;

        border-radius: 2rem;

        background-color: white;
		margin-left: ${props => (props.toggle ? '10rem' : '0')};
		transition: margin-left 0.2s;
	  }
    }

    .front {
      z-index: 2;
    }
  }

  &:hover {
	  cursor: pointer;
  }
`;

const SelectorWrapper = Styled.div`
  width: 100%;
  height: inherit;

  display: flex;
  flex-direction: row;

  div {
  width: 50%;
  height: inherit;

  display: flex;
  justify-content: center;
  align-items: center;

  &.selected {
    font-weight: 700;
  }
`;

export default Toggle;
