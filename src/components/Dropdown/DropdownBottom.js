import React, { useState } from 'react';

import Styled from 'styled-components';

const DropdownBottom = ({ dropdownArr, ifHidden, setIfHidden, setStr }) => {
  const [searchInput, setSearchInput] = useState('');

  const handleOnClick = (e, v) => {
    e.preventDefault();
    setStr(v);
    setIfHidden(true);
  };

  const handleOnChange = e => {
    setSearchInput(e.target.value);
  };

  return (
    <DropdownBottomWrapper ifHidden={ifHidden}>
      <div className="div-input">
        <svg
          id="Glyph"
          version="1.1"
          viewBox="0 0 32 32"
          xmlSpace="preserve"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M27.414,24.586l-5.077-5.077C23.386,17.928,24,16.035,24,14c0-5.514-4.486-10-10-10S4,8.486,4,14  s4.486,10,10,10c2.035,0,3.928-0.614,5.509-1.663l5.077,5.077c0.78,0.781,2.048,0.781,2.828,0  C28.195,26.633,28.195,25.367,27.414,24.586z M7,14c0-3.86,3.14-7,7-7s7,3.14,7,7s-3.14,7-7,7S7,17.86,7,14z"
            id="XMLID_223_"
          />
        </svg>
        <input
          type="text"
          onChange={handleOnChange}
          value={searchInput}
          placeholder="Search Symbol"
        />
      </div>
      <div className="div-list">
        {dropdownArr
          .filter(v => {
            if (searchInput === '') return v;
            else if (v.toLowerCase().startsWith(searchInput)) return v;
          })
          .map((v, i) => (
            <div key={i} onClick={e => handleOnClick(e, v)}>
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

	.div-input {
		display: flex;
		flex-direction: row;

		border-bottom: 1px solid #AAA;

		svg {
			width: 1rem;
			padding: 0.5rem;
			position: relative;
		}

		input {
			width: 9rem;
			padding: 0.6rem 1rem 0.6rem 0;

			border-top-left-radius: 0.3rem;
			border-top-right-radius: 0.3rem;
			border: none;

			font-size: 0.9rem;
			color: #333;

			&:focus {
				outline: none;
			}
		}
	}

	.div-list {
		height: 10rem;
		overflow-y: scroll;

		& > div {
			width: 9rem;
			padding: 0.6rem 1rem 0.6rem 2rem;
			background-color: white;
			overflow: hidden;

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
