# Dropdown

## 요구 사항

- 드롭다운을 누르면 선택창이 아래에 펼쳐집니다.

- 선택창 내의 요소 아무거나 클릭하면 드롭다운 내용물이 선택된 항목으로 변경됩니다.

- (부가 요소) 키워드 필터가 구현되어야 합니다.

## 결과물

![Apr-20-2022 14-45-15](https://user-images.githubusercontent.com/37893979/164158843-1483964e-653a-4c91-a761-e54305feeb30.gif)

## 핵심 요소

```jsx
const [selectedStr, setSelectedStr] = useState(dropdownArr[0]);
const [ifHidden, setIfHidden] = useState(true);
```

- 선택한 항목의 이름을 담은 상태값 `selectedStr` 과 선택창의 숨김 여부를 담은 상태값 `ifHidden`을 사용합니다.

  - `selectedStr`의 초기값은 항목 배열의 첫 번째 원소를 사용합니다.

  - `ifHidden`의 초기값은 true로 지정하여 선택창을 숨깁니다.

```jsx
const handleOnClick = e => {
  e.preventDefault();
  setIfHidden(ifHidden ? false : true);
};
```

- 드롭다운을 클릭할 때마다 아래의 선택창의 숨김 여부를 설정하므로, `handleOnClick` 핸들러를 추가하여 `ifHidden` 상태값을 조정할 수 있도록 하였습니다.

```jsx
<DropdownWrapper>
  <div className="dropdown-top" onClick={handleOnClick}>
    <div className="dropdown-top-header">{selectedStr}</div>
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
    setStr={setSelectedStr}
  />
</DropdownWrapper>
```

- 드롭다운 컴포넌트의 전체를 `DropdownWrapper`로 감싸 Styled 컴포넌트의 스타일이 적용되도록 하였습니다.

- 선택창을 제외한 드롭다운 본체는 `div`로 구현하였습니다.

  - `dropdown-top` 클래스의 `div`가 드롭다운 본체를 나타내며, 이 `div`를 클릭할 때마다 (`onClick`) 핸들러가 발동합니다.

  - `dropdown-top-header` 클래스는 드롭다운의 좌측 문자열 출력 부분을 담당합니다.

  - `dropdown-top-arrow` 클래스는 드롭다운의 우측 화살표를 포함합니다. 내부에는 화살표의 `svg` 벡터 태그가 존재합니다.

- `DropdownBottom` 컴포넌트는 드롭다운의 선택창을 나타내는 컴포넌트입니다. 구성 요소가 많아 별도의 컴포넌트로 분리한 후 import 하였습니다.

  - 드롭다운에서 선택할 수 있는 항목들을 담은 배열 `dropdownArr`, 숨김 여부를 결정하는 `ifHidden` 등을 props로 넘겨줍니다.

### 스타일 적용

```css
  .dropdown-top {
	...
    display: flex;
    flex-direction : row;
    align-items: center;
    justify-content: space-between;
```

- `dropdown-top` 내의 문자 출력 `div` (`dropdown-top-header`) 와 화살표 `div` (`dropdown-top-arrow`) 를 양 끝에 배치하기 위해 `justify-content` 속성을 `space-between`으로 설정해 줍니다.

```css
.dropdown-top-header {
  width: 8rem;
  padding: 0 0.2rem;

  font-size: 0.8rem;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
```

- `dropdown-top-header`에서 출력할 문자열 (선택한 항목의 이름) 이 너무 길 경우, overflow를 방지하기 위해 위와 같은 설정을 적용해 줍니다.

  - `white-space: nowrap`은 띄어쓰기 기준으로 래핑하여 다음 줄로 넘어가는 것을 방지합니다.

  - `text-overflow: ellipsis`는 빠져나온 문자열만큼 `...`으로 대체하여 출력합니다.

  - `overflow: hidden`을 통해 빠져나온 문자열을 숨깁니다.

```css
&:hover {
  cursor: pointer;
}
```

- 마우스를 올리면 포인터가 변경되도록 설정하였습니다.

### DropdownBottom

```jsx
const handleOnClick = (e, v) => {
  e.preventDefault();
  setStr(v);
  setIfHidden(true);
};
```

- 각 항목을 클릭할 때마다 선택한 항목을 변경하기 위해 `handleOnClick` 핸들러를 추가합니다.

  - `setStr` 함수는 상위 컴포넌트로부터 props로 받아온 상태값 설정 함수로, 지금 클릭한 항목으로 상위 컴포넌트의 상태값을 바꾸는 역할을 합니다.

  - 항목 선택 후 선택창이 닫혀야 하므로, `ifHidden` 상태값을 `true`로 바꾸어 줍니다.

```jsx
<DropdownBottomWrapper ifHidden={ifHidden}>
  <div className="div-list">
    {dropdownArr.map((v, i) => (
      <div key={i} onClick={e => handleOnClick(e, v)}>
        {v}
      </div>
    ))}
  </div>
</DropdownBottomWrapper>
```

- 드롭다운 선택창을 구성해 봅니다.

  - 검색 & 필터 기능은 핵심 요소에는 아직 구현하지 않습니다.

  - `div-list` `div`는 선택창의 항목들을 감싸주는 역할을 하며, 해당 `div` 내에 `dropdownArr` 내의 항목들을 매핑하여 리스트처럼 출력해 주었습니다.

  - 각 `div`에는 위에서 선언한 `handleOnClick` 핸들러를 `onClick`에 설정합니다.

### 스타일 적용

```css
	${props => (props.ifHidden ? 'display: none;' : '')}
```

- `DropdownBottomWrapper` Styled 컴포넌트에 props로 넘겨준 `ifHidden`을 통해 선택창 컴포넌트의 숨김 여부를 결정합니다.

```css
.div-list {
  height: 10rem;
  overflow-y: scroll;

  & > div {
    width: 9rem;
    padding: 0.6rem 1rem 0.6rem 2rem;
    background-color: white;
    overflow: hidden;

    font-size: 0.8rem;
    text-align: left;
    color: #666;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;

    transition: background-color 0.2s;

    &:hover {
      cursor: pointer;
      background-color: #eee;
    }
  }
}
```

- `div-list` 컴포넌트의 높이를 설정한 후, 항목의 개수가 많아 설정한 높이보다 리스트가 길어질 경우 스크롤으로 아래 항목도 탐색할 수 있도록 설정해 줍니다.

- `div-list` 내의 `div`는 각 항목들을 담은 `div`로, 마우스를 올렸을 때 보편적인 선택창과 같이 배경색을 변경해 줍니다.

  - 배경색이 자연스럽게 변경되도록 `transition`을 적용하였습니다.

  - 또한 마우스를 올리면 커서가 포인터로 변경되도록 설정합니다.

  - 항목의 이름이 너무 길어 `div` 밖으로 빠져나오는 것을 방지하도록 overflow 관련 속성들을 설정해 줍니다.

## 부가 요소

- `DropdownBottom` (선택창 컴포넌트) 에 단어 필터 기능을 추가합니다.

- 선택창 최상단에 `input` 태그를 넣어 검색창처럼 보이도록 꾸며줍니다.

```jsx
const [searchInput, setSearchInput] = useState('');
```

- 검색창의 입력값을 담은 상태값을 선언합니다. 초기값은 빈 문자열입니다.

```jsx
const handleOnChange = e => {
  setSearchInput(e.target.value);
};
```

- `Input` 컴포넌트를 작성할 때와 비슷하게, `input` 태그 내의 값이 바뀔 때마다 `searchInput` 상태값을 재설정합니다.

```jsx
<div className="div-input">
  <svg
    id="Glyph"
    version="1.1"
    viewBox="0 0 32 32"
    xmlSpace="preserve"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M27.414,24.586l-5.077-5.077C23.386,17.928,24,16.035,24,14c0-5.514-4.486-10-10-10S4,8.486,4,14  s4.486,10,10,10c2.035,0,3.928-0.614,5.509-1.663l5.077,5.077c0.78,0.781,2.048,0.781,2.828,0  C28.195,26.633,28.195,25.367,27.414,24.586z M7,14c0-3.86,3.14-7,7-7s7,3.14,7,7s-3.14,7-7,7S7,17.86,7,14z"
      id="XMLID_223_"
    />
  </svg>
  <input
    type="text"
    onChange={handleOnChange}
    value={searchInput}
    placeholder="Search Symbol"
  />
</div>
```

- 검색창을 구현합니다.

- `div-input`은 검색창 전체를 감싸는 컴포넌트입니다.

  - `div-input`의 좌측에는 돋보기 아이콘을 배치하고, 우측에 `input` 박스를 배치할 것입니다.

- 돋보기 아이콘 `svg` 인라인 태그를 추가합니다.

- `input` 태그를 추가합니다. 실질적인 검색창이 됩니다.

  - `onChange`에 위에서 작성했던 `handleOnChange` 핸들러를 붙여 줍니다.

  - 검색창 미리보기 텍스트로 `Search Symbol`을 `placeholder`로 설정합니다.

```jsx
<div className="div-list">
  {dropdownArr
    .filter(v => {
      if (searchInput === '') return v;
      else if (v.toLowerCase().startsWith(searchInput)) return v;
    })
    .map((v, i) => (
      <div key={i} onClick={e => handleOnClick(e, v)}>
        {v}
      </div>
    ))}
</div>
```

- `div-list` 내의 요소들도 수정해 주어야 합니다.

- 항목 리스트를 작성할 때, `dropdownArr`을 매핑하는 것이 아닌, 이름이 검색창에 입력한 문자열로 시작하는 항목들만 출력할 수 있도록 `filter` 메서드를 사용합니다.

  - 입력값이 없을 때, (`searchInput` === '') `dropdownArr`의 항목을 그대로 출력합니다.

  - 입력값이 있을 때, `dropdownArr`의 항목을 `toLowerCase` 메서드를 이용하여 소문자로 바꿔준 후, `searchInput` 문자열로 시작하는지 여부를 판단합니다. 이 때는 `startsWith` 메서드를 사용합니다.

- `filter` 메서드를 통해 한번 필터링된 요소들만 `map`을 통해 선택창에 렌더링합니다.

### 스타일 적용

```css
.div-input {
  display: flex;
  flex-direction: row;

  border-bottom: 1px solid #aaa;

  svg {
    width: 1rem;
    padding: 0.5rem;
  }

  input {
    width: 9rem;
    padding: 0.6rem 1rem 0.6rem 0;

    border-top-left-radius: 0.3rem;
    border-top-right-radius: 0.3rem;
    border: none;

    font-size: 0.9rem;
    color: #333;

    &:focus {
      outline: none;
    }
  }
}
```

- `div-input` 클래스에 스타일을 적용해 보겠습니다.

- 선택창의 최상단에 자연스럽게 위치할 수 있도록, 테두리 (`border`) 를 하단에만 지정해 줍니다.

- `svg`와 `input`을 양 옆에 배치하기 위해 `div-input`의 `flex-direction`을 `row`로 설정합니다.

- `input`의 테두리를 모두 제거합니다. 테두리가 남아있을 경우, `div-input`의 테두리 및 `DropdownBottomWrapper`의 테두리와 겹쳐 깔끔하지 못한 디자인이 나오게 됩니다.

- `input`이 포커싱 되었을 때도 외곽선이 나타나지 않도록 없애 줍니다.
