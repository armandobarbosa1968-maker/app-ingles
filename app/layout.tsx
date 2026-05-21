import type { Metadata, Viewport } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  weight: ["400", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Inglês a Brincar",
  description:
    "Aplicação divertida para crianças do 1.º ciclo aprenderem inglês.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#4ea7ff",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-PT" className={nunito.variable}>
      <body className="min-h-screen bg-gradient-to-b from-ceu-50 via-white to-sol-100 font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
