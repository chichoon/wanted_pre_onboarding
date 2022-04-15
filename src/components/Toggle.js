import { React, useState } from 'react';
import Styled from 'styled-components';

const Toggle = ({ firstString, secondString }) => {
  const [clickedSect, setClickedSect] = useState(0);

  const handleOnClick = (e, clickedDivNum) => {
    e.preventDefault();
    setClickedSect(clickedDivNum === 0 ? 0 : 1);
  };

  return (
    <ToggleWrapper>
      <div
        className={'first-element' + (clickedSect === 0 ? ' selected' : '')}
        onClick={e => handleOnClick(e, 0)}
      >
        {firstString}
      </div>
      <div
        className={'second-element' + (clickedSect === 1 ? ' selected' : '')}
        onClick={e => handleOnClick(e, 1)}
      >
        {secondString}
      </div>
    </ToggleWrapper>
  );
};

const ToggleWrapper = Styled.div`
  width: 20rem;
  height: 3rem;
  border-radius: 2rem;

  padding: 0.2rem;

  display: flex;
  flex-direction: row;
  justify-content: space-between;

  background: lightgray;

  div {
    width: 50%;
    border-radius: 2rem;

	display: flex;
    align-items: center;
	justify-content: center;

  }
  .selected {
    background-color: white;
	font-weight: 700;
	transition: max-width 0.3s ease-out;
  }
  div:not(.selected):hover {
    cursor: pointer;
  }

`;

export default Toggle;
