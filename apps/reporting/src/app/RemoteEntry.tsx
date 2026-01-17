'use client';

import { SectionHeading } from '@dlocal/ui';

export default function RemoteEntry() {
  return (
    <div>
      <SectionHeading
        title="Reporting"
        subtitle="Revenue insights, reconciliation, and compliance snapshots."
      />
      <ul>
        <li>Month-to-date revenue</li>
        <li>Reconciliation variance</li>
        <li>Regulatory export status</li>
      </ul>
    </div>
  );
}
