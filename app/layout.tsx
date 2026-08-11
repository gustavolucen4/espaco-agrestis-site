import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://espaco-agrestis.pages.dev"),
  title: "Espaço Agrestis | Comunidade católica em Caruaru",
  description:
    "Atividades, recolhimentos, cinedebates e clube do livro do Espaço Agrestis em Caruaru.",
  openGraph: {
    title: "Espaço Agrestis",
    description:
      "Agenda e memória das atividades da comunidade católica Espaço Agrestis em Caruaru.",
    images: ["/og.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Espaço Agrestis",
    description:
      "Recolhimentos, cinedebates, leituras e encontros de formação em Caruaru.",
    images: ["/og.png"],
  },
  icons: {
    icon: "/logo-agrestis.jpg",
    shortcut: "/logo-agrestis.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
