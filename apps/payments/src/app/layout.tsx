import './globals.css';

import { AuthProvider } from '@dlocal/auth';

export const metadata = {
  title: 'Payments MFE',
  description: 'Payments micro-frontend.'
};

export default function PaymentsLayout({ children }: { children: React.ReactNode }) {
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
