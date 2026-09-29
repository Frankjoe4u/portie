import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import AuthProvider from "@/components/AuthProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "frankjoe",
  description: "my portfolio website",
  openGraph: {
    title: "Frank Joe | Software Developer",
    description:
      "Software developer building modern web experiences with Next.js, TypeScript, and Tailwind CSS.",
    url: "https://fjoe.vercel.app",
    siteName: "Frank Joe",
    images: [
      {
        url: "https://fjoe.vercel.app/pix1.jpg",
        width: 1200,
        height: 630,
        alt: "Frank Joe | Software Developer",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Frank Joe | Software Developer",
    description:
      "Software developer building modern web experiences with Next.js, TypeScript, and Tailwind CSS.",
    images: ["https://fjoe.vercel.app/pix1.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <AuthProvider>{children}</AuthProvider>
        </ThemeProvider>
      </body>
      <Analytics />
      <SpeedInsights />
    </html>
  );
}