// 네비게이션 링크 타입
export interface NavLink {
  label: string;
  href: string;
  external?: boolean;
}

// 푸터 링크 그룹 타입
export interface FooterLinkGroup {
  title: string;
  links: NavLink[];
}

// 기능 소개 카드 타입 (랜딩 페이지용)
export interface FeatureItem {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

// 기술 스택 아이템 타입
export interface TechStackItem {
  name: string;
  version: string;
  description: string;
  href: string;
}
