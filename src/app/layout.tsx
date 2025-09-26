// app/layout.tsx
import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Supermask Battle',
  description: 'Vote, share, and hype the Billions Network Supermask Mint!',
  icons: {
    icon: '/billions-logo.png', // ✅ path to logo in public folder
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
