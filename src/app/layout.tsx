import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Toaster } from "sonner";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "ColIG — AI-Powered Instagram Growth Assistant",
  description:
    "Generate viral Instagram content in seconds. AI-powered hooks, captions, carousel ideas, and hashtags for creators.",
  keywords: [
    "Instagram",
    "AI",
    "content creator",
    "viral hooks",
    "caption generator",
    "hashtag generator",
    "social media",
    "growth",
  ],
  openGraph: {
    title: "ColIG — AI-Powered Instagram Growth Assistant",
    description: "Create content that actually gets attention.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider>
          {children}
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                background: "#18181b",
                border: "1px solid rgba(139, 92, 246, 0.2)",
                color: "#fafafa",
              },
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
