import React, { useState } from 'react';

import Styled from 'styled-components';

const Tab = ({ selectorArr }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleOnClick = (e, index) => {
    e.preventDefault();
    setSelectedIndex(index);
  };

  return (
    <TabWrapper>
      <div className="selector-parent" selectedIndex={selectedIndex}>
        <div className="front">
          {selectorArr.map((v, i) => (
            <div
              className={selectedIndex === i ? 'selected' : ''}
              key={i}
              onClick={e => handleOnClick(e, i)}
            >
              {selectorArr[i]}
            </div>
          ))}
        </div>
        <div className="back"></div>
      </div>
    </TabWrapper>
  );
};

export default Tab;
