import './globals.css';

import { AuthProvider } from '@dlocal/auth';

export const metadata = {
  title: 'Reporting MFE',
  description: 'Reporting micro-frontend.'
};

export default function ReportingLayout({ children }: { children: React.ReactNode }) {
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
