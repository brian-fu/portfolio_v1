import type { Metadata } from "next";
import "./globals.css";
import StarfieldBackground from "./components/utils/StarfieldBackground";
import ScrollProgressBar from "./components/utils/ScrollProgressBar";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Single-page portfolio skeleton",
};

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <ScrollProgressBar />
        <StarfieldBackground />
        <div className="page-content">{children}</div>
      </body>
    </html>
  );
}
