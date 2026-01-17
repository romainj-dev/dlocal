'use client';

import { Card, SectionHeading } from '@dlocal/ui';
import { useAuth } from '@dlocal/auth';

export default function MerchantPortalPage() {
  const { user } = useAuth();

  return (
    <div className="mfe-stack">
      <SectionHeading
        title="Merchant Portal"
        subtitle="Coordinate onboarding, KYC reviews, and account lifecycle management."
      />
      <Card>
        <p>
          Account manager: <strong>{user?.name ?? 'Guest'}</strong> ({user?.role ?? 'n/a'}).
        </p>
      </Card>
    </div>
  );
}
