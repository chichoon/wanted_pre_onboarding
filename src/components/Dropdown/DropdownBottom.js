import React, { useState } from 'react';

import Styled from 'styled-components';

const DropdownBottom = ({ dropdownArr, ifHidden, setIndex }) => {
  const [searchInput, setSearchInput] = useState('');

  const handleOnClick = (e, i) => {
    e.preventDefault();
    setIndex(i);
  };

  const handleOnChange = e => {
    setSearchInput(e.target.value);
  };

  return (
    <DropdownBottomWrapper ifHidden={ifHidden}>
      <input type="text" onChange={handleOnChange} value={searchInput} />
      {dropdownArr.map((v, i) => (
        <div key={i} onClick={e => handleOnClick(e, i)}>
          {v}
        </div>
      ))}
    </DropdownBottomWrapper>
  );
};

const DropdownBottomWrapper = Styled.div`
	${props => (!props.ifHidden ? 'display: none;' : '')}
	width: 12rem;
	height: 10rem;
	margin-top: 0.5rem;

    border: 1px solid #AAA;
    border-radius: 0.3rem;

	overflow-y: scroll;

	input {
		width: 9rem;
		padding: 0.6rem 1rem 0.6rem 2rem;

		border-top-left-radius: 0.3rem;
		border-top-right-radius: 0.3rem;
		border: none;
		border-bottom: 1px solid #AAA;
	}

	div {
		width: 10rem;
		padding: 0.6rem 1rem;
		background-color: white;

		transition: background-color 0.2s;
		&:hover {
			cursor: pointer;
			background-color: #EEE;
		}
	}
`;

export default DropdownBottom;
