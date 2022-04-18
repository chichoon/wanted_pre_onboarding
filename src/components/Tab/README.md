# Tab

## 요구 사항

- 각 탭을 누를 때마다 선택된 탭이 변해야 합니다.

- 어떤 탭을 선택하였는지 배경색과 글자 투명도 등 디자인에 변화를 주어야 합니다

- (부가 요소) 탭을 변경할 때마다 슬라이드 애니메이션이 들어가야 합니다

## 결과물

![Apr-18-2022 16-52-46](https://user-images.githubusercontent.com/37893979/163775897-9230c22a-bc8e-4eb3-afb4-0539fe40f3ec.gif)


## 핵심 요소

```jsx
const [selectedIndex, setSelectedIndex] = useState(0);
```

- 컴포넌트를 다른 곳에서도 쓸 수 있도록, 탭 항목의 이름은 props로 받도록 하였습니다.

- 어떤 항목을 선택하였는지는 선택한 항목의 배열에서의 index 번호를 저장하는 State를 사용하였습니다.

  - 기본값은 가장 왼쪽의 항목을 나타내는 인덱스인 0으로 지정합니다.

  ```jsx
  const handleOnClick = (e, index) => {
    e.preventDefault();
    setSelectedIndex(index);
  };
  ```

- 버튼을 클릭할 때마다 `selectedIndex` state를 set하는 onClick 핸들러를 추가하였고, 이 state를 이용하여 선택된 항목과 그렇지 않은 항목에 서로 다른 style이 적용되도록 하였습니다.

  - 탭의 각 항목은 고유의 index 값을 가지며, 이 값을 이용하여 어떤 탭을 선택했는지 알 수 있도록 하였습니다.

- 컴포넌트의 무한 렌더링을 막기 위해 `e.preventDefault`를 적용하였습니다.

```jsx
{
  selectorArr.map((v, i) => (
    <SelectorDiv
      className={selectedIndex === i ? 'selected' : ''}
      key={i}
      onClick={e => handleOnClick(e, i)}
      length={selectorArr.length}
    >
      {selectorArr[i]}
    </SelectorDiv>
  ));
}
```

- 탭을 렌더링할 땐 항목이 담긴 배열 (`selectorArr`) 에 map을 적용하여 배열의 각 원소에 대해 `SelectorDiv` 컴포넌트를 반환하였습니다.

  - `SelectorDiv` 컴포넌트는 Styled 컴포넌트로, 스타일이 적용된 `div`입니다.

  - 각각의 `SelectorDiv`는 서로 다른 `key`값과 내용을 가집니다

  - `key`값은 각 컴포넌트의 고유값입니다.

  - `div` 내의 텍스트는 `selectorArr`에 저장되어 있는 문자열을 출력합니다.

- 특정 탭을 선택하면 `handleOnClick` 함수가 실행되며, 이 함수는 선택된 탭의 인덱스 번호를 `selectedIndex`에 set합니다.

  - 탭의 인덱스와 선택된 탭의 인덱스 (`selectedIndex`) 가 일치할 경우, 탭에 `selected` 클래스가 추가되며, 다른 style이 적용됩니다.

- 탭의 너비를 탭의 개수에 따라 유동적으로 지정해 주기 위해, `length` prop을 받아옵니다.

  - 이 `length` prop은 `SelectorDiv` Styled 컴포넌트에서 탭의 너비를 계산하는 데에 사용됩니다.

  - 탭 컴포넌트의 전체 너비가 24rem이므로, `length`는 24rem / [탭의 너비] 가 됩니다.

## 부가 요소

```jsx
<TabWrapper length={selectorArr.length} index={selectedIndex}>
  <div>
    {selectorArr.map((v, i) => (
      <SelectorDiv
        className={selectedIndex === i ? 'selected' : ''}
        key={i}
        onClick={e => handleOnClick(e, i)}
        length={selectorArr.length}
      >
        {selectorArr[i]}
      </SelectorDiv>
    ))}
  </div>
  <div>
    <div></div>
  </div>
</TabWrapper>
```

- `selectorDiv`를 감싸는 `div`를 하나 추가하여, 하단과 분리되도록 하였습니다.

- `SelectorDiv` 외에도 다른 `div`를 하나 더 추가하여 하단 슬라이더를 구현하였습니다.

  - 상위 `div`는 회색 박스로 뒷 배경을 맡고, 하위 `div`는 teal색 박스로 움직이는 슬라이더 역할을 맡습니다.

  - 이 하위 `div`가 움직이는 데에는 Toggle과 마찬가지로 `margin-left`를 조정하는 방식을 사용하였으며, 각 탭의 너비를 조정하는 데에 사용했던 것처럼 `margin-left`를 조절하기 위해서도 `selectorArr` 배열의 길이를 사용합니다.

  - 단순히 서로 다른 색을 가진 `div`가 겹쳐 보이기만 하면 되므로, `position: relative` / `absolute`를 사용하지 않습니다.

```css
& > div:nth-child(2) {
  height: 0.3rem;

  background-color: lightgray;

  div {
    width: calc(24rem / ${props => props.length});
    height: 0.3rem;

    margin-left: calc(0.5rem + 24rem * ${props => props.index / props.length});

    background-color: teal;
    transition: margin-left 0.2s;
  }
}
```

- 하단 `div`를 선택하기 위해 `nth-child` 선택자를 사용하였습니다.

- 상위 `div`의 배경색은 `lightgray`로, 하위 `div`의 배경색은 `teal`로 설정하였습니다.

- 하위 `div`의 너비는 각 탭의 너비와 같아야 하므로, 탭의 너비와 똑같이 `props`로 넘겨준 length를 이용하여 계산해 줍니다.

- 하위 `div`는 선택한 탭이 무엇인지에 따라 `margin-left`를 조정하여 위치를 변경해 주어야 합니다.

  - 따라서 `props`로 선택한 탭의 `index`를 받아오고, 이것과 `props`.length를 이용하여 `margin-left`의 길이를 계산합니다.

  - 선발 과제 예시와 유사하게 맞추기 위해 탭의 하단 슬라이더 양 끝에 0.5rem의 너비를 주었습니다.

  - `margin-left`가 변할 때마다 애니메이션을 주어야 하므로, `transition`의 대상 속성을 `margin-left`로 맞추고 시간은 0.2s로 조정하였습니다.

```css
transition: color 0.2s;
&.selected {
  color: rgba(0, 0, 0, 1);
}
```

- 탭을 선택하였을 때 탭의 글자색이 진해져야 하므로 .selected 클래스에 대하여 불투명도를 100% (1) 로 조정해 줍니다.

- 애니메이션 효과를 위해 `transition`의 대상 속성을 `color`로 맞추고 시간은 0.2s로 조정하였습니다.

- 선택한 탭 말고도 탭 위에 마우스를 올렸을 때 애니메이션을 추가하기 위해 `:hover `선택자를 통해 마우스를 올린 탭의 글자 불투명도를 50% (0.5) 로 조정하였습니다.
