import React, { useState } from 'react';

import Styled from 'styled-components';

const DropdownBottom = ({ dropdownArr, ifHidden, setIfHidden, setIndex }) => {
  const [searchInput, setSearchInput] = useState('');

  const handleOnClick = (e, i) => {
    e.preventDefault();
    setIndex(i);
    setIfHidden(true);
  };

  const handleOnChange = e => {
    setSearchInput(e.target.value);
  };

  return (
    <DropdownBottomWrapper ifHidden={ifHidden}>
      <input
        type="text"
        onChange={handleOnChange}
        value={searchInput}
        placeholder="Search Symbol"
      />
      <div>
        {dropdownArr.map((v, i) => (
          <div key={i} onClick={e => handleOnClick(e, i)}>
            {v}
          </div>
        ))}
      </div>
    </DropdownBottomWrapper>
  );
};

const DropdownBottomWrapper = Styled.div`
	${props => (props.ifHidden ? 'display: none;' : '')}
	width: 12rem;
	height: fit-content;
	margin-top: 0.5rem;
	background-color: white;
	overflow: hidden;

    border: 1px solid #AAA;
    border-radius: 0.3rem;

	box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.2);

	input {
		width: 9rem;
		padding: 0.6rem 1rem 0.6rem 2rem;

		border-top-left-radius: 0.3rem;
		border-top-right-radius: 0.3rem;
		border: none;
		border-bottom: 1px solid #AAA;

		font-size: 0.9rem;
		color: #333;
	}

	& > div {
		height: 10rem;
		overflow-y: scroll;

		& > div {
			width: 10rem;
			padding: 0.6rem 1rem 0.6rem 2rem;
			background-color: white;

			font-size: 0.8rem;
			text-align: left;
			color: #666;

			transition: background-color 0.2s;

			&:hover {
				cursor: pointer;
				background-color: #EEE;
			}
		}
	}

`;

export default DropdownBottom;
