# CLAUDE.md

이 파일은 이 저장소에서 코드 작업할 때 Claude Code(claude.ai/code)에 가이드를 제공합니다.

## 프로젝트 개요

**Web Starter Kit**은 TypeScript, Tailwind CSS v4, shadcn/ui 컴포넌트가 미리 설정된 프로덕션 레디 Next.js 스타터킷입니다. 랜딩 페이지 구조, 다크/라이트 모드 지원, 반응형 디자인 및 빠른 웹 개발을 위한 모든 필수 도구를 제공합니다.

## 기술 스택

| 기술 | 버전 | 목적 |
|-----------|---------|---------|
| Next.js | 16.1.6 (App Router) | 서버 컴포넌트 지원 React 프레임워크 |
| React | 19.2.3 | RSC 지원 UI 라이브러리 |
| TypeScript | 5 | 타입 안전성 (strict 모드, `any` 금지) |
| Tailwind CSS | v4 | CSS 유틸리티 우선 프레임워크 (config 없음) |
| shadcn/ui | latest | Pre-built UI 컴포넌트 라이브러리 (new-york 스타일) |
| next-themes | 0.4.6 | 다크/라이트 모드 테마 |
| lucide-react | 0.575.0 | 아이콘 라이브러리 |
| Sonner | 2.0.7 | 토스트 알림 |

## 프로젝트 구조

```
app/
├── (marketing)/              # 라우트 그룹: 랜딩 페이지용 격리 레이아웃
│   ├── layout.tsx           # Header + Footer 레이아웃
│   └── page.tsx             # 랜딩 페이지 컴포넌트
├── layout.tsx               # 루트 레이아웃 (ThemeProvider + Toaster + 폰트)
├── globals.css              # 글로벌 스타일 (수정 금지 - 완성됨)
└── not-found.tsx            # 404 에러 페이지

components/
├── ui/                      # shadcn/ui 컴포넌트 (자동생성)
│   ├── button.tsx, badge.tsx, card.tsx, 등
│   └── sonner.tsx           # 토스트 컴포넌트
├── layout/                  # 레이아웃 컴포넌트
│   ├── header.tsx           # Sticky 헤더 (테마 토글 포함)
│   ├── footer.tsx           # 링크 그룹이 포함된 푸터
│   ├── theme-toggle.tsx     # 다크/라이트 모드 토글 버튼
│   └── mobile-nav.tsx       # 모바일 네비게이션 메뉴
└── providers/
    └── theme-provider.tsx   # next-themes 래퍼

lib/
├── constants.ts             # SITE_CONFIG, NAV_LINKS, FOOTER_LINKS
└── utils.ts                 # cn() 함수 (clsx + tailwind-merge)

hooks/
└── use-mobile.ts            # 반응형 breakpoint 감지

types/
└── index.ts                 # 공유 TypeScript 인터페이스

public/                       # 정적 자산
```

## 공통 명령어

### 개발

```bash
# 개발 서버 시작 (http://localhost:3000)
npm run dev

# ESLint 실행
npm run lint

# 프로덕션 빌드
npm run build

# 프로덕션 서버 시작
npm start
```

### 컴포넌트 추가

```bash
# CLI를 통해 shadcn/ui 컴포넌트 추가
npx shadcn add button
npx shadcn add card
```

새 컴포넌트는 shadcn 패턴을 따라 `components/ui/`에 설정합니다.

## 핵심 아키텍처 결정사항

### 1. 격리된 레이아웃을 가진 라우트 그룹
- Next.js 라우트 그룹 `(marketing)`을 사용하여 랜딩 페이지 레이아웃 (Header + Footer) 격리
- 루트 레이아웃 (`app/layout.tsx`)은 전역 프로바이더 처리 (ThemeProvider, Toaster)
- 중복 없이 다양한 섹션에 다른 레이아웃 적용 가능

### 2. next-themes 설정
- **설정**: `attribute="class"` (`<html>` 요소에 클래스 추가)
- **CSS**: `app/globals.css`의 `.dark` 선택자가 다크 모드 스타일 처리
- **루트 HTML**: `suppressHydrationWarning` 필수 (next-themes 필요)
- **테마 컨텍스트 없음**: `useTheme()` 훅으로 테마 접근

