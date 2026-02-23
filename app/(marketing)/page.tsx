import type { Metadata } from "next";
import Link from "next/link";
import {
  Zap,
  Shield,
  Palette,
  Code2,
  ArrowRight,
  LayoutTemplate,
  Moon,
  Smartphone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { FeatureItem, TechStackItem } from "@/types";

// 피처 데이터
const FEATURES: FeatureItem[] = [
  {
    icon: Zap,
    title: "빠른 성능",
    description:
      "Next.js 15 App Router와 React 19 Server Components로 최적화된 성능",
  },
  {
    icon: Palette,
    title: "완성된 디자인 시스템",
    description:
      "shadcn/ui + Tailwind CSS v4로 일관된 UI 컴포넌트 즉시 사용 가능",
  },
  {
    icon: Moon,
    title: "다크 모드 기본 지원",
    description:
      "next-themes로 라이트/다크/시스템 테마를 자동으로 지원",
  },
  {
    icon: Smartphone,
    title: "반응형 디자인",
    description: "모바일 우선 설계로 모든 디바이스에서 완벽하게 동작",
  },
  {
    icon: Shield,
    title: "TypeScript Strict",
    description: "any 타입 금지, strict 모드로 타입 안전성 보장",
  },
  {
    icon: Code2,
    title: "개발자 경험",
    description:
      "ESLint, 경로 별칭(@/*), 일관된 코딩 컨벤션으로 빠른 개발",
  },
];

const TECH_STACK: TechStackItem[] = [
  {
    name: "Next.js",
    version: "v15",
    description: "App Router, RSC",
    href: "https://nextjs.org",
  },
  {
    name: "React",
    version: "v19",
    description: "Server Components",
    href: "https://react.dev",
  },
  {
    name: "TypeScript",
    version: "v5",
    description: "Strict Mode",
    href: "https://typescriptlang.org",
  },
  {
    name: "Tailwind CSS",
    version: "v4",
    description: "CSS-first Config",
    href: "https://tailwindcss.com",
  },
  {
    name: "shadcn/ui",
    version: "latest",
    description: "New York Style",
    href: "https://ui.shadcn.com",
  },
  {
    name: "next-themes",
    version: "latest",
    description: "Dark Mode",
    href: "https://github.com/pacocoursey/next-themes",
  },
];

export const metadata: Metadata = {
  title: "홈",
};

export default function LandingPage() {
  return (
    <>
      {/* Hero 섹션 */}
      <section className="relative flex flex-col items-center justify-center px-4 py-32 text-center">
        <Badge variant="secondary" className="mb-6">
          <LayoutTemplate className="mr-1 h-3 w-3" />
          Web Starter Kit
        </Badge>
        <h1 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          더 빠르게 웹 개발을
          <br />
          <span className="text-muted-foreground">시작하세요</span>
        </h1>
        <p className="mt-6 max-w-xl text-lg text-muted-foreground">
          Next.js 15, TypeScript, Tailwind CSS v4, shadcn/ui가 미리 설정된
          프로덕션 레디 스타터킷
        </p>
        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Button size="lg" asChild>
            <Link href="#features">
              시작하기 <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </Link>
          </Button>
        </div>
      </section>

      {/* Features 섹션 */}
      <section id="features" className="px-4 py-24 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight">핵심 기능</h2>
            <p className="mt-4 text-muted-foreground">
              바로 사용 가능한 기능들이 포함되어 있습니다
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((feature) => {
              const Icon = feature.icon;
              return (
                <Card key={feature.title} className="border-border/50">
                  <CardHeader>
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 mb-3">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <CardTitle className="text-lg">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Tech Stack 섹션 */}
      <section id="tech" className="px-4 py-24">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight">기술 스택</h2>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {TECH_STACK.map((tech) => (
              <Link
                key={tech.name}
                href={tech.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group"
              >
                <Card className="text-center transition-all hover:border-primary/50 hover:shadow-sm">
                  <CardContent className="pt-6 pb-4">
                    <Badge variant="outline" className="mb-2 text-xs">
                      {tech.version}
                    </Badge>
                    <p className="font-semibold text-sm">{tech.name}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {tech.description}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA 섹션 */}
      <section id="getting-started" className="px-4 py-24 bg-muted/30">
        <div className="container mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight">
            지금 바로 시작하세요
          </h2>
          <p className="mt-4 text-muted-foreground">
            이 스타터킷을 클론하고 바로 개발을 시작할 수 있습니다
          </p>
          <div className="mt-8 rounded-lg bg-muted p-4 font-mono text-sm text-left">
            <span className="text-muted-foreground">$ </span>
            git clone https://github.com/your/webapp-starterkit
          </div>
        </div>
      </section>
    </>
  );
}
