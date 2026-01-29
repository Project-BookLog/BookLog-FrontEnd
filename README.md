# BookLog-FrontEnd

## 🛠 Tech Stack

* **Framework**: React (Vite)
* **Language**: TypeScript
* **Styling**: Tailwind CSS
* **State Management**: Zustand


<br><br>

## 🌱 Git Commit Convention

> **모든 작업은 이슈 생성 → 브랜치 생성 → 작업 → 커밋 순서로 진행한다.**
<br>

**작업 흐름**

1. 이슈 생성
2. 브랜치 생성

   * 브랜치명: `#이슈번호`
   * 예시: `#2`
3. 기능 개발
4. 커밋 메시지 작성 (이슈 번호 필수)
<br>

**커밋 메시지 구조**

커밋 메시지는 **제목(Subject)** 과 **본문(Body)** 으로 구성한다.
각 영역은 **빈 줄**로 구분한다.

```bash
[#issueNumber] type: subject
```

*예시*

```bash
[#2] feat: Add login feature
```
<br>



**Commit Type 규칙**

`type`은 해당 커밋의 **의도**를 명확히 드러내기 위해 사용한다.
태그는 **영문 소문자**, 제목은 **대문자로 시작**한다.

| Type      | Description       | 분류 |
| --------- | ----------------- | -- |
| feat      | 새로운 기능 추가         | 기능 |
| fix       | 버그 수정             | 기능 |
| design    | CSS / UI 변경       | 기능 |
| style     | 코드 포맷팅 (로직 변경 없음) | 개선 |
| refactor  | 기능 변경 없이 구조 개선    | 개선 |
| comment   | 주석 추가 및 수정        | 개선 |
| establish | 초기 환경 설정          | 기타 |
| docs      | 문서 수정             | 기타 |
| test      | 테스트 코드 추가         | 기타 |
| chore     | 빌드, 패키지 관리        | 기타 |
| remove    | 파일 삭제             | 기타 |
| rename    | 파일/폴더명 변경         | 기타 |
| !HOTFIX   | 긴급 버그 수정          | 기타 |
<br>


**Commit Subject 작성 규칙**

* **동사 원형**으로 시작
* **50자 이내**
* 문장 부호 사용 X
* 완전한 문장이 아닌 **개조식 표현**
* 한글 사용 시에도 **동사를 문장 앞에 배치**

*잘못된 예*

```
커밋 메시지 템플릿 추가
```

*올바른 예*

```
추가 - 커밋 메시지 템플릿
```
<br>


**커밋 제목에 사용되는 동사 예시**

| Verb      | 의미              |
| --------- | --------------- |
| Fix       | 잘못된 동작 수정       |
| Add       | 코드 / 기능 / 문서 추가 |
| Remove    | 코드 삭제           |
| Update    | 기존 기능 보완        |
| Simplify  | 단순한 리팩토링        |
| Refactor  | 구조 개선           |
| Improve   | 성능, 가독성 개선      |
| Implement | 기능 구현 완료        |
| Correct   | 문법, 타입 오류 수정    |


