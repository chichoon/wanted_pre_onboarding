import React from 'react';

import Styled from 'styled-components';

const DropdownBottom = ({ dropdownArr, ifHidden, setIndex }) => {
  const handleOnClick = (e, i) => {
    e.preventDefault();
    setIndex(i);
  };

  return (
    <DropdownBottomWrapper ifHidden={ifHidden}>
      {dropdownArr.map((v, i) => (
        <li key={i} onClick={e => handleOnClick(e, i)}>
          {v}
        </li>
      ))}
    </DropdownBottomWrapper>
  );
};

const DropdownBottomWrapper = Styled.div`
	${props => (!props.ifHidden ? 'display: none' : '')}
`;

export default DropdownBottom;
