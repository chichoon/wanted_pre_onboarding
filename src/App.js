import { React, useState } from 'react';

import Styled from 'styled-components';
import { Dropdown, Input, Slider, Tab, Toggle } from './components';

import './App.css';

function App() {
  const [toggleSelected, setToggleSelected] = useState('');

  return (
    <div className="App">
      <ComponentWrapper>
        <Toggle
          firstString="기본"
          secondString="상세"
          setFunc={setToggleSelected}
        />
        <div>Selected: {toggleSelected}</div>
      </ComponentWrapper>
      <Tab />
      <Slider />
      <Input />
      <Dropdown />
    </div>
  );
}

const ComponentWrapper = Styled.div`
  margin: 0.5rem;
  margin-bottom: 1rem;

  & > div {
    margin: 0.5rem;
  }
`;

export default App;
