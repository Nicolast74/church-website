import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Gereja St. Agustinus & St. Yohanes",
  description: "Selamat datang di website resmi Gereja St. Agustinus & St. Yohanes. Temukan jadwal ibadah, kegiatan, dan informasi lainnya.",
  openGraph: {
    title: "Gereja St. Agustinus & St. Yohanes",
    description: "Selamat datang di website resmi Gereja St. Agustinus & St. Yohanes. Temukan jadwal ibadah, kegiatan, dan informasi lainnya.",
    url: "https://gereja.vercel.app",
    siteName: "Gereja St. Agustinus & St. Yohanes",
    images: [
      {
        url: "https://gereja.vercel.app/og-image.jpg",
        width: 1200,
        height: 630,
      },
    ],
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className={`${geistSans.variable} ${geistMono.variable} flex flex-col min-h-screen`}>
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
