import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Zera Agency",
  description: "Influencer marketing for home improvement brands.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
