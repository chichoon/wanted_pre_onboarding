import { React, useState } from 'react';
import Styled from 'styled-components';

const Toggle = ({ firstString, secondString }) => {
  const [clickedSect, setClickedSect] = useState(0);

  const handleOnClick = (e, clickedDivNum) => {
    e.preventDefault();
    setClickedSect(clickedDivNum === 0 ? 1 : 0);
  };

  return (
    <ToggleWrapper>
      <div
        className={clickedSect === 0 ? 'selected' : ''}
        onClick={e => handleOnClick(e, 0)}
      >
        {firstString}
      </div>
      <div
        className={clickedSect === 1 ? 'selected' : ''}
        onClick={e => handleOnClick(e, 1)}
      >
        {secondString}
      </div>
    </ToggleWrapper>
  );
};

const ToggleWrapper = Styled.div`
	display: flex;
	flex-direction: row;
	width: 10rem;
	.selected {
		background-color: gray;
	}

`;

export default Toggle;
