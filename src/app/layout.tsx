import type { Metadata } from "next";
import {
  Bricolage_Grotesque,
  IBM_Plex_Sans,
  IBM_Plex_Mono,
} from "next/font/google";
import "./globals.css";
import { ScrollTop } from "@/components/ScrollTop";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const plexSans = IBM_Plex_Sans({
  variable: "--font-plex-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://zalpan.com"),
  title: "Zalpan — Restaurant Operating System",
  description:
    "Zalpan is a restaurant operating system — billing, kitchen display, inventory, QR ordering, CRM, vendor management, analytics and AI forecasting in one connected platform.",
  openGraph: {
    title: "Zalpan — Restaurant Operating System",
    description:
      "Run your entire restaurant from one smart platform — billing, kitchen, inventory, QR ordering, CRM and AI forecasting.",
    type: "website",
    locale: "en_IN",
    siteName: "Zalpan",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${bricolage.variable} ${plexSans.variable} ${plexMono.variable} h-full`}
    >
      <body className="min-h-full">
        {children}
        <ScrollTop />
      </body>
    </html>
  );
}
