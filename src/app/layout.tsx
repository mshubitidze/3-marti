import { tbcX } from "@/config/font";
import "@/styles/globals.css";

import { TRPCReactProvider } from "@/trpc/react";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/mode-toggle";
import { CircleDotDashed } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "3 მარტი",
  description: "შექმენი მისალოცი ბარათი",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
  metadataBase: new URL("https://3-marti.vercel.app"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`font-sans ${tbcX.className} min-h-[100dvh] antialiased`}
      >
        <TRPCReactProvider>
          <ThemeProvider attribute="class" defaultTheme="system">
            <header className="top-0 z-40 w-full border-b">
              <div className="container flex h-16 items-center justify-between">
                <Link href="/" className="flex items-center text-xl font-bold">
                  <CircleDotDashed className="mr-2" /> ლოგო
                </Link>
                <ModeToggle />
              </div>
            </header>
            {children}
            <footer className="bottom-0 z-40 w-full border-t text-xs">
              <div className="container flex h-16 items-center">
                <p>© 2024 კომპანია. ყველა უფლება დაცულია.</p>
              </div>
            </footer>
          </ThemeProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
