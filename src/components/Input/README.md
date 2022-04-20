# Input

## 요구 사항

- input 창에 이메일과 비밀번호를 입력할 수 있어야 합니다.

- (부가 요소) 이메일 형식에 맞을 경우 체크 표시 등으로 알려주어야 합니다.

- (부가 요소) 비밀번호 입력란 우측 눈 아이콘을 누르면 비밀번호가 가려지지 않고 노출되어야 합니다.

## 결과물

![Apr-19-2022 16-15-44](https://user-images.githubusercontent.com/37893979/163947029-93df91dd-fea9-4f3a-8691-a38f25e0add9.gif)

## 핵심 요소

```jsx
<label htmlFor="email">E-mail</label>
<input
  type="email"
  name="email"
  placeholder="E-mail"
  value={inputEmail}
  onChange={handleOnEmailChange}
  <label htmlFor="password">Password</label>
<input
  type="password"
  name="password"
  placeholder="Password"
  value={inputPassword}
  onChange={handleOnPasswordChange}
/>
/>
```

- `input` 태그를 `type="email"` (이메일), `type="password"` 로 지정합니다.

- 아무것도 입력하지 않아도 E-mail, Password라는 문구가 표시되도록 `placeholder`를 지정합니다.

- 입력 박스 상단에 라벨이 표시되도록 label 태그를 추가하고, `htmlFor` 어트리뷰트를 통해 어떤 `input` 태그와 연결할 것인지 지정합니다.

- 입력 박스에 보여지는 값은 state로 지정 후, 입력 박스에 값을 입력할 때마다 setState hook을 이용하여 상태값이 바뀌도록 합니다.

```jsx
const handleOnPasswordChange = e => {
  setInputPassword(e.target.value);
};

const handleOnEmailChange = e => {
  setInputEmail(e.target.value);
};
```

- 핵심 요소에서는 값이 바뀔 때마다 부차적으로 수행해야 하는 작업이 없으므로, setState만을 사용하여 상태값을 바꿔줍니다.

- input 태그의 입력값은 이벤트 변수 e의 target.value 에 저장되므로, 해당 값을 불러옵니다.

## 부가 요소

- 이메일에 이메일 형식 검증 과정이 추가되며, 비밀번호 입력창은 아이콘을 클릭할 때마다 입력값이 숨김 / 숨김 해제 처리되어야 합니다.

- 체크 아이콘과 눈 아이콘은 input 요소 안에 보여져야 하지만, input 태그는 자식 태그를 가질 수 없습니다.

- input 태그 내에 자식 태그를 심으면 위와 같은 오류가 출력됩니다.

- 따라서 아이콘을 input 요소 안에 표시하기 위해 아이콘 태그와 input 태그를 relative 태그를 이용해 겹쳐 표시하여야 합니다.

- 스타일 코드와 이메일, 비밀번호 입력 컴포넌트 코드의 길이가 길어져 파일을 분리하였습니다.

### Input

```jsx
<InputWrapper>
  <EmailInput
    className="input-div"
    inputEmail={inputEmail}
    setInputEmail={setInputEmail}
  />
  <PasswordInput
    className="input-div passwd"
    inputPassword={inputPassword}
    setInputPassword={setInputPassword}
  />
</InputWrapper>
```

- 이메일 입력 박스와 패스워드 입력 박스를 `EmailInput`과 `PasswordInput` 컴포넌트로 분리하였습니다.

- 두 컴포넌트는 거의 비슷한 스타일을 가지므로, 클래스를 `input-div` 로 똑같이 설정하여 스타일을 동시에 적용합니다.

  - 단, `PasswordInput`은 추가로 적용해야 할 스타일 (아이콘에 마우스를 올렸을 때 커서 변경) 이 있으므로 `passwd` 클래스를 추가합니다.

  - 두 컴포넌트의 스타일을 동시에 적용하기 위해서, 하위 컴포넌트에서 따로 스타일 설정을 하지 않고 `InputWrapper` Styled 컴포넌트에서 스타일을 동시 적용하겠습니다.

- Input 컴포넌트의 상태값인 `inputEmail`, `inputPassword`를 하위 컴포넌트에서도 사용할 수 있도록, 상태값과 상태값 변경 함수를 `props`로 넘겨주었습니다.

### EmailInput

```jsx
const [ifEmailValid, setIfEmailValid] = useState(false);
const [ifShown, setIfShown] = useState(false);
```

- 내부에서 자체적으로 2개의 State를 사용합니다.

- `ifEmailValid`는 입력한 이메일이 이메일 형식에 맞는지 알려주는 상태값입니다.

  - 입력값이 바뀔 때마다 핸들러를 사용하여 입력값 검증 후 상태값을 바꿔줄 것입니다.

- `ifShown`은 input 태그 하단에 `Invalid E-mail address.` 문구를 표시할 지 여부를 알려주는 상태값입니다.

  - 이 상태값이 true로 설정될 경우, 이메일 입력 박스 하단에 `Invalid E-mail address.` 라는 문구가 표시될 것입니다.

  - `ifShown`은 사용자가 이메일 입력 박스 포커스를 해제할 때마다 설정되며, 입력값이 이메일 형식에 맞지 않을 때 `true`를 가집니다.

```jsx
const handleOnEmailChange = e => {
  const regex = /[a-zA-Z0-9._]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  setInputEmail(e.target.value);
  if (e.target.value.match(regex)) setIfEmailValid(true);
  else setIfEmailValid(false);
};

const handleOnBlur = e => {
  e.preventDefault();
  setIfShown(!ifEmailValid && inputEmail.length > 0 ? true : false);
};
```

- `handleOnEmailChange` 핸들러는 input 태그의 입력값이 변할 때마다 (`onChange`) 동작합니다.

  - 우선, 입력값이 변할 때마다 inputEmail 상태값을 해당 값으로 설정합니다. inputEmail 상태값은 상위 컴포넌트에서 props를 통해 받아옵니다.

  - regex 정규식을 이용하여 이메일을 검증할 것입니다.

  - 사용한 regex 해석은 다음과 같습니다.

    - `[a-zA-Z0-9._]+` : 대괄호 (`[]`) 안에 있는 글자 중 한 개 이상이 존재하여야 합니다.

    - `@` : 해당 위치에 @ 기호가 필수로 입력되어야 합니다.

    - `\.` : 해당 위치에 . 기호가 필수로 입력되어야 합니다. . 기호 만으로는 정규식 패턴으로 인식되니, 백슬래시를 붙여줍니다.

    - `$` : 문자열의 끝입니다.

  - 따라서, 정규식 `/[a-zA-Z0-9._]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/` 는 [`알파벳, 숫자, _, .`]@[`알파벳, 숫자, -`].[`알파벳, 숫자, -, .`] 형식을 지켜야 함을 의미합니다.

  - 문자열의 `match` 메서드를 이용하여 해당 정규식에 부합하는 문자열인지 체크하고, 상태값 `ifEmailValid`를 `true` 또는 `false`로 설정해 줍니다.

- `handleOnBlur` 핸들러는 사용자가 input 박스의 포커스를 해제할 때마다 (`onBlur`) 동작합니다.

  - `onBlur`는 `onFocus`와 반대 개념입니다.

  - 입력 박스 하단에 경고 문구 (`Invalid E-mail address`) 출력 여부를 결정하기 위해 `ifShown` 상태값을 설정합니다.

  - 입력 문자열의 이메일 검증에 실패하였고 (!`ifEmailValid`) 입력 문자열의 길이가 0이 아닐 때 (`inputEmail.length > 0`) `ifShown` 상태값이 `true`가 됩니다.

  - 아무것도 입력되지 않았을 때는 경고 문구가 표시되면 안 되기 때문에 문자열의 길이를 체크하였습니다.

```jsx
<div className={className}>
  <label htmlFor="email">E-mail</label>
  <div>
    <input
      type="email"
      name="email"
      placeholder="E-mail"
      value={inputEmail}
      onChange={handleOnEmailChange}
      onBlur={handleOnBlur}
    />
    <label style={{ display: `${ifShown ? '' : 'none'}` }}>
      Invalid E-mail address.
    </label>
    <svg
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      style={{ fill: `${ifEmailValid ? 'teal' : '#CCC'}` }}
    >
      <path
        className="cls-1"
        d="M16,31A15,15,0,1,1,31,16,15,15,0,0,1,16,31ZM16,3A13,13,0,1,0,29,16,13,13,0,0,0,16,3Z"
      />
      <path
        className="cls-1"
        d="M13.67,22a1,1,0,0,1-.73-.32l-4.67-5a1,1,0,0,1,1.46-1.36l3.94,4.21,8.6-9.21a1,1,0,1,1,1.46,1.36l-9.33,10A1,1,0,0,1,13.67,22Z"
      />
    </svg>
  </div>
</div>
```

- 스타일을 적용할 때 `input` 태그와 `svg` 태그를 겹쳐 보이게 하기 위해 상위에 `div` 태그를 추가해 줍니다.

  - 이 `div` 태그는 `position`을 `relative`로 설정하고, 하위 `svg` 태그를 `absolute`로 설정하여 `input` 태그의 위에 겹쳐 보이도록 할 것입니다.

- `input` 태그의 attribute는 핵심 요소와 유사하게 작성합니다.

  - 단, `onChange`와 `onBlur`에 각각 핸들러를 붙여줍니다.

- `input` 태그의 하단에 `label` 태그를 하나 더 붙여줍니다.

  - `div`로 작성해도 상관없는 태그입니다만, `label` 태그를 선택한 이유는 `input` 태그의 상단에 있는 `label` 태그와 스타일을 똑같이 맞춰주기 위해서입니다.

  - 이 `label` 태그는 인라인 스타일을 적용하였습니다. 상위 `Input` 태그에서 스타일을 적용하지 않고 인라인 스타일을 설정한 이유는 `ifShown` 상태값을 사용해야 하기 때문입니다.

  - Styled `label` 을 사용하고 props로 `ifShown`을 넘겨주어도 동일하게 동작하지만, 코드의 줄 수를 줄여 가독성을 좋게 하기 위함도 있습니다.

  - `ifShown` 태그가 `true`일 경우엔 해당 라벨이 표시되어야 하므로 `display` 속성을 default로 고정하고, `false`일 때 `none`로 설정하여 화면에서 숨겨주었습니다.

- 입력 박스 오른쪽 끝에 표시되는 아이콘은 인라인 `svg`를 그대로 불러와 사용하였습니다.

  - `svg`에도 마찬가지로 인라인 속성을 적용합니다.

  - 인라인 속성을 적용한 이유는 위와 마찬가지로 `ifEmailValid` 상태값을 사용하기 위함입니다.

  - 입력값이 유효한 이메일일 경우 (검증을 마쳤을 경우) 아이콘의 색상을 `teal`로 변경해 줍니다. 그 외의 경우, 옅은 회색 (`#CCC`) 로 설정합니다.

### PasswordInput

```jsx
const [ifHidePassword, setIfHidePassword] = useState(true);
```

- `EmailInput`과 달리, 한 개의 상태값만을 사용합니다.

- `ifHidePassword` 상태값은 입력 박스에 입력중인 비밀번호를 을 가릴지, 표시할지 결정합니다.

```jsx
const handleOnClick = e => {
  e.preventDefault();
  setIfHidePassword(ifHidePassword ? false : true);
};

const handleOnPasswordChange = e => {
  setInputPassword(e.target.value);
};
```

- `handleOnPasswordChange` 핸들러는 핵심 요소와 똑같이 구현합니다.

- `handleOnClick` 핸들러는 비밀번호 입력 박스의 우측 아이콘을 클릭할 때마다 동작하는 핸들러로, 입력 중인 비밀번호의 숨김 여부를 `ifHidePassword` 상태값을 이용하여 변경합니다.

```jsx
<div className={className}>
  <label htmlFor="password">Password</label>
  <div>
    <input
      type={ifHidePassword ? 'password' : 'text'}
      name="password"
      placeholder="Password"
      value={inputPassword}
      onChange={handleOnPasswordChange}
    />
    <svg
      viewBox="0 0 576 512"
      xmlns="http://www.w3.org/2000/svg"
      onClick={handleOnClick}
      style={{ fill: `${!ifHidePassword ? 'teal' : '#CCC'}` }}
    >
      <path d="M572.52 241.4C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 0 0 0 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 0 0 0-29.19zM288 400a144 144 0 1 1 144-144 143.93 143.93 0 0 1-144 144zm0-240a95.31 95.31 0 0 0-25.31 3.79 47.85 47.85 0 0 1-66.9 66.9A95.78 95.78 0 1 0 288 160z" />
    </svg>
  </div>
</div>
```

- 스타일을 적용할 때 `input` 태그와 `svg` 태그를 겹쳐 보이게 하기 위해 상위에 `div` 태그를 추가해 줍니다.

  - 이 `div` 태그는 `position`을 `relative`로 설정하고, 하위 `svg` 태그를 `absolute`로 설정하여 `input` 태그의 위에 겹쳐 보이도록 할 것입니다.

- `input` 태그의 attribute는 핵심 요소와 유사하게 작성합니다.

  - 단, `type` attribute는 `ifHidePassword` 상태값에 따라 다르게 적용합니다.

  - `type`가 `password`일 경우 입력값이 숨김 처리되고, `text`일 경우 입력값이 숨김 해제되므로, 비밀번호의 숨김 여부를 결정하는 `ifHidePassword`에 따라 attribute를 다르게 지정하여 비밀번호를 숨김 / 숨김해제 합니다.

- `svg` 아이콘 태그에는 `onClick` 핸들러를 붙여 클릭할 때마다 비밀번호 숨김 / 숨김 해제 상태를 바꿀 수 있도록 합니다.

- 또한, `svg` 태그에 인라인 스타일을 통해 비밀번호가 숨김 처리 되었을 때와 숨김 해제 되었을 때의 색상을 다르게 해 줍니다.

  - 숨김 / 숨김 해제를 판단하기 위해 `ifHidePassword` 상태값을 사용합니다.

### 전체 Style 작업

- `EmailInput`, `PasswordInput` 컴포넌트 모두 `input-div` 클래스를 공통으로 갖게 한 후, 상위 컴포넌트인 `Input`에서 스타일을 한번에 적용할 수 있도록 하였습니다.

  - 두 컴포넌트의 디자인상 차이점은 버튼 위에 마우스를 올렸을 때 포인터 변경 여부밖에 없기 때문입니다.

  - 또한 아이콘 위치, 컴포넌트 크기 및 색상을 동일하게 해야 통일성을 줄 수 있습니다.

```css
  .input-div {
    & > div {
      position: relative;
    }
```

- `input-div` 바로 하위에 있는 div (`input`과 `svg` 태그를 감싸는 `div`) 의 `position`을 `relative`로 설정합니다.

- 하위에 있는 두 태그가 겹쳐 보여야 하기 때문입니다.

```css
label {
  width: 14rem;
  padding: 0.3rem;

  text-align: left;
  font-size: 0.5rem;
  color: rgba(0, 0, 0, 0.5);

  display: flex;
  flex-direction: column;
  justify-content: left;
}

label:nth-child(2) {
  color: rgba(200, 0, 0, 0.7);
}
```

- `label`의 스타일을 설정합니다.

  - 색을 흐릿하게 하고, 글자 크기를 작게 해 주었습니다.

  - `EmailInput` 은 `label` 태그가 2개인데, 2번째 태그 (`Invalid E-mail address`를 출력하는 태그) 에 글자색을 다르게 적용하기 위해 `nth-child` 선택자를 사용합니다.

```css
input {
  width: 13rem;
  height: 2rem;
  padding: 0 0.5rem;
  padding-right: 2rem;
  background-color: #eee;

  border: 1px solid #aaa;
  border-radius: 0.2rem;
}

input:focus {
  outline: none;
  border: 1px solid black;
}
```

- `input`의 스타일을 설정합니다.

- 사용자가 해당 `input` 요소를 선택하였을 때 (포커싱 되었을 때) 노란색 테두리가 뜨던 것을 `outline: none`을 통해 없애주고, 테두리의 색을 검은색으로 진하게 표현해줍니다.

```css
svg {
  width: 1rem;
  height: 1rem;
  color: black;

  position: absolute;
  right: 0.5rem;
  top: 0.5rem;

  transition: fill 0.2s;
}

.passwd svg:hover {
  cursor: pointer;
}
```

- `svg` 아이콘의 스타일을 적용합니다.

  - `position`은 `absolute`로 설정하여 상위 `div`를 기준으로 자유롭게 움직이도록 하였습니다.

  - 위치는 상위 `div` 기준으로 오른쪽에서 0.5rem, 위에서 0.5rem에 고정하여 `input` 요소의 오른쪽 중간 정도에 위치하도록 해 주었습니다.

  - 색 변화가 있을 때마다 자연스럽게 변할 수 있도록 `transition`을 적용하였습니다.

- `passwd` 클래스의 컴포넌트에 대하여 내부 `svg`에 커서를 올릴 경우 커서를 포인터로 변경합니다.
