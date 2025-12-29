import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import { Building2, BarChart3, GitCompare } from "lucide-react";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Real Estate City Classifier",
  description: "Compare and analyze Indian cities for real estate investment",
};

function Navigation() {
  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Building2 className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-semibold text-gray-900">CityScore</span>
          </Link>
          <div className="flex items-center gap-1">
            <Link
              href="/dashboard"
              className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <BarChart3 className="w-4 h-4" />
              <span className="hidden sm:inline font-medium">Rankings</span>
            </Link>
            <Link
              href="/compare"
              className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-colors"
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
    <html lang="en" className="light" style={{ colorScheme: 'light' }}>
      <body className={`${inter.variable} font-sans antialiased bg-gray-50`}>
        <Navigation />
        <main className="min-h-[calc(100vh-4rem)]">{children}</main>
        <footer className="border-t border-gray-100 bg-white py-6 mt-12">
          <div className="max-w-7xl mx-auto px-4 text-center text-gray-500 text-sm">
            <p>Real Estate City Classifier - Data sourced from NITI Aayog, 99acres, PIB, AICTE</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
