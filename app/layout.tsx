import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Wrapper from "./components/Wrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pretty Nails | Nagelstudio in Zwolle, Nederland",
  description:
    "Pretty Nails is een professionele nagelstudio in Zwolle. Gespecialiseerd in gelnagels, nail art en manicure. Boek vandaag nog je afspraak!",
  keywords: [
    "nagelstudio Zwolle",
    "Pretty Nails Zwolle",
    "gelnagels",
    "nail art Zwolle",
    "manicure Zwolle",
    "nagelverzorging Nederland",
  ],
  authors: [{ name: "Pretty Nails" }],
  openGraph: {
    title: "Pretty Nails | Jouw nagelstudio in Zwolle",
    description:
      "Professionele nagelstudio in Zwolle. Gelnagels, nail art en meer bij Pretty Nails. Ervaar topkwaliteit en service.",
    siteName: "Pretty Nails",
    locale: "nl_NL",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#ECE2D0] text-[#3D211A]`}
      >
        <Wrapper>{children}</Wrapper>
      </body>
    </html>
  );
}
