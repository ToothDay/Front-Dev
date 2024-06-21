# 팀 규칙

- 컴포넌트 파일명은 Camel Case로 설정한다

```

ex ) Test.tsx, Home.tsx

```

- 변수의 할당되는 값이 boolean일 경우 is or has를 붙인다

- 변수 및 함수는 카멜케이스 사용한다.

- 함수선언은 함수표현식을 사용, 화살표 함수 사용한다.

- 상대경로대신 절대경로를 사용한다.

* ts 파일인 경우 카멜케이스 사용, export로 바로 내 사용한다

```
 export  const testData = () => { }

```

- 컴포넌트 선언

```
  const Home = () => {
    return ()
  }

  export default Home

```

- 바로 return 하는 경우

```
// bad
const foo = () => { return "bar"; }

// good
const foo = () => "bar";

```

- 상수는 영문 대문자를 사용한다 ( 스네이크 케이스 )

- 타입선언은 type ? interface ? (논의 필요)

* 안쓰는 import 문은 삭제 -> 린트 설정을 했는데 적용이 잘 안되는 이슈

* 커밋 컨벤션 규칙 (논의필요 )

```
- `feat` : 새로운 기능 추가
    - [feat]: 소셜 로그인버튼 onClick event를 통해 로그인 수행
- `error` : 버그 수정
    - [error]: 소셜로그인시 발생하는 버그 수정
- `docs` : 문서 수정
    - [docs]: 소셜로그인 trouble 슈팅 과정 포스팅
- `refactor` : 코드 리펙토링 & 포멧팅 변경
    - [refactor]: 이미지 최적화를 통한 번들링 사이즈 최적화
- `test` : 테스트 코드, 리펙토링 테스트 코드 추가
    - [test]: button 컴포넌트 storybook 추가
- `chore` : 빌드 업무 수정, 패키지 매니저 수정
    - [chore]:  jest를 통한 테스트 빌드 추가
- `style` : UI에 변경사항이 있는 경우
    - [`style`]: 버튼 컴포넌트 UI변경
- `fix` : 파일 혹은 폴더명을 수정하거나 옮거나 삭제하는 경우 경우
    - [fix]: button 컴포넌트 파일 경로 수정

```

- eslint 설정했는데 잘 안먹히는 오류가 있는것 (진행에는 무리없음)

  - 안쓰는 import 구문 생략
  - import문 order 정리하기

- 논의 필요한것

  - 타입스크립트 정의 type? interface ? ( 우아한 타입스크립트 정의 따라가도 괜찮음)
  - 타입스크립트 파일을 어떻게 처리할 것인지 (import로 사용할 것인지), 컴포넌트 내부에 선언할 것인지

  - pr 템플릿 설정 ( 임의 설정 해둠 )
  - pr 규칙
