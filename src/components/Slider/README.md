# Slider

## 요구 사항

- 슬라이더를 움직이면 상단 박스 내에 표시되는 값이 자동으로 바뀌어야 합니다.

- (부가 요소) 하단에 값을 바로 변경하는 버튼을 추가합니다.

- (부가 요소) 하단 버튼과 슬라이더의 각 지점마다 표시되는 점에 적절한 스타일이 적용되어야 합니다.

## 결과물

## 핵심 요소

```jsx
const [sliderValue, setSliderValue] = useState(0);
```

- 슬라이더의 값은 State를 사용하여 저장하였습니다 (`sliderValue`)

  - 기본값은 슬라이더가 가장 왼쪽을 가리키고 있는 상태인 0으로 지정합니다.

```jsx
<div className="slider-head">
  <div>{sliderValue}</div>
  <div>%</div>
</div>
```

- 우선 값이 출력되는 박스를 만들어 줍니다.

  - `div` 안에 또 다른 두 개의 `div`를 배치한 이유는 값 (0 ~ 100) 의 스타일과 % 문자의 스타일이 달라야 하며, 두 `div`가 오른쪽 정렬이 된 상태로 간격을 두고 붙어있어야 했기 때문입니다.

  - 두 개의 자식 `div` 중 상단 `div`에서 출력할 슬라이더의 값은 앞서 선언했던 `sliderValue`에서 가져옵니다.

  - 하단 `div`는 % 만을 출력합니다.

```css
  .slider-head {
    display: flex;
    flex-direction: row;
    justify-content: right;
    align-items: center;
	...
```

- 두 `div`를 감싸는 `slider-head` 클래스의 `div`는 `display: flex`와 `justify-content: right` 속성을 이용하여 두 개의 하위 `div`를 오른쪽 정렬 시켜주었습니다.

- 두 `div`는 서로 다른 투명도와 굵기를 갖도록 스타일을 적용합니다.

- 이때 `div`에 굳이 className을 명시하지 않고 `nth-child` 선택자를 통해 서로 다른 스타일을 적용하였습니다.

```jsx
<SliderStyledInput type="range" value={sliderValue} onChange={handleOnChange} />
```

- `input` 요소에 스타일을 적용하기 위해 Styled 컴포넌트인 `SliderStyledInput` 컴포넌트를 생성합니다.

  - 슬라이더를 사용하는 `input` 요소는 `type`가 `range`입니다.

- 슬라이더가 표현해야 할 값을 이전에 설정한 상태값인 `sliderValue`로 지정해 줍니다.

- 슬라이더에 변화가 있을 때마다 `handleOnChange` 함수를 통해 값을 바꾸어 주었습니다.

```jsx
const handleOnChange = e => {
  setSliderValue(e.target.value);
};
```

- `handleOnChange` 핸들러의 인자인 e는 이벤트에 관련된 정보를 담는 변수로, `e.target.value` 내에 `input` 요소의 `value`가 들어갑니다.

  - 이 값이 `sliderValue`로 설정되어야 하는 값이므로, `setSliderValue`를 통해 상태값을 재설정합니다.

  - form을 사용한다면 submit마다 값을 받아올 수 있지만, 지금은 슬라이더의 값을 실시간으로 (변경될 때마다) 받아와야 하므로 이벤트 핸들러를 이용합니다.

  - 상태값이 set될 때마다 상단 박스에 출력되는 값 또한 실시간으로 변경됩니다.

## 부가 요소

### 어려웠던 점

- 앞서 구현한 2개의 컴포넌트보다 확연히 어려운 난이도였습니다.

  - 우선 슬라이더의 0%, 25%, 50%, 75%, 100% 지점마다 위치한 눈금 점을 어떻게 표현해야 할 지 난감했습니다.

  - 또한, 아래 버튼의 위치를 조정할 때도 미세한 오차 때문에 원하는 위치에 버튼이 오지 않고 왼쪽 또는 오른쪽으로 치우치는 현상이 있었습니다.

  - range input의 스타일을 변경할 때, 스타일을 전부 리셋하고 나니 슬라이더 왼쪽의 색상을 어떻게 지정해야 할 지가 매우 어려웠습니다.

  - range input 요소의 경우 웹킷 계열의 브라우저 (크롬, 사파리), 모질라, 엣지 각각 스타일을 따로 적용해 주어야 하기 때문에 번거롭습니다.

  - 구현을 하다 보니 Styled 컴포넌트의 스타일 시트가 길어지면서 가독성을 해치는 것 같아 결국 파일을 2개로 분리하게 되었습니다.

### Slider

```jsx
<SliderWrapper>
  <div className="slider-head">
    <div>{sliderValue}</div>
    <div>%</div>
  </div>
  <SliderBody sliderValue={sliderValue} setSliderValue={setSliderValue} />
</SliderWrapper>
```

