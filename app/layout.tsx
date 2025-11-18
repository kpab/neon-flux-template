import type { Metadata } from "next";
import "./globals.css";
import "../styles/neon.css";
import "../styles/glitch.css";
import "../styles/animations.css";

export const metadata: Metadata = {
  title: "Neon Flux - Cyberpunk Next.js Template",
  description: "A stunning cyberpunk-themed Next.js template with 3D animations, neon effects, and interactive elements",
  keywords: ["nextjs", "cyberpunk", "neon", "3d", "animation", "template"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
