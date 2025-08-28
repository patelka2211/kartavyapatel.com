import type { Metadata } from "next";
import { Gelasio } from "next/font/google";
import FloatingMenu from "@/components/floating-menu";
import Footer from "@/components/footer";
import ScrollToTop from "@/components/scroll-to-top";
import SharerUtilities from "@/components/sharer-utilities";
import { ThemeProvider } from "@/components/theme-provider";
import { cn, getOgImage, rootPath } from "@/lib/utils";
import "./globals.css";

const gelasio = Gelasio({
  variable: "--font-gelasio",
  subsets: ["latin"],
});

const title = "kartavyapatel.com";
const description = `Kartavya Patel's personal website.`;

export const metadata: Metadata = {
  metadataBase: new URL(rootPath),
  title: {
    template: "%s - kartavyapatel.com",
    default: title,
  },
  description,
  keywords: [],
  openGraph: {
    title,
    description,
    images: getOgImage("default.jpg"),
  },
  twitter: {
    card: "summary_large_image",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <SharerUtilities />
      <body className={`${gelasio.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ScrollToTop />
          <main className={cn("flex flex-col items-center")}>
            <div className={cn("w-dvw sm:w-[40rem]")}>
              <div className="relative mb-4">
                <div className={cn("p-2", "min-h-dvh")}>{children}</div>
                <FloatingMenu />
              </div>
              <Footer />
            </div>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
