import { SectionHeading } from '@dlocal/ui';

export default function RemoteEntry() {
  return (
    <div>
      <SectionHeading
        title="Merchant Portal"
        subtitle="Onboarding, KYC verification, and account readiness."
      />
      <ul>
        <li>Pending KYC reviews</li>
        <li>Document verification SLA</li>
        <li>Live merchant status</li>
      </ul>
    </div>
  );
}
