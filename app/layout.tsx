import type { Metadata } from "next";
import "./globals.css";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { getSession } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Tutor AI Expert Course | Victor Fitzjarrald",
  description: "Personal multi-user portal for the 78-week tutor-based AI expert curriculum.",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  let user = null;
  try {
    user = await getSession();
  } catch {
    user = null;
  }

  return (
    <html lang="en">
      <body className={`flex min-h-screen flex-col ${user ? "has-chrome" : ""}`}>
        {user ? <SiteHeader user={user} /> : null}
        <main className={`flex-1 ${user ? "container-app py-8" : ""}`}>{children}</main>
        {user ? <SiteFooter /> : null}
      </body>
    </html>
  );
}
