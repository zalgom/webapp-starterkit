"use client";

// 동적 현재 연도를 클라이언트 측에서 렌더링
export function CopyrightYear() {
  return <>{new Date().getFullYear()}</>;
}