### 3. Tailwind CSS v4 (Config 없음)
- 설정은 `app/globals.css`에 CSS 레이어로 존재
- `tailwind.config.js` 파일 불필요
- `components.json`은 shadcn/ui 설정에만 사용 (Tailwind config 아님)

### 4. TypeScript Strict 모드
- `tsconfig.json`에서 `strict: true`
- **`any` 타입 금지**: 모든 값에 명시적 타입 필요
- 모든 React 컴포넌트는 인터페이스 또는 인라인 타입으로 props 타입 지정
- lucide-react의 아이콘 컴포넌트는 `ComponentType<{ className?: string }>` 사용

### 5. 서버/클라이언트 컴포넌트 분리
- 기본적으로 컴포넌트는 Server Component (`"use client"` 없음)
- 필요한 경우에만 `"use client"` 추가 (훅 사용, 인터랙티브 기능)
- `header.tsx`: 서버 컴포넌트 (정적 레이아웃)
- `theme-toggle.tsx`: 클라이언트 컴포넌트 (`useTheme()` 훅 사용)
- `mobile-nav.tsx`: 클라이언트 컴포넌트 (Sheet + 반응형 상태 사용)

### 6. 경로 별칭
- `@/*`는 루트 디렉토리로 매핑 (`tsconfig.json`에 설정됨)
- 모든 import에 별칭 사용: `@/components`, `@/lib`, `@/hooks`, `@/types`

## 중요 파일 및 패턴

### 상수 설정
**파일**: `lib/constants.ts`
- `SITE_CONFIG`: 메타데이터 (이름, 설명, URL, og:image)
- `NAV_LINKS`: 헤더 네비게이션 항목
- `FOOTER_LINKS`: 카테고리별 푸터 링크 그룹
- 모두 `as const`로 타입 추론되는 `const`로 export

### UI 컴포넌트 사용 패턴
```tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function FeatureCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>제목</CardTitle>
        <CardDescription>설명</CardDescription>
      </CardHeader>
      <CardContent>내용</CardContent>
    </Card>
  );
}
```

### 타입 정의 패턴
**파일**: `types/index.ts`
```tsx
export interface FeatureItem {
  icon: ComponentType<{ className?: string }>;
  title: string;
  description: string;
}
```

### 반응형 디자인
- 모바일 우선 접근 (기본 스타일은 모바일, 더 큰 화면을 위해 breakpoint 추가)
- 주요 breakpoint: `sm:` (640px), `md:` (768px), `lg:` (1024px)
- 예: `hidden md:flex` (모바일 숨김, md 이상 화면에서 flex)
- JavaScript 기반 breakpoint 로직은 `use-mobile` 훅 사용

## 개발 워크플로우

### 새 페이지 추가
1. `app/page-name/page.tsx`에 파일 생성
2. SEO를 위해 metadata export 추가
3. 일관성을 위해 `@/components/ui`의 컴포넌트 사용
4. Props에 대해 `@/types`에서 타입 import

### 네비게이션 링크 추가
1. `lib/constants.ts`의 `NAV_LINKS` 수정
2. 헤더에서 자동으로 새 링크 렌더링

### 컴포넌트 스타일링
- Tailwind CSS 유틸리티 클래스만 사용
- 컴포넌트 레벨 스타일의 경우 `@/lib/utils.ts`의 `cn()` 유틸리티 사용
- 예: `<div className={cn("base-classes", isActive && "active-classes")}>`

### 테마
- 색상 토큰은 `app/globals.css`에 CSS 변수로 정의됨
- 의미론적 클래스 사용: `text-foreground`, `bg-background`, `border-border`, `bg-muted`
- 다크 모드: `.dark` 클래스에 따라 CSS 변수 자동 전환

## ESLint 설정

- `eslint-config-next` (core-web-vitals 및 TypeScript 지원 포함) 사용
- 설정 파일: `eslint.config.mjs` (ESLint flat config 형식)
- 실행: `npm run lint`
- 미리 설정된 무시 패턴: `.next/`, `out/`, `build/`, `next-env.d.ts`

## 배포

- Vercel에서 빌드 및 테스트됨 (Next.js 개발사)
- 프로덕션 빌드 검증은 `npm run build` 사용
- 현재 기본 기능에 필요한 환경 변수 없음
