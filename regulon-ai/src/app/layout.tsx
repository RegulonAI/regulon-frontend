import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

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
    <html lang="pt-br" className="h-full bg-white">
      <body className={`${inter.className} h-full antialiased text-zinc-900`}>
        {children}
      </body>
    </html>
  );
}
