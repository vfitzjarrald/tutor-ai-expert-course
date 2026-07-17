"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { logoutAction } from "@/app/actions";
import type { SessionUser } from "@/lib/auth";
import {
  BookIcon,
  CalendarIcon,
  CheckIcon,
  ChevronDownIcon,
  GateIcon,
  LayersIcon,
  MoreIcon,
  SparkIcon,
  TargetIcon,
  UserIcon,
} from "@/components/Icons";

const primaryLinks = [
  { href: "/", label: "My AI Day", icon: SparkIcon },
  { href: "/schedule", label: "Schedule", icon: CalendarIcon },
  { href: "/placement", label: "Placement", icon: TargetIcon },
  { href: "/resources", label: "Resources", icon: BookIcon },
];

const moreLinks = [
  { href: "/checks", label: "Checks", icon: CheckIcon },
  { href: "/gates", label: "Gates", icon: GateIcon },
  { href: "/calendar", label: "Calendar", icon: CalendarIcon },
  { href: "/phases/1", label: "Phases", icon: LayersIcon, match: "/phases" },
];

function isActive(pathname: string, href: string, match?: string) {
  if (href === "/") return pathname === "/";
  const base = match ?? href;
  return pathname === base || pathname.startsWith(`${base}/`);
}

function NavDropdown({
  label,
  icon,
  active,
  children,
}: {
  label: string;
  icon: ReactNode;
  active?: boolean;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onPointerDown(event: MouseEvent) {
      if (!ref.current?.contains(event.target as Node)) setOpen(false);
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  return (
    <div className="nav-menu" ref={ref}>
      <button
        type="button"
        className={`${active || open ? "nav-icon-link nav-icon-link-active" : "nav-icon-link"}`}
        aria-expanded={open}
        aria-haspopup="menu"
        onClick={() => setOpen((value) => !value)}
      >
        {icon}
        <span className="hidden sm:inline">{label}</span>
        <ChevronDownIcon size={14} className={`transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open ? (
        <div className="nav-menu-panel" role="menu" onClick={() => setOpen(false)}>
          {children}
        </div>
      ) : null}
    </div>
  );
}

function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className="flex min-w-0 items-center gap-2.5 hover:opacity-90">
      <Image
        src="/vpf-icon.png"
        alt="VPF AI Expert"
        width={compact ? 36 : 40}
        height={compact ? 36 : 40}
        className="h-9 w-9 rounded-xl object-cover shadow-sm sm:h-10 sm:w-10"
        priority
      />
      <div className="min-w-0">
        <p className="truncate text-base font-semibold tracking-tight text-heading sm:text-lg">VPF AI Expert</p>
        <p className="hidden truncate text-[11px] text-text-muted sm:block">Recognized Expert Fast Track</p>
      </div>
    </Link>
  );
}

export function SiteHeader({ user }: { user: SessionUser | null }) {
  const pathname = usePathname();
  const moreActive = moreLinks.some((link) => isActive(pathname, link.href, link.match));
  const accountActive = pathname.startsWith("/account") || pathname.startsWith("/admin");
  const initials = (user?.displayName || user?.username || "U")
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <header className="fixed left-0 right-0 top-0 z-40 border-b border-border/80 bg-white/95 backdrop-blur">
      <div className="container-app flex h-[72px] items-center justify-between gap-3">
        <BrandMark />
        {user ? (
          <nav className="flex items-center gap-1 sm:gap-1.5">
            {primaryLinks.map((link) => {
              const Icon = link.icon;
              const active = isActive(pathname, link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={active ? "nav-icon-link nav-icon-link-active" : "nav-icon-link"}
                  title={link.label}
                >
                  <Icon size={16} />
                  <span className="hidden lg:inline">{link.label}</span>
                </Link>
              );
            })}

            <NavDropdown label="More" icon={<MoreIcon size={16} />} active={moreActive}>
              {moreLinks.map((link) => {
                const Icon = link.icon;
                const active = isActive(pathname, link.href, link.match);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={active ? "nav-menu-item nav-menu-item-active" : "nav-menu-item"}
                    role="menuitem"
                  >
                    <Icon size={16} />
                    {link.label}
                  </Link>
                );
              })}
            </NavDropdown>

            <NavDropdown
              label={user.displayName || user.username}
              icon={
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-[10px] font-bold text-white">
                  {initials}
                </span>
              }
              active={accountActive}
            >
              <Link
                href="/account"
                className={
                  pathname.startsWith("/account") ? "nav-menu-item nav-menu-item-active" : "nav-menu-item"
                }
                role="menuitem"
              >
                <UserIcon size={16} />
                Account
              </Link>
              {user.role === "admin" ? (
                <Link
                  href="/admin/users"
                  className={
                    pathname.startsWith("/admin") ? "nav-menu-item nav-menu-item-active" : "nav-menu-item"
                  }
                  role="menuitem"
                >
                  <LayersIcon size={16} />
                  Admin
                </Link>
              ) : null}
              <form action={logoutAction} className="border-t border-border pt-1 mt-1">
                <button type="submit" className="nav-menu-item text-text" role="menuitem">
                  Log out
                </button>
              </form>
            </NavDropdown>
          </nav>
        ) : null}
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-border bg-footer text-white">
      <div className="container-app flex flex-wrap items-center gap-4 py-8">
        <Image
          src="/vpf-icon.png"
          alt=""
          width={40}
          height={40}
          className="h-10 w-10 rounded-xl object-cover"
        />
        <div>
          <p className="text-sm font-semibold">VPF AI Expert</p>
          <p className="mt-1 text-sm text-white/70">Recognized Expert Fast Track · Personal learning portal</p>
        </div>
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
