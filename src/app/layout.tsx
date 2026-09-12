import type { Metadata, Viewport } from "next";

import { readingComfortInitScript } from "@/features/accessibility/preferences";

import "./globals.css";

export const metadata: Metadata = {
  applicationName: "ArcadiA",
  title: {
    default: "ArcadiA",
    template: "%s · ArcadiA",
  },
  description:
    "Une plateforme pédagogique simple pour accéder aux cours et activités de sa classe.",
};

export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: "#090b20",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr">
      <body>
        {/*
          Réglages de confort de lecture appliqués avant le premier affichage,
          pour éviter que la page apparaisse en petit ou en sombre puis change.
        */}
        <script dangerouslySetInnerHTML={{ __html: readingComfortInitScript }} />
        {children}
      </body>
    </html>
  );
}
