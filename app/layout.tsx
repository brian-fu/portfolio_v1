import type { Metadata } from "next";
import { Karla, Newsreader } from "next/font/google";
import "./globals.css";
import Analytics from "./components/Analytics";
import Chat from "./components/Chat";
import Nav from "./components/Nav";

const karla = Karla({ subsets: ["latin"], weight: ["300", "400", "500", "600"], variable: "--font-karla" });
const newsreader = Newsreader({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-newsreader" });

// Runs before paint so the saved / OS theme is applied without a flash.
const themeScript = `(function () {
  try {
    var saved = localStorage.getItem('theme');
    var dark = saved ? saved === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (dark) document.documentElement.classList.add('dark');
  } catch (e) {}
})();`;

export const metadata: Metadata = {
  title: { default: "brian fu", template: "%s - brian fu" },
  description: "brian fu — cs at the university of waterloo, software engineer intern at shopify.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // Server-only, so the key is read here rather than in the client bundle.
  const posthogKey = process.env.POSTHOG_KEY;

  return (
    <html lang="en" className={`${karla.variable} ${newsreader.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <div className="hm">
          <svg className="grain" aria-hidden="true">
            <filter id="grain">
              <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="2" stitchTiles="stitch" />
              <feColorMatrix type="saturate" values="0" />
            </filter>
            <rect width="100%" height="100%" filter="url(#grain)" />
          </svg>
          <Nav />
          {children}
          <Chat />
          {posthogKey && <Analytics apiKey={posthogKey} />}
        </div>
      </body>
    </html>
  );
}
