import type { Metadata } from "next";
import "./globals.css";
import { AchievementCelebration } from "@/components/AchievementCelebration";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { getPendingCelebrations, syncUserAchievements } from "@/lib/achievements";
import { getSession } from "@/lib/auth";
import { getUserLearningTrack } from "@/lib/users";

export const metadata: Metadata = {
  title: "AI Expert",
  description: "Recognized Expert Fast Track — personal multi-user portal for the tutor-based AI expert curriculum.",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  let user = null;
  let pending: Array<{ achievementId: string }> = [];
  let learningTrack = null as Awaited<ReturnType<typeof getUserLearningTrack>>;
  try {
    user = await getSession();
    if (user) {
      await syncUserAchievements(user.id);
      pending = (await getPendingCelebrations(user.id)).map((row) => ({
        achievementId: row.achievementId,
      }));
      learningTrack = await getUserLearningTrack(user.id);
    }
  } catch {
    user = null;
    pending = [];
    learningTrack = null;
  }

  return (
    <html lang="en">
      <body className={`flex min-h-screen flex-col ${user ? "has-chrome" : ""}`}>
        {user ? <SiteHeader user={user} learningTrack={learningTrack} /> : null}
        <main className={`flex-1 ${user ? "container-app py-8" : ""}`}>{children}</main>
        {user ? <SiteFooter /> : null}
        {user ? <AchievementCelebration pending={pending} /> : null}
      </body>
    </html>
  );
}
