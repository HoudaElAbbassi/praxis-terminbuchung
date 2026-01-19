import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import ChatWidget from "@/components/Chatbot/ChatWidget";

const inter = Inter({
  subsets: ["latin"],
  variable: '--font-inter',
  display: 'swap',
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["700"],
  variable: '--font-playfair',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Praxis für Gefäßmedizin Remscheid",
  description: "Moderne Gefäßmedizin mit Erfahrung, Präzision und Einfühlungsvermögen. Online Terminbuchung für Gefäßuntersuchungen und Behandlungen.",
  icons: {
    icon: '/images/logoklein.jpeg',
    apple: '/images/logoklein.jpeg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body className={`${inter.variable} ${playfairDisplay.variable} font-sans`}>
        <Providers>{children}</Providers>
        <ChatWidget />
      </body>
    </html>
  );
}
