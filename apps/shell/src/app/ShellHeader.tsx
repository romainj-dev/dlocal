'use client';

import { useAuth } from '@dlocal/auth';
import { Button } from '@dlocal/ui';

export function ShellHeader() {
  const { user, signOut } = useAuth();

  return (
    <header className="shell__header">
      <div>
        <p className="shell__eyebrow">dLocal</p>
        <h1>Operations Console</h1>
        <p className="shell__subtitle">
          {user ? `Signed in as ${user.name}` : 'Sign in to access your workspaces'}
        </p>
      </div>
      <div className="shell__actions">
        <Button variant="ghost">Support</Button>
        <Button onClick={signOut}>Sign out</Button>
      </div>
    </header>
  );
}
