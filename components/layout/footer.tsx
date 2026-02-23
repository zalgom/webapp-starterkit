import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { SITE_CONFIG, FOOTER_LINKS } from "@/lib/constants";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-border bg-background">
      <div className="container mx-auto max-w-6xl px-4 py-12">
        {/* 상단: 로고 + 링크 그룹 */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* 브랜드 섹션 */}
          <div className="space-y-3">
            <p className="font-bold text-foreground">{SITE_CONFIG.name}</p>
            <p className="text-sm text-muted-foreground">
              {SITE_CONFIG.description}
            </p>
          </div>

          {/* 링크 그룹 */}
          {FOOTER_LINKS.map((group) => (
            <div key={group.title} className="space-y-3">
              <p className="text-sm font-semibold text-foreground">
                {group.title}
              </p>
              <ul className="space-y-2">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                      target={link.external ? "_blank" : undefined}
                      rel={
                        link.external ? "noopener noreferrer" : undefined
                      }
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="my-8" />

        {/* 하단: 저작권 */}
        <p className="text-center text-sm text-muted-foreground">
          © {currentYear} {SITE_CONFIG.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
