import './globals.css';

import { AuthProvider } from '@dlocal/auth';
import { ShellHeader } from './ShellHeader';

export const metadata = {
  title: 'dLocal Operations Console',
  description: 'Unified workspace for payments, risk, merchant portal, and reporting.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <div className="shell">
            <ShellHeader />
            <main className="shell__content">{children}</main>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