- 첫 번째 파일은 Slider.js입니다.

- 슬라이더 컴포넌트 그 자체를 담으며, 외부에서 이 컴포넌트를 불러와 사용합니다.

- 두 개의 파트로 나누어져 있습니다.

  - 값을 출력하는 상단 박스인 `slider-head`

  - 슬라이더 본체, 눈금 점, 버튼이 들어가는 `SliderBody` Styled 컴포넌트

- `slider-head`의 구현 방식은 핵심 요소에서 다루었던 내용과 같습니다.

- `SliderBody` 컴포넌트의 구현과 스타일링이 매우 길어지므로, 별개의 파일인 SliderBody.js로 분리하였습니다.

### SliderBody

```jsx
<SliderBodyWrapper>
  <div className="front">
    <SliderStyledInput
      type="range"
      value={sliderValue}
      onChange={handleOnChange}
    />
  </div>
  <div className="back">{setBackgroundDiv()}</div>
</SliderBodyWrapper>
```

- 토글을 구현했을 때, 항목을 나타내는 글자가 들어가는 레이어와 토글 버튼 배경이 들어가는 레이어를 `position` 속성과 `z-index` 속성을 통해 분리했듯이, 슬라이더를 구현하기 위해서 레이어를 2개로 분리하였습니다.

- 앞쪽 레이어 (`front`) 는 슬라이더 본체를 가지고 있습니다.

  - `z-index`는 3으로, 가장 앞에 보여집니다.

  - 슬라이더 본체는 스타일링을 위해 Styled input 컴포넌트인 `SliderStyledInput` 으로 분리하였습니다.

  - 슬라이더 본체의 동작 방식은 핵심 요소에서 다루었던 방식과 같습니다.

- 뒤쪽 레이어 (`back`) 은 슬라이더 컴포넌트에서의 부가적인 요소들을 포함합니다.

  - 부가적인 요소는, 슬라이더에 겹쳐 표시되는 눈금점과 버튼을 의미합니다.

  - 눈금점과 버튼을 슬라이더의 뒤에 배치한 뒤, `sliderValue` 상태값을 이용하여 스타일을 조정하거나 상태값 자체를 변경할 수 있도록 하였습니다.

```css
&::-webkit-slider-runnable-track {
  -webkit-appearance: none;
  height: 0.3rem;
  border-radius: 0.1rem;
  background: linear-gradient(
    to right,
    teal 0%,
    teal ${props => props.value}%,
    #ccc ${props => props.value}%,
    #ccc 100%
  );
}

&::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;

  width: 1rem;
  height: 1rem;
  margin-top: -0.3rem;
  border: 3px solid white;
  border-radius: 50%;

  background: teal;
  cursor: pointer;
  box-shadow: 0 0 0.2rem rgba(0, 0, 0, 0.4);
}
```

- 우선, 슬라이더 (range input) 에 스타일을 적용합니다.

  - `::webkit-slider-runnable-track`은 웹킷 기반의 브라우저에서 슬라이더의 막대 부분의 스타일링을 담당합니다.

  - `::webkit-slider-thumb`는 웹킷 기반의 브라우저에서 슬라이더의 버튼 부분의 스타일링을 담당합니다.

  - 파이어폭스에 스타일을 적용하기 위해선 각각의 선택자를 `::-moz-range-track` 와 `::-moz-range-thumb` 로 지정합니다.

  - 웹킷 기반의 브라우저에서 슬라이더에 적용된 모든 스타일을 초기화하기 위해 `-webkit-appearance: none`을 적용합니다.

- 슬라이더 버튼을 스타일링합니다.

  - `-webkit-appearance: none` 과 `appearance: none` 을 통해 기본값 스타일을 전부 리셋하였습니다.

  - 슬라이더 버튼의 생김새는 평범하게 원형의 버튼에 `border`를 이용하여 구현 예시와 비슷하게 하얀 테두리를 지정하고, `box-shadow`를 통해 뒤에 은은한 그림자를 적용하였습니다.

  - 또한 슬라이더 버튼에 마우스를 올리면 커서를 포인터로 변경합니다.

  - 슬라이더의 스타일을 리셋할 경우, 슬라이더의 버튼이 막대보다 아래에 배치되는 현상이 있습니다. `margin-top: -[막대 높이]` 속성을 통해 버튼의 위치를 위쪽으로 재조정해줍니다.

- 슬라이더 막대를 스타일링합니다.

  - 높이를 적절히 얇게 설정하고, 테두리를 없앴으며, 모서리를 약간 둥글게 처리하여 자연스럽게 보이도록 하였습니다.

