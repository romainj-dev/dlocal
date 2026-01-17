import './globals.css';

import { AuthProvider } from '@dlocal/auth';
import { Button } from '@dlocal/ui';

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
            <header className="shell__header">
              <div>
                <p className="shell__eyebrow">dLocal</p>
                <h1>Operations Console</h1>
              </div>
              <div className="shell__actions">
                <Button variant="ghost">Support</Button>
                <Button>Sign out</Button>
              </div>
            </header>
            <main className="shell__content">{children}</main>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
