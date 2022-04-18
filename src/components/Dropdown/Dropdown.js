import React, { useState, useEffect } from 'react';

import Styled from 'styled-components';
import DropdownBottom from './DropdownBottom';

const Dropdown = ({ dropdownArr, setFunc }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [ifHidden, setIfHidden] = useState(true);

  console.log(dropdownArr);

  const handleOnClick = e => {
    e.preventDefault();
    setIfHidden(ifHidden ? false : true);
  };

  useEffect(() => {
    setFunc(dropdownArr[selectedIndex]);
  }, [selectedIndex]);

  return (
    <DropdownWrapper>
      <div className="dropdown-top" onClick={handleOnClick}>
        <div className="dropdown-top-header">{dropdownArr[selectedIndex]}</div>
        <div className="dropdown-top-arrow">
          <svg
            height="32"
            id="triangle-down"
            viewBox="0 0 32 32"
            width="32"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M4 8 H28 L16 26 z" />
          </svg>
        </div>
      </div>
      <DropdownBottom
        dropdownArr={dropdownArr}
        ifHidden={ifHidden}
        setIfHidden={setIfHidden}
        setIndex={setSelectedIndex}
      />
    </DropdownWrapper>
  );
};

const DropdownWrapper = Styled.div`
  width: 20rem;
  height: fit-content;

  display: flex;
  flex-direction : column;
  align-items: center;

  .dropdown-top {
    width: 12rem;
    height: 2rem;
    padding: 0.5rem 0.3rem;
    background-color: #FAFAFA;

    border: 1px solid #AAA;
    border-radius: 0.3rem;

    display: flex;
    flex-direction : row;
    align-items: center;
    justify-content: space-between;

    .dropdown-top-header {
      width: 8rem;
      padding: 0 0.2rem;

      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }

    .dropdown-top-arrow {
      width: 2rem;
      height: inherit;
      svg {
        width: 1rem;
      }
    }

    &:hover {
      cursor: pointer;
    }
  }
`;

export default Dropdown;