- 버튼을 기준으로 좌측은 teal색, 우측은 옅은 회색이 되도록 적용해야 했는데, 이 부분이 상당히 어려웠습니다.

  - `input` 기반의 컴포넌트이므로 다른 `div`를 추가하는 등의 방식을 사용할 수가 없기 때문에, 배경색에 `linear-gradient`을 적용하였습니다.

  - `input`의 값은 `props.value`에 저장되고, 버튼의 위치는 막대의 너비를 100%라고 했을 때 `props.value`%만큼 오른쪽에 위치하므로 이것을 `linear-gradient`의 기준으로 삼습니다.

  - 색상의 경계는 슬라이더 버튼에 의해 가려지기 때문에 자연스러운 그라데이션 (색상 변화) 는 필요치 않으므로, 다음과 같이 적용합니다.

  ```css
  background: linear-gradient(
    to right,
    teal 0%,
    teal ${props => props.value}%,
    #ccc ${props => props.value}%,
    #ccc 100%
  );
  ```

  - 0% 지점부터 `props.value`% 지점까지 teal색으로 칠하고, `props.value`% 지점부터 100% 지점까지 `#CCC` = 회색 (원래 배경색) 으로 칠해주었습니다.


<img width="86" alt="스크린샷 2022-04-18 오후 6 53 54" src="https://user-images.githubusercontent.com/37893979/163791689-9aaa689e-f2ab-446f-9426-475a6324f423.png">

  - 이렇게 스타일링하면 두 색의 경계는 버튼에 의해 가려지고, props.value가 변화할 때마다 (버튼을 움직일 때마다) 버튼 기준 양 쪽의 색이 다르게 표현됩니다.

### SliderBackgroundWrapper

```jsx
const setBackgroundDiv = () => {
  let arr = [];
  for (let i = 0; i <= 4; i++) {
    arr.push(
      <SliderBackgroundWrapper key={i} curValue={sliderValue} indiValue={i}>
        <div className="pos-dot">
          <div></div>
        </div>
        <div className="pos-indicator" onClick={e => handleOnClick(e, i * 25)}>
          <div>{i * 25}%</div>
        </div>
      </SliderBackgroundWrapper>,
    );
  }
  return arr;
};
```

- 슬라이더의 디자인이 완료되었으므로, 뒤에 보이는 요소들 (눈금 점, 버튼) 을 구현할 차례입니다.

- 총 5개 (0%, 25%, 50%, 75%, 100%) 의 눈금점 (`pos-dot`) + 버튼 (`pos-indicator`) 이 표시되며, 두 요소는 같은 지점에 표시되어야 하므로 `SliderBackgroundWrapper` Styled `div` 컴포넌트로 묶어줍니다.

- 5개의 `div`는 %값만 제외하고 모두 같은 요소를 가지므로 for문을 통해 배열에 push하고, 배열을 반환하여 한번에 렌더링하도록 구현하였습니다.

- `curValue`는 현재 슬라이더의 값을 나타내며, 이전에 선언한 상태값인 `sliderValue`를 사용합니다.

- `indiValue`는 현재 요소가 가리키는 값을 나타내며, 0%, 25%, 50%, 75%, 100% 중 한 개입니다.

  - `indiValue`는 for문을 통해 적용합니다. `i`는 0부터 4까지 증가하므로, 실제 사용하는 값은 {`i` \* 25}가 됩니다.

  - `i`를 굳이 0부터 4까지로 설정한 이유는 추후 스타일을 적용할 때 `i`를 이용하여 서로 다른 margin을 적용해야 하기 때문입니다.

- `pos-dot`은 슬라이더 뒤에 배치되는 눈금 점을 담은 `div`입니다

  - 실질적인 눈금 점은 하위 `div`가 담당하는데, 이는 `pos-dot` 이라는 상위 `div` 박스의 폭을 넉넉하게 설정한 뒤 하위 `div`의 `margin-left`를 조정함으로써 배치가 무너지지 않고 박스 안에서 조절되도록 하기 위함입니다.

- `pos-indicator`은 슬라이더 하단에 배치되는 버튼을 담은 `div`입니다

  - 마찬가지로, 실질적인 버튼은 하위 `div`가 담당하며, `pos-indicator`은 박스 역할만을 합니다.

  - 클릭하면 슬라이더의 값을 바꾸어야 하므로, `handleOnClick` 핸들러를 호출하고, 인자로 `i * 25`를 넣어줍니다. `i * 25`는 `i`가 0, 1, 2, 3, 4 중 하나이므로 0, 25, 50, 75, 100이 될 것입니다.

  - 인자로 받아온 값으로 상태값을 교체해 줄 것입니다. 슬라이더도 상태값을 이용하므로, 슬라이더 버튼의 위치도 자동으로 변경됩니다.

- `pos-dot`과 `pos-indicator`은 위아래로 배치됩니다.

  - 따라서 총 5개의 `pos-dot`과 5개의 `pos-indicator`가 배치됩니다.

  - 위아래로 배치한 이유는 눈금점과 버튼이 정확히 슬라이더를 4등분하는 경계 지점에 함께 배치되어야 하기 때문입니다.

