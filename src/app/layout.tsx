import type { Metadata } from 'next';
import { Nunito, Geist_Mono } from 'next/font/google';
import './globals.css';
// import { MainLayout } from '@/components/layout/main-layout'; // MainLayout removed from here
import { Toaster } from "@/components/ui/toaster";
import { siteConfig } from '@/config/site';
// import { AuthProvider } from '@/contexts/auth-context'; // Placeholder for AuthProvider

const nunito = Nunito({
  subsets: ['latin'],
  variable: '--font-nunito',
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${nunito.variable} ${geistMono.variable} font-sans antialiased`}>
        {/* <AuthProvider> */} {/* AuthProvider would wrap children if implemented */}
          {children}
        {/* </AuthProvider> */}
        <Toaster />
      </body>
    </html>
  );
}
