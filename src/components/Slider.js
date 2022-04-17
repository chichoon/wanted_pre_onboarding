import { React, useEffect, useState } from 'react';

const Slider = ({ setFunc }) => {
  const [sliderValue, setSliderValue] = useState(0);

  useEffect(() => {
    setFunc(sliderValue);
  }, [sliderValue]);

  return <div>slider</div>;
};

export default Slider;
