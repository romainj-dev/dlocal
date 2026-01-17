'use client';

import { Card, SectionHeading } from '@dlocal/ui';
import { useAuth } from '@dlocal/auth';

export default function PaymentsPage() {
  const { user } = useAuth();

  return (
    <div className="mfe-stack">
      <SectionHeading
        title="Payments Workspace"
        subtitle="Monitor transaction routing, payout health, and settlement queues."
      />
      <Card>
        <p>
          Signed in as <strong>{user?.name ?? 'Guest'}</strong> ({user?.role ?? 'n/a'}).
        </p>
      </Card>
    </div>
  );
}
