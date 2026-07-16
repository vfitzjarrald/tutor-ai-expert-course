"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { logoutAction } from "@/app/actions";
import type { SessionUser } from "@/lib/auth";

const links = [
  { href: "/", label: "Today" },
  { href: "/calendar", label: "Calendar" },
  { href: "/schedule", label: "Schedule" },
  { href: "/checks", label: "Checks" },
  { href: "/resources", label: "Resources" },
  { href: "/gates", label: "Gates" },
];

export function SiteHeader({ user }: { user: SessionUser | null }) {
  const pathname = usePathname();
  const phaseActive = pathname.startsWith("/phases");

  return (
    <header className="fixed left-0 right-0 top-0 z-40 border-b border-border bg-white">
      <div className="container-app flex h-20 items-center justify-between gap-4">
        <div className="min-w-0">
          <Link href="/" className="block truncate text-lg font-semibold text-heading hover:text-primary">
            Victor Fitzjarrald
          </Link>
          <p className="truncate text-xs text-text-muted">Tutor AI Expert Course</p>
        </div>
        {user ? (
          <nav className="flex max-w-[70%] flex-wrap items-center justify-end gap-x-3 gap-y-1 sm:gap-x-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={
                  link.href === "/"
                    ? pathname === "/"
                      ? "nav-link nav-link-active"
                      : "nav-link"
                    : pathname === link.href || pathname.startsWith(`${link.href}/`)
                      ? "nav-link nav-link-active"
                      : "nav-link"
                }
              >
                {link.label}
              </Link>
            ))}
            <Link href="/phases/1" className={phaseActive ? "nav-link nav-link-active" : "nav-link"}>
              Phases
            </Link>
            {user.role === "admin" ? (
              <Link
                href="/admin/users"
                className={pathname.startsWith("/admin") ? "nav-link nav-link-active" : "nav-link"}
              >
                Admin
              </Link>
            ) : null}
            <span className="hidden text-xs text-text-muted lg:inline">{user.displayName || user.username}</span>
            <form action={logoutAction}>
              <button type="submit" className="btn-secondary header-action-btn">
                Log out
              </button>
            </form>
          </nav>
        ) : null}
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-border bg-footer text-white">
      <div className="container-app py-8">
        <p className="text-sm font-semibold">Victor Fitzjarrald</p>
        <p className="mt-1 text-sm text-white/70">Tutor-Based AI Expert Course · Personal learning portal</p>
      </div>
      <div className="bg-footer-bottom py-3">
        <div className="container-app text-xs text-white/50">aicourse.victorfitzjarrald.com</div>
      </div>
    </footer>
  );
}

export function PageHero({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="page-hero mb-8">
      <div className="page-hero-inner">
        <div className="page-hero-content">
          {eyebrow ? <p className="page-hero-step">{eyebrow}</p> : null}
          <h1 className="page-hero-title">{title}</h1>
          {description ? <p className="page-hero-desc">{description}</p> : null}
        </div>
      </div>
    </div>
  );
}
