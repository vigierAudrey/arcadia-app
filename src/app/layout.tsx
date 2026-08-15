import type { Metadata, Viewport } from "next";

import "./globals.css";

export const metadata: Metadata = {
  applicationName: "PSE Interactif",
  title: {
    default: "PSE Interactif",
    template: "%s · PSE Interactif",
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
      <body>{children}</body>
    </html>
  );
}
