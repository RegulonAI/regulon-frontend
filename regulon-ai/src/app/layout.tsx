import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppHeader } from "@/components/layout/AppHeader";
import { AppFooter } from "@/components/layout/AppFooter";
import { RouteTransition } from "@/components/layout/RouteTransition";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Regulon AI - Compliance Inteligente",
  description: "Transformando regulamentações em ações empresariais.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${inter.variable} h-full`}>
      <body className="flex min-h-full flex-col bg-zinc-50 font-sans text-zinc-900 antialiased">
        <AppHeader />
        <main className="flex-1">
          <RouteTransition>{children}</RouteTransition>
        </main>
        <AppFooter />
      </body>
    </html>
  );
}
