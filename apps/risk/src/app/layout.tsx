import './globals.css';

import { AuthProvider } from '@dlocal/auth';

export const metadata = {
  title: 'Risk MFE',
  description: 'Risk micro-frontend.'
};

export default function RiskLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <div className="mfe-shell">{children}</div>
        </AuthProvider>
      </body>
    </html>
  );
}
