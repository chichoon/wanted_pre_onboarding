import './App.css';
import { Dropdown, Input, Slider, Tab, Toggle } from './components';

function App() {
  return (
    <div className="App">
      <Toggle firstString="기본" secondString="상세" />
      <Tab />
      <Slider />
      <Input />
      <Dropdown />
    </div>
  );
}

export default App;
