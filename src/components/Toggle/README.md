# Toggle

## 요구 사항

- 토글 버튼을 누를 때 선택되는 항목을 문자열로 표시해야 합니다.

- 토글 버튼을 누를 때마다 어떤 항목을 선택하였는지 배경색과 글자 투명도에 변화를 주어야 합니다

- (부가 요소) 토글 버튼을 누를 때마다 슬라이더에 애니메이션이 들어가야 합니다

## 결과물

![Apr-18-2022 16-50-40](https://user-images.githubusercontent.com/37893979/163775653-86180f9d-d6fa-4818-90ab-12a2090d915f.gif)

## 핵심 요소

```jsx
const [ifToggle, setIfToggle] = useState(false);
```

- 버튼의 좌측 항목을 클릭하면 좌측 항목이 선택되고, 우측 항목을 클릭하면 우측 항목이 선택되도록 구현하여야 하는지 고민했지만, 보편적으로 사용되는 Toggle은 컴포넌트를 클릭하면 현재 선택된 항목과 반대 항목을 선택하도록 구현되므로 이를 따라하였습니다.

- 어떤 항목을 선택하였는지는 State를 사용하였습니다 (`ifToggle`)

  - 항목이 2개밖에 없으므로 좌측 항목을 선택하면 false, 우측 항목을 선택하면 true로 설정하며, 기본값은 false로 하였습니다.

  ```jsx
  const handleOnClick = e => {
    e.preventDefault();
    setIfToggle(ifToggle ? false : true);
  };
  ```

- 버튼을 클릭할 때마다 state를 set하는 onClick 핸들러를 추가하였고, 이 state를 이용하여 선택된 항목과 그렇지 않은 항목에 서로 다른 style이 적용되도록 하였습니다.

- 컴포넌트의 무한 렌더링을 막기 위해 `e.preventDefault`를 적용하였습니다.

  ```jsx
  <ToggleWrapper>
    <div
      className={clickedSect === 0 ? ' selected' : ''}
      onClick={e => handleOnClick(e, 0)}
    >
      {firstString}
    </div>
    <div
      className={clickedSect === 1 ? ' selected' : ''}
      onClick={e => handleOnClick(e, 1)}
    >
      {secondString}
    </div>
  </ToggleWrapper>
  ```

- 핵심 요소만을 구현할 때는 하나의 최상위 `div` 안에 두 개의 `div`를 추가하고, 선택 여부를 `className`으로 표현하였습니다.

  - `ToggleWrapper` 컴포넌트는 `Styled`를 적용한 `div`로, `display` 방식을 `flex`, `flex-direction`을 `row`로 하여 하위 div 두 개가 양 옆으로 배치되도록 하였습니다.

  - 또한 배경색과 `padding`을 적용하여 선택된 항목과 배경색이 명확하게 구분되도록 구현하였습니다.

  ```css
  div {
    width: 50%;
    border-radius: 2rem;

    display: flex;
    align-items: center;
    justify-content: center;

    font-weight: 700;
  }
  .selected {
    background-color: white;
    opacity: 30%;
  }
  ```

- 선택 여부에 따라 삼항 연산자를 통해 `className`에 `selected` 클래스가 추가됩니다.

  - `selected` 클래스에 다른 Style (`background-color`, `opacity`)을 적용함으로써 실제 토글 버튼처럼 선택한 항목은 배경이 흰 색으로 보이고, 선택한 항목의 문자열이 진하게 표시되도록 하였습니다.

  - 단, 이런 방식으로 구현한다면 선택된 항목과 선택되지 않은 항목 사이의 차이점이 색상 뿐이므로, 토글 버튼을 슬라이드하는 듯한 애니메이션을 줄 수 없게 됩니다.

  - 흰 배경 `div` 자체를 이동시키는 방식으로 애니메이션을 넣자니 두 항목을 나타내는 `div` 두 개가 양 옆으로 배치되어 있으므로 애니메이션 효과를 추가하면 한 `div`가 다른 `div`를 옆으로 밀어내게 됩니다.

  - `div` 안에 항목의 이름을 표시하는 문자열이 담겨있기 때문에, `div`가 옆으로 밀리면 텍스트도 같이 밀려버리게 됩니다.

## 부가 요소

```jsx
<ToggleWrapper toggle={ifToggle}>
  <div className="selector-parent" onClick={handleOnClick}>
    <div className="front">
      <SelectorWrapper>
        <div className={!ifToggle ? ' selected' : ''}>{firstString}</div>
        <div className={ifToggle ? ' selected' : ''}>{secondString}</div>
      </SelectorWrapper>
    </div>
    <div className="back">
      <div></div>
    </div>
  </div>
</ToggleWrapper>
```

- 애니메이션 효과를 주기 위해 몇 개의 `div`를 추가하였습니다

  - `selector-parent`는 `front`, `back` 요소를 감싸며, 두 `div`의 부모 요소이므로 `position`을 `relative` 로 설정하여 하위 요소들이 서로 겹칠 수 있도록 해 줍니다. 또한 이 요소를 클릭하면 Toggle이 동작할 수 있도록 `onClick` 핸들러를 추가합니다.

  - `className`이 `front`, `back`인 `div`는 서로 다른 `z-index`를 가진 `absolute` 요소입니다.

  - `absolute` 요소의 위치는 부모 요소 (`position`: `relative`) 를 기준으로 움직입니다.

  - 또한 `absolute` 요소에는 `z-index`를 주어 어느 요소가 앞에 표시될지 (`z-index`가 클 수록 앞에 보여집니다) 조정할 수 있습니다.

  - `z-index`를 이용하여 항목의 이름 (문자열) 이 표시되는 `div` (`front`) 와 슬라이더가 움직이는 `div` (`back`) 를 앞뒤로 분리하고, 서로 겹치도록 설정해 주었습니다

- 두 개의 겹치는 `div`는 부모와 같은 너비와 높이를 가지며, 기본 위치는 부모 요소 기준 `left 0px`, `top 0px`으로 설정하였습니다.

- `front` 클래스의 `div`는 항목 문자열이 담긴 `div`를 감싸주며, 두 개의 겹치는 `div` 중 앞에 보여지는 `div`입니다. (`z-index`: 2)

  - 한 쌍의 문자열은 양 옆으로 배치되어야 하므로 `display` 속성은 `flex`, `flex-direction`은 `row`로 해 주었습니다

  - 문자열이 담긴 `div`는 `front` 클래스의 자식 div이므로, `& > div` 로 선택할 수 있어 이를 이용하여 스타일을 적용하였습니다.

  - 선택한 항목에 스타일을 다르게 적용하기 위하여 핵심 요소를 구현할 때처럼 `selected` 클래스를 구현하였습니다.

- `back` 클래스의 `div`는 토글 슬라이더 `div`를 감싸주며, 두 개의 겹치는 div 중 뒤에 보여지는 div입니다. (`z-index`: 1)

  - `back` 클래스 안의 `div`는 슬라이더를 표현합니다. 부모 클래스의 절반의 너비를 가지며, `back` 클래스가 `front` 클래스에 비해 뒤에 있으므로 항목 문자열의 뒷 배경에서 움직이게 됩니다.

- `div` 2개를 `absolute`, `relative`를 이용하여 겹쳐 구현한 이유는 뒤의 토글 슬라이더는 애니메이션과 함께 움직여야 하지만, 앞의 텍스트는 뒤의 `div`의 영향을 받지 않고 가만히 멈춰 있어야 하기 때문입니다

- 따라서 겹쳐 보이는 두 레이어를 독립적으로 조작하기 위해 `z-index`를 이용한 겹치기를 택하였습니다.

  ```css
  margin-left: ${props => (props.toggle ? '10rem' : '0')};
  transition: margin-left 0.2s;
  ```

- 슬라이더의 움직임에 애니메이션을 주기 위해 저는 `margin-left`를 조정하는 방법을 선택하였습니다.

  - 처음에는 `left` 값을 조정하여 `div`의 위치 자체를 이동시키려 했으나, 슬라이더 `div`는 `absolute` 요소가 아니므로 (기본값인 `static` 에서는 `left`를 사용할 수 없음) `left` 값을 조정하는 방법은 사용할 수 없었습니다.

  - 슬라이더 `div`의 기본 위치는 부모 `div`의 왼쪽 끝이므로, `margin-left`가 변화하면 부모 `div`의 왼쪽 끝으로부터의 여백의 너비가 변화합니다.

  - 따라서 왼쪽 항목을 선택하면 `margin-left`를 0으로, 오른쪽 항목을 선택하면 `margin-left`를 부모 `div`의 폭의 절반만큼 증가시켜 슬라이더가 움직이는 것처럼 표현할 수 있습니다.

- `Styled Component` 내에서는 요소의 property로 받은 값을 사용할 수 있으므로, 어떤 항목이 선택되었는지 나타내는 `ifToggle` state를 인자로 가져왔습니다.

  - `ifToggle`은 왼쪽 항목을 선택했을 때 `false`, 오른쪽 항목을 선택했을 때 true이므로 이를 이용하여 `margin-left`를 조정합니다

- 마지막으로, `margin-left`가 변화할 때마다 애니메이션을 주기 위해 `transition`을 사용합니다.

  - 애니메이션은 `transition`으로, 애니메이션을 넣는 요소는 `margin-left`로 설정하여 `margin-left`가 변화할 때마다 애니메이션이 보여지도록 설정합니다.

  - 애니메이션 시간은 0.2초로 설정하였습니다.
