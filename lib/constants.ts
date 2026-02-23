import type { NavLink, FooterLinkGroup } from "@/types";

// 사이트 기본 정보
export const SITE_CONFIG = {
  name: "StarterKit",
  description: "Next.js 15 + TypeScript + Tailwind CSS + shadcn/ui 스타터킷",
  url: "https://starterkit.example.com",
  ogImage: "/og.png",
} as const;

// 헤더 네비게이션 링크
export const NAV_LINKS = [
  { label: "소개", href: "#features" },
  { label: "기술 스택", href: "#tech" },
  { label: "시작하기", href: "#getting-started" },
] as const satisfies readonly NavLink[];

// 푸터 링크 그룹
export const FOOTER_LINKS = [
  {
    title: "리소스",
    links: [
      { label: "Next.js 문서", href: "https://nextjs.org/docs", external: true },
      { label: "shadcn/ui", href: "https://ui.shadcn.com", external: true },
      { label: "Tailwind CSS", href: "https://tailwindcss.com", external: true },
    ],
  },
  {
    title: "커뮤니티",
    links: [
      { label: "GitHub", href: "https://github.com", external: true },
      { label: "Twitter", href: "https://twitter.com", external: true },
      { label: "Discord", href: "https://discord.com", external: true },
    ],
  },
] as const satisfies readonly FooterLinkGroup[];
