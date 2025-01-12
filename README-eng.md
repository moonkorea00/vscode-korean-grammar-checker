# Korean Grammar Checker for visual studio code

`Korean Grammar Checker` is a VScode extension that corrects words or sentences based on standard Korean grammar.

> For Korean click [here](https://github.com/moonkorea00/vscode-korean-grammar-checker#readme)

## TL;DR

- Check Corrections : `Cmd+shift+1` , (macOS), `Ctrl+shift+1` (Windows)
- Apply Corrections : `Cmd+shift+2` , (macOS), `Ctrl+shift+2` (Windows)

<br>

## Installation

- [Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=moonkorea.vscode-korean-grammar-checker)
- `vscode-View-Extensions`(Cmd+Shift+X / Ctrl+Shift+X) &nbsp; &#8594; &nbsp; `Korean Grammar Checker`

<br>

## Demo and Usage

> Inspect Entire Document

![전체 검사](https://user-images.githubusercontent.com/78708082/223107737-845b9905-cd55-4ecb-b223-ca39176e3e69.gif)

> Inspect Selected text

![선택 검사](https://user-images.githubusercontent.com/78708082/223107750-72ac458c-2cc8-4dd4-b705-0d62ec612622.gif)

> Apply Corrections

![수정](https://user-images.githubusercontent.com/78708082/223957309-72f721ee-4518-4570-aabe-5799b22d9d98.gif)

<br>

|    Command   |       Keyboard Shortcut(default)       | Command Palette |
| :---: | :------------: | ---------------------- |
|    Inspect Corrections    | `Cmd+shift+1` / `Ctrl+shift+1` | `View` &nbsp; &#8594;`Command Palette`&nbsp; &#8594; 	&nbsp; `Korean Grammar Checker: Inspect current document` |
|    Apply Corrections    | `Cmd+shift+2` / `Ctrl+shift+2` | `View` &nbsp; &#8594;`Command Palette` &nbsp; &#8594; 	&nbsp; `Korean Grammar Checker: Apply Corrections` |

<br>

- [ ] Legend

|  Word Color | Correction Result |
| --- | ------------------------------------------- |
|default| No Error |
| ![Ellipse 4](https://user-images.githubusercontent.com/78708082/223116519-8345c968-6e32-493e-9e03-e28314050eaa.png)| Grammar Error|
|![Ellipse 7](https://user-images.githubusercontent.com/78708082/223115735-0ff2ed39-b4f1-4577-bef2-ebfc84619d28.png)| Spacing Error |
|![Ellipse 6](https://user-images.githubusercontent.com/78708082/223116416-bd0576b1-4bb9-491e-b353-0fcaa30c1fe9.png)| Standard Language Error  |
|![Ellipse 5](https://user-images.githubusercontent.com/78708082/223116545-4bcec746-c6cd-441f-aa5e-34a50946dad0.png)| Potential Error   |

<br>

- [ ] Customize Keyboard Shortcuts

- `View-Command Palette-Preferences : Open Keyboard Shortcuts`(Cmd+K+S / Ctrl+K+S)	&nbsp; &#8594; &nbsp; search for `Korean grammar checker`	&nbsp; &#8594; 	&nbsp; customize keyboard shortcut

![ezgif com-video-to-gif](https://user-images.githubusercontent.com/78708082/223122733-a909c76c-2814-473b-b74c-5ce2682992f5.gif)

<br>

## Issues and Limitations

<br>

## Release Notes

### 1.0.0

Initial release

### 1.1.0

Added: New command to apply corrections to current document

### 1.1.1

Fixed : Entire selected text is replaced with correction response regardless of max word count(500)([#5](https://github.com/moonkorea00/vscode-korean-grammar-checker/issues/5))

### 1.2.0

Added : resolved character limit

### 1.2.2

Fixed : resolved api authentication error

### 1.2.3

Fixed : renew key on authentication error

### 1.2.5

Fixed : rename css class to match API response

<br>

> Korean Grammar Checker uses [Naver's Grammar Checker](https://search.naver.com/search.naver?sm=tab_hty.top&where=nexearch&query=%EB%A7%9E%EC%B6%A4%EB%B2%95+%EA%B2%80%EC%82%AC%EA%B8%B0&oquery=%EB%A7%9E%EC%B6%A4%EB%B2%95+%EA%B2%80%EC%82%AC%EA%B8%B0&tqi=isSlWwprvmZssbW1E2Nssssss0l-180665). The copyright holder, Naver, reserves all the rights.
