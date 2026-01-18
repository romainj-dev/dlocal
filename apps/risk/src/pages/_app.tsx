import type { AppProps } from 'next/app';

import { AuthProvider } from '@dlocal/auth';

import '../styles/globals.css';

export default function RiskApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <div className="mfe-shell">
        <Component {...pageProps} />
      </div>
    </AuthProvider>
  );
}
