# Code Review Expert - 프로젝트 메모리

## 확인된 주요 이슈 (2026-02-23 초기 리뷰)

### Critical/High 이슈
1. **ESLint 오류**: `hooks/use-mobile.ts` - `useEffect` 내부에서 `setState` 직접 호출
   - 룰: `react-hooks/set-state-in-effect`
   - 해결책: `useState` 초기값을 lazy initializer로 처리하거나 초기값을 effect 외부에서 설정

2. **버전 불일치**: CLAUDE.md는 "Next.js 16.1.6"이라고 기재하지만 실제 package.json도 16.1.6 (이는 Next.js 최신 canary 버전임을 인지, v15 기반)

3. **Footer 서버 컴포넌트에서 `new Date()` 호출**: `footer.tsx`의 `currentYear` 는 빌드 시점 날짜로 고정되며, SSG 캐싱 시 연도가 갱신되지 않을 수 있음

4. **constants.ts 타입 명시 부재**: `FOOTER_LINKS`의 타입이 `as const`로만 선언되어 `FooterLinkGroup[]`과 실제 타입 정합성을 TypeScript가 검증하지 않음

5. **not-found.tsx metadata 없음**: SEO를 위한 `generateMetadata` 또는 `metadata` export 부재

### 패턴 및 컨벤션 관찰
- 아이콘 타입: `ComponentType<{ className?: string }>` 올바르게 사용됨 (types/index.ts)
- 클라이언트/서버 분리: 적절히 구분됨 (header=서버, theme-toggle/mobile-nav=클라이언트)
- `cn()` 유틸리티: footer.tsx에서 미사용 (단순 정적이므로 허용)
- `@/` 경로 별칭: 일관되게 사용됨
- Tailwind CSS v4: tailwind.config.js 없이 globals.css로 올바르게 설정
- shadcn/ui 컴포넌트: 올바른 named import 패턴 사용
- `as const` 패턴: constants.ts에서 올바르게 사용됨

### 접근성 이슈
- `theme-toggle.tsx`: aria-label 있음, 올바름
- `mobile-nav.tsx`: `sr-only` span 있음, 올바름
- 랜딩 페이지 hero h1: 스크린리더 친화적
- Tech Stack 카드 링크: aria-label 없어 링크 목적이 불명확할 수 있음

### 스타일 일관성
- `components/ui/sonner.tsx`, `sheet.tsx`: 세미콜론 없는 스타일 (shadcn 자동 생성)
- 나머지 파일: 세미콜론 있는 스타일 (프로젝트 작성 파일)
- 들여쓰기 2칸: 전체 일관됨

## 파일별 주요 특이사항
- `globals.css`: OKLCH 색상값 사용, Tailwind v4 CSS-first 방식, 수정 금지 완성 파일
- `tsconfig.json`: strict 모드 + `noImplicitAny` 활성화 (strict에 포함), 타입 체크 통과
- `next.config.ts`: 빈 설정 (최소화 원칙)
- `use-mobile.ts`: `"use client"` 선언은 훅 파일에 맞지 않음 (훅은 클라이언트에서만 호출되지만 파일 자체에 지시어 불필요)
