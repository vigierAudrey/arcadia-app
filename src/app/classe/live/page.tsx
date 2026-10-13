import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { connection } from "next/server";

import { BrandMark } from "@/components/brand-mark";
import { ReadingComfortBar } from "@/features/accessibility/reading-comfort-bar";
import { requireClassSessionPage } from "@/server/class-auth/require-class-session";
import { listLiveSessionsForClassroom } from "@/server/live-sessions/store";

import { leaveClassAction } from "../leave-action";
import { LiveJoinClient } from "./live-join-client";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Session live | ArcadiA",
  robots: { index: false, follow: false },
};

export default async function ClassLivePage() {
  await connection();
  const { classroomId } = await requireClassSessionPage();
  const activeLiveSession = listLiveSessionsForClassroom(classroomId)[0] ?? null;

  if (!activeLiveSession) {
    redirect("/classe");
  }

  return (
    <div className={styles.pageShell}>
      <header className={styles.header}>
        <BrandMark context="Session live" />
        <div className={styles.headerTools}>
          <ReadingComfortBar />
          <form action={leaveClassAction}>
            <button className={styles.leaveButton} type="submit">
              Quitter
            </button>
          </form>
        </div>
      </header>

      <main className={styles.main}>
        <nav className={styles.breadcrumbs} aria-label="Fil d'Ariane">
          <Link href="/classe">Ma classe</Link>
          <span aria-hidden="true">/</span>
          <strong>Session live</strong>
        </nav>

        <LiveJoinClient />
      </main>
    </div>
  );
}
