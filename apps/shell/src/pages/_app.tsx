import type { AppProps } from 'next/app';

import { AuthProvider } from '@dlocal/auth';

import { ShellHeader } from '../components/ShellHeader';
import '../styles/globals.css';

export default function ShellApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <div className="shell">
        <ShellHeader />
        <main className="shell__content">
          <Component {...pageProps} />
        </main>
      </div>
    </AuthProvider>
  );
}
