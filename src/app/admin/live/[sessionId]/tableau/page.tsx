import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { connection } from "next/server";
import { z } from "zod";

import { BrandMark } from "@/components/brand-mark";
import { requireAdminPage } from "@/server/auth/require-admin";
import { getLiveSession } from "@/server/live-sessions/store";

import { LiveBoardClient } from "./tableau-client";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Tableau live | ArcadiA",
  robots: { index: false, follow: false },
};

const sessionIdSchema = z.uuid();

export default async function LiveBoardPage({
  params,
}: {
  params: Promise<{ sessionId: string }>;
}) {
  await connection();
  await requireAdminPage();
  const { sessionId } = await params;
  const parsed = sessionIdSchema.safeParse(sessionId);
  if (!parsed.success) notFound();

  const session = getLiveSession(parsed.data);
  if (!session) notFound();

  return (
    <div className={styles.boardShell}>
      <header className={styles.boardHeader}>
        <BrandMark context="Tableau live" />
        <Link href="/admin">Retour admin</Link>
      </header>

      <main className={styles.boardMain}>
        <section className={styles.pinPanel} aria-labelledby="pin-title">
          <p className={styles.eyebrow}>Session en direct</p>
          <h1 id="pin-title">PIN {session.pin}</h1>
          <p>Les élèves rejoignent depuis leur espace classe.</p>
        </section>

        <LiveBoardClient
          initialAnswerSummary={{
            answeredCount: session.answerSummary.answeredCount,
            totalParticipants: session.answerSummary.totalParticipants,
          }}
          expiresAt={session.expiresAt.toISOString()}
          initialParticipants={session.participants.map((participant) => ({
            id: participant.id,
            avatarId: participant.avatarId,
            displayName: participant.displayName,
            score: participant.score,
          }))}
          initialRevealedAnswer={
            session.revealedAnswer
              ? {
                  ...session.revealedAnswer,
                  revealedAt: session.revealedAnswer.revealedAt.toISOString(),
                }
              : null
          }
          initialQuestion={
            session.currentQuestion
              ? {
                  ...session.currentQuestion,
                  sentAt: session.currentQuestion.sentAt.toISOString(),
                }
              : null
          }
          sessionId={session.id}
        />
      </main>
    </div>
  );
}
