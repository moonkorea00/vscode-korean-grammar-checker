# Korean Grammar Checker for visual studio code

`Korean Grammar Checker`는 이용자가 작성한 단어 또는 문장을 한글 맞춤법에 맞도록 교정하는 확장 프로그램입니다.

> For English Click [Here](https://github.com/moonkorea00/vscode-korean-grammar-checker/blob/main/README-eng.md)

<br>

## TL;DR

  - 검사 : `Cmd+shift+1` (macOS) , `Ctrl+shift+1` (Windows)
  - 수정 : `Cmd+shift+2` (macOS) , `Ctrl+shift+2` (Windows)
  
<br>

## 설치

- [Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=moonkorea.vscode-korean-grammar-checker)
- `vscode-보기-확장`(Cmd+shift+X / Ctrl+shift+X)에서 `Korean Grammar Checker` 검색 후 설치

<br>

## Demo 및 사용법

> 전체 검사

![전체 검사](https://user-images.githubusercontent.com/78708082/223107737-845b9905-cd55-4ecb-b223-ca39176e3e69.gif)

<br>

> 선택 검사

![선택 검사](https://user-images.githubusercontent.com/78708082/223107750-72ac458c-2cc8-4dd4-b705-0d62ec612622.gif)

<br>

> 수정

![수정](https://user-images.githubusercontent.com/78708082/223957309-72f721ee-4518-4570-aabe-5799b22d9d98.gif)

<br>

- [ ] 사용법

|    명령   |       단축키       | 명령 팔레트 |
| :---: | :------------: | ---------------------- |
|    검사    | `Cmd+shift+1` / `Ctrl+shift+1` | `보기` &nbsp; &#8594; &nbsp; `명령 팔레트` &nbsp; &#8594; &nbsp; `Korean Grammar Checker: Inspect current document` |
|    수정    | `Cmd+shift+2` / `Ctrl+shift+2` | `보기` &nbsp; &#8594; &nbsp; `명령 팔레트` &nbsp; &#8594; &nbsp; `Korean Grammar Checker: Apply Corrections` |

<br>

- [ ] 교정 결과 범례

|  글자 색 | 교정 결과 |
| --- | ------------------------------------------- |
|기본| 오류 없음 |
| ![Ellipse 4](https://user-images.githubusercontent.com/78708082/223116519-8345c968-6e32-493e-9e03-e28314050eaa.png)| 맞춤법|
|![Ellipse 7](https://user-images.githubusercontent.com/78708082/223115735-0ff2ed39-b4f1-4577-bef2-ebfc84619d28.png)| 띄어쓰기 |
|![Ellipse 6](https://user-images.githubusercontent.com/78708082/223116416-bd0576b1-4bb9-491e-b353-0fcaa30c1fe9.png)| 표준어 의심  |
|![Ellipse 5](https://user-images.githubusercontent.com/78708082/223116545-4bcec746-c6cd-441f-aa5e-34a50946dad0.png)| 통계적 교정   |

<br>

- [ ] 단축키 설정

- `보기-명령 팔레트-바로 가기 키`(Cmd+K+S / Ctrl+K+S)	&nbsp; &#8594; &nbsp; `korean grammar checker` 검색 	&nbsp; &#8594; 	&nbsp; 원하는 키 설정

![ezgif com-video-to-gif](https://user-images.githubusercontent.com/78708082/223122733-a909c76c-2814-473b-b74c-5ce2682992f5.gif)

<br>

## Issues 및 제한 사항

- 본 확장 프로그램은 최대 500자까지 교정합니다. 글자 제한 초과 시 500자에 대한 교정 결과를 반환하고 vscode 알림창을 출력합니다.

<br>

## 버전

### 1.0.0

Initial release

### 1.1.0

검사 결과 수정 명령 추가

<br>

> Korean Grammar Checker는 [네이버 맞춤법 검사기](https://search.naver.com/search.naver?sm=tab_hty.top&where=nexearch&query=%EB%A7%9E%EC%B6%A4%EB%B2%95+%EA%B2%80%EC%82%AC%EA%B8%B0&oquery=%EB%A7%9E%EC%B6%A4%EB%B2%95+%EA%B2%80%EC%82%AC%EA%B8%B0&tqi=isSlWwprvmZssbW1E2Nssssss0l-180665)의 api를 사용합니다. 모든 저작권은 보유자인 네이버(주)에게 있습니다. 
