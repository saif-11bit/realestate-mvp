import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import { BarChart3, GitCompare, Home } from "lucide-react";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CitySense - The Future of City Intelligence",
  description: "Compare and analyze Indian cities for real estate investment with AI-powered insights",
};

function Navigation() {
  return (
    <nav className="sticky top-0 z-50 bg-[#0a0a0a]/95 backdrop-blur-md border-b border-[#d4a574]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#d4a574] to-[#b8956a] flex items-center justify-center shadow-lg shadow-[#d4a574]/20">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-[#0a0a0a]">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="text-xl font-bold text-gold-gradient">CitySense</span>
          </Link>
          <div className="flex items-center gap-1">
            <Link
              href="/"
              className="flex items-center gap-2 px-4 py-2 text-gray-400 hover:text-[#d4a574] hover:bg-white/5 rounded-lg transition-all duration-300"
            >
              <Home className="w-4 h-4" />
              <span className="hidden sm:inline font-medium">Home</span>
            </Link>
            <Link
              href="/dashboard"
              className="flex items-center gap-2 px-4 py-2 text-gray-400 hover:text-[#d4a574] hover:bg-white/5 rounded-lg transition-all duration-300"
            >
              <BarChart3 className="w-4 h-4" />
              <span className="hidden sm:inline font-medium">Rankings</span>
            </Link>
            <Link
              href="/compare"
              className="flex items-center gap-2 px-4 py-2 text-gray-400 hover:text-[#d4a574] hover:bg-white/5 rounded-lg transition-all duration-300"
            >
              <GitCompare className="w-4 h-4" />
              <span className="hidden sm:inline font-medium">Compare</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" style={{ colorScheme: 'dark' }}>
      <body className={`${inter.variable} font-sans antialiased bg-[#0a0a0a] text-white`}>
        <Navigation />
        <main className="min-h-[calc(100vh-4rem)]">{children}</main>
        <footer className="border-t border-[#d4a574]/20 bg-[#0a0a0a] py-8 mt-12">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <p className="text-gold-gradient font-semibold mb-2">CitySense</p>
            <p className="text-gray-500 text-sm">
              The Future of City Intelligence - Data sourced from NITI Aayog, 99acres, PIB, AICTE
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
