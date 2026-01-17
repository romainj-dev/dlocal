'use client';

import { Card, SectionHeading } from '@dlocal/ui';
import { useAuth } from '@dlocal/auth';

export default function ReportingPage() {
  const { user } = useAuth();

  return (
    <div className="mfe-stack">
      <SectionHeading
        title="Reporting Suite"
        subtitle="Track revenue, reconciliation status, and compliance snapshots."
      />
      <Card>
        <p>
          Reporting lead: <strong>{user?.name ?? 'Guest'}</strong> ({user?.role ?? 'n/a'}).
        </p>
      </Card>
    </div>
  );
}