<img width="417" alt="스크린샷 2022-04-18 오후 6 30 15" src="https://user-images.githubusercontent.com/37893979/163791565-423a0e6b-80e2-429b-8379-2e8cee08d533.png">

- `pos-dot` 과 `pos-indicator`에 border를 적용해 보았습니다. 보시다시피 같은 너비와 높이를 가지는 직사각형 형태의 박스인 것을 확인할 수 있습니다.

```css
& > div {
  width: 100%;
  height: 2rem;
  display: flex;
  align-items: center;
}
```

- `pos-dot` 과 `pos-indicator`에 스타일을 적용해 보겠습니다. 두 `div`는 공통적으로,

  - 상위 div (`SliderBackgroundWrapper`) 와 같은 너비 (3.6rem) 를 갖습니다. 3.6rem인 이유는 슬라이더 본체의 너비가 총 18rem이기 때문에 이를 5등분 하였습니다.

  - 2rem의 높이를 갖습니다.

  - `align-items` 속성을 통해 세로축 중앙에 하위 요소를 배치합니다.

```css
  .pos-dot {
    & > div {
      width: 0.5rem;
      height: 0.5rem;
      border-radius: 50%;
      background-color: ${props =>
        props.curValue >= props.indiValue * 25 ? 'teal' : '#CCC'};
      margin-left: ${props => (0.9 - 0.125) * props.indiValue}rem;
    }
  }
```

- `pos-dot`은

  - 하위 `div`가 눈금 점을 나타내므로 가로세로 0.5rem의 작은 점으로 스타일링합니다.

  - 배경색은 prop에 따라 다르게 지정됩니다.

  - 앞서 `curValue`와 `indiValue`를 props로 받아왔는데, `curValue`는 현재 슬라이더의 값, `indiValue`는 눈금점이 나타내는 값 (`i`)을 의미하였습니다.

  - 버튼이 눈금점보다 오른쪽에 있을 경우 해당 눈금점은 teal색, 왼쪽에 있을 경우 해당 눈금점은 회색 (`#CCC`) 으로 표현되어야 슬라이더를 움직일 때 자연스러운 색상 배치가 이루어집니다.

  - 따라서 `curValue`가 `indiValue` \* 25보다 클 경우 teal색, 그 외의 경우 `#CCC` 색을 적용합니다.

  - `margin-left` 속성은 `indiValue`에 의해 결정되는데, 각 `pos-dot` `div`의 너비가 3.6rem이고 슬라이더를 4등분 해야하므로, 3.6 / 4 = 0.9rem만큼의 `margin-left`를 지정합니다. 단, 눈금점의 너비 (0.5rem) 에 의해 `margin-left`가 조금씩 오른쪽으로 밀리므로 눈금점의 너비를 4등분하여 빼주는 식으로 보정하였습니다.

```css
.pos-indicator {
  & > div {
    width: 2rem;
    height: 1rem;
    border-radius: 0.3rem;
    background-color: #AAA;
    color: white;

    font-size: 0.5rem;

    display: flex;
    align-items: center;
    justify-content: center;

    margin-left: ${props => (0.9 - 0.5) * props.indiValue}rem;
    ${props =>
      props.indiValue === 1
        ? `margin-left: ${0.9 - 0.75}rem;`
        : props.indiValue === 3
        ? `margin-left: ${2.7 - 1.25}rem;`
        : ''}
  	cursor: pointer;
  	transition: background-color 0.1s;

     &:hover {
      background-color: teal;
    }
  }
}
```

- `pos-indicator`은

  - 하위 `div`를 적당한 크기와 색상의 작은 박스로 다듬었습니다.

  - `curValue`에 의해 결정되는 요소는 없지만, `pos-dot`과 마찬가지로 `margin-left`를 조정하여 슬라이더를 4등분하는 지점에 예쁘게 배치해야 하므로 `pos-dot`과 비슷한 계산법을 사용합니다.

  - 먼저 모든 박스에 `pos-dot`과 같이 0.9 - (박스의 너비 / 4) rem 만큼 `margin-left`를 보정해 줍니다.

  - 다음엔 `indiValue`가 1일 때 (25%) 와 3일 때 (75%) 추가적으로 보정을 해주어야 합니다. 위의 계산만으로는 버튼이 눈금 점의 하단에 예쁘게 배치되지 않고 오른쪽으로 밀려 보이게 됩니다.

  - 박스 너비의 8분의 1만큼 추가로 폭을 보정하여 적용하였습니다.

  - 버튼에 마우스를 올리면 색이 `teal`로 변하도록 하였고, 색상 변화에 애니메이션을 주기 위해 `transition` 속성을 부여하였습니다.
