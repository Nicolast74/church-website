import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display, Permanent_Marker } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/ThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const permanentMarker = Permanent_Marker({
  weight: '400',
  variable: "--font-permanent-marker",
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  title: "Gereja St. Agustinus & St. Yohanes",
  description: "Selamat datang di website resmi Gereja St. Agustinus & St. Yohanes. Temukan jadwal ibadah, kegiatan, dan informasi lainnya.",
  openGraph: {
    title: "Gereja St. Agustinus & St. Yohanes",
    description: "Selamat datang di website resmi Gereja St. Agustinus & St. Yohanes. Temukan jadwal ibadah, kegiatan, dan informasi lainnya.",
    url: "https://gereja.vercel.app",
    siteName: "Gereja St. Agustinus & St. Yohanes",
    images: [{ url: "https://gereja.vercel.app/og-image.jpg", width: 1200, height: 630 }],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gereja St. Agustinus & St. Yohanes",
    description: "Selamat datang di website resmi Gereja St. Agustinus & St. Yohanes. Temukan jadwal ibadah, kegiatan, dan informasi lainnya.",
    images: ["https://gereja.vercel.app/og-image.jpg"],
  },
};

import { NotificationManager } from "@/components/notifications/NotificationManager";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} ${permanentMarker.variable} antialiased font-sans flex flex-col min-h-screen`}>
        <ThemeProvider>
          <NotificationManager />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
