import { React, useState } from 'react';

import Styled from 'styled-components';
import { Dropdown, Input, Slider, Tab, Toggle } from './components';

import './App.css';

function App() {
  const [toggleSelected, setToggleSelected] = useState('');
  const [tabSelected, setTabSelected] = useState('');
  const [sliderValue, setSliderValue] = useState(0);

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
      <ComponentWrapper>
        <Tab
          selectorArr={['감자', '고구마', '카레라이스']}
          setFunc={setTabSelected}
        />
        <div>Selected: {tabSelected}</div>
      </ComponentWrapper>
      <ComponentWrapper>
        <Slider setFunc={setSliderValue} />
        <div>Value: {sliderValue}</div>
      </ComponentWrapper>
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
