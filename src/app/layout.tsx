// app/layout.tsx
import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Billions Supermask Battle ⚔️',
  description: 'Vote for your favorite mask, share, and hype the Billions Network Supermask Mint!',
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
