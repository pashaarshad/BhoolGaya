import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AuthProvider } from "@/lib/contexts/AuthContext";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "BhoolGaya? | If a task exists anywhere, it exists here",
  description: "A personal task management system that never forgets for you. Built for students and learners who juggle multiple sources of tasks.",
  keywords: ["task management", "productivity", "reminders", "student", "BhoolGaya"],
  authors: [{ name: "BhoolGaya Team" }],
  openGraph: {
    title: "BhoolGaya? - Never Forget What Matters",
    description: "A personal task management system that never forgets for you.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dark">
      <body className={inter.className}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
