'use client';

import { Card, SectionHeading } from '@dlocal/ui';
import { useAuth } from '@dlocal/auth';

export default function RiskPage() {
  const { user } = useAuth();

  return (
    <div className="mfe-stack">
      <SectionHeading
        title="Risk Control Center"
        subtitle="Investigate alerts, monitor fraud signals, and tune decision rules."
      />
      <Card>
        <p>
          Analyst on duty: <strong>{user?.name ?? 'Guest'}</strong> ({user?.role ?? 'n/a'}).
        </p>
      </Card>
    </div>
  );
}
