import { React, useState } from 'react';
import Styled from 'styled-components';

const Toggle = ({ firstString, secondString }) => {
  const [ifToggle, setIfToggle] = useState(false);

  const handleOnClick = e => {
    e.preventDefault();
    setIfToggle(ifToggle ? false : true);
  };

  return (
    <ToggleWrapper toggle={ifToggle}>
      <div className="selector-parent" onClick={handleOnClick}>
        <div className="selector front">
          <SelectorWrapper>
            <div className={!ifToggle ? ' selected' : ''}>{firstString}</div>
            <div className={ifToggle ? ' selected' : ''}>{secondString}</div>
          </SelectorWrapper>
        </div>
        <div className="selector back">
          <div className="toggle-white"></div>
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

    .selector {
      width: 20rem;
      height: 3rem;

      position: absolute;
      left: 0px;
	  top: 0px;
	}

    .back {
      z-index: 1;
      .toggle-white {
        width: 50%;
        height: 3rem;

        border-radius: 2rem;

        background-color: white;
		margin-left: ${props => (props.toggle ? '10rem' : '0')}
	  }
    }

    .front {
      z-index: 2;
    }
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

  &:not(.selected):hover {
    cursor: pointer;
  }
`;

export default Toggle;
