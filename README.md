# 🥪 샌드위치 만들기 — React 단일 컴포넌트 데모

간단한 샌드위치 조립 웹앱. 왼쪽 냉장고에서 재료를 클릭하면 중앙 접시에 레이어로 쌓인다. 레이어 클릭 시 제거. 되돌리기·초기화·랜덤 지원.

---

## 1) 빠른 실행

### 요구 사항

* Node.js ≥ 18
* React 18 프로젝트

### 설치

```bash
# 기존 React 앱이 없다면
npx create-react-app sandwich-app --template typescript
cd sandwich-app
```

### 파일 추가

* 아래 컴포넌트를 `src/SandwichMaker.tsx`로 저장
  (질문에 포함된 코드 그대로 사용)

### 라우팅/렌더링

```tsx
// src/App.tsx
import SandwichMaker from './SandwichMaker';
export default function App() {
  return <SandwichMaker />;
}
```

### 실행

```bash
npm start
```

### 빌드

```bash
npm run build
```

---

## 2) 사용법

* 좌측 **냉장고**: 재료 버튼 클릭 → 중앙 **접시**에 레이어 추가
* 중앙 **레이어**: 레이어 클릭 → 해당 레이어 제거
* 상단 버튼

    * **되돌리기**: 직전 상태로 복귀
    * **초기화**: 모든 레이어 제거
    * **랜덤**: 3~7개 재료를 무작위로 쌓기

---

## 3) 기능 개요

* **INGREDIENTS**: 재료 메타데이터 배열

  ```ts
  const INGREDIENTS = [
    { id: "bread", name: "빵", color: "#D4A574", emoji: "🍞" },
    // ...
  ];
  ```
* **상태 관리**

    * `sandwich: any[]` 현재 쌓인 레이어
    * `history: any[][]` 되돌리기 히스토리
* **핵심 동작**

    * `addIngredient(ingredient)` 재료 추가
    * `removeIngredient(index)` 특정 인덱스 제거
    * `undo()` 직전 상태 복구
    * `reset()` 전체 초기화
    * `randomSandwich()` 무작위 레이어 생성
* **요약 패널**

    * `ingredientCounts`로 재료별 개수 집계

---

## 4) 컴포넌트 구조

* `IngredientButton`: 좌측 냉장고 버튼 UI
* `SandwichLayer`: 중앙 접시의 레이어 1개

    * 절대배치. `bottom: 20 + index*25px`
* `SandwichMaker`(default export): 페이지 전체 레이아웃

---

## 5) 스타일·레이아웃

* 모든 스타일은 **인라인**. 외부 CSS 불필요
* 접시: 회색 타원(`div`)을 바닥에 고정
* 레이어: 고정 폭(200px) 바 형태. 색상과 이모지+이름 표시
* 버튼: 간단한 hover/active 트랜지션

---

## 6) 커스터마이징 포인트

* 레이어 간격: `SandwichLayer`의 `bottom: 20 + index*25px` 조정
* 레이어 크기: `width: '200px'`, `height: '20px'` 조정
* 재료 추가: `INGREDIENTS`에 항목 추가
* 테마: 상단 헤더 그라디언트, 좌우 패널 배경 색상 변경
* 랜덤 개수: `Math.floor(Math.random()*5)+3` 범위 수정

---

## 7) 접근성

* 레이어 `title="클릭하여 제거"` 제공
* 버튼은 텍스트와 이모지 동시 노출
* 키보드 지원이 필요하면 `tabIndex`와 `onKeyDown`을 `SandwichLayer`에 추가

---

## 8) 테스트 아이디어

* **추가/제거**: 재료 클릭 후 레이어 수 증가·감소 확인
* **되돌리기**: 연속 작업 후 `undo()`가 직전 상태를 정확히 복원하는지
* **랜덤**: 3~7개 범위 확인
* **요약**: 동일 재료 반복 추가 시 카운트 증가 검증

---

## 9) 문제 해결

* 앱이 뜨지 않음: `npm start` 로그 확인. 포트 충돌 시 3000 포트 점유 프로세스 종료
* 화면 비정상 배치: 중앙 컨테이너 `position: 'relative'` 유지 여부 점검
* 되돌리기 불가: `history`가 비어 있으면 버튼이 비활성화됨. 상태 저장(`saveState`) 호출 위치 확인

---