# 원티드 프리온보딩 코스

원티드 프리온보딩 선발과제 레포지토리입니다

본 README에서는 기능 구현에 대한 상세한 설명을 담습니다.

각 컴포넌트별 설명은 하단의 링크에서 볼 수 있습니다.

결과물을 확인할 수 있도록 `gh-pages` 라이브러리를 이용하여 깃허브 페이지로 호스팅 하였습니다.

# [결과물 페이지 보러가기](https://chichoon.github.io/wanted-pre-onboarding)

---

## 공통 구현 내용

```jsx
useEffect(
  () => {
    setFunc(/*컴포넌트에서 선택한 항목 또는 값*/);
  },
  [
    /*컴포넌트 내부의 State*/
  ],
);
```

- 항목을 선택할 수 있는 컴포넌트의 경우, 컴포넌트에 인자를 넘겨 선택가능한 항목을 사용자 임의로 설정할 수 있도록 하였습니다.

  - 구현해야 하는 컴포넌트들은 보편적으로 많이 사용되는 컴포넌트들이므로 재사용성에 초점을 맞췄습니다.

  - 예를 들어 `Tab` 컴포넌트를 구현할 경우, 탭의 항목을 사용자가 임의로 정할 수 있도록 배열 형태의 props (`['감자', '고구마', '카레라이스']`) 로 받아올 수 있도록 하였습니다.

- `useEffect`를 이용하여 상위 컴포넌트에서 어떤 항목을 선택하였는지 받아와 `App.js` 내의 `div`에서 출력할 수 있도록 하였습니다.

  - `setFunc`에는 상위 컴포넌트에서 `useState` hook을 이용해 생성한 `setState` 함수를 받아와 사용합니다.

  - 또한 `useEffect`는 컴포넌트 내부에서 선택값을 나타내는 state에 의존성을 갖도록 하였습니다.

  - 이 방식을 이용하여 하위 컴포넌트에서 상위 컴포넌트로 state를 넘겨줄 수 있습니다.

- 전역 상태 관리 라이브러리를 사용하면 컴포넌트간 값 전달이 쉬워지겠지만, 이번 과제에서는 컴포넌트가 몇 개 없기 때문에 사용하지 않았습니다.

- 구현 요소 각각에 대한 README가 상당히 길어져, 파일을 폴더별로 분리하였습니다.

---

## [Toggle](./src/components/Toggle/README.md)

## [Tab](./src/components/Tab/README.md)

## [Slider](./src/components/Slider/README.md)

## [Input](./src/components/Input/README.md)

## [Dropdown](./src/components/Dropdown/README.md)
