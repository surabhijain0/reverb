import { NavBar } from '@/components';
import React from 'react';

export default function RootLayout(
  { children }: { children: React.ReactNode }
) {
  return (
    <html>
      <body>
        <NavBar />
        <br />{children}
      </body>
    </html>
  );
}
