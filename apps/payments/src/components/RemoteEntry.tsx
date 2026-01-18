import { SectionHeading } from '@dlocal/ui';

export default function RemoteEntry() {
  return (
    <div>
      <SectionHeading
        title="Payments"
        subtitle="Realtime routing, settlement status, and SLA coverage."
      />
      <ul>
        <li>Latency alerts and retries</li>
        <li>Instant payout schedules</li>
        <li>Regional success benchmarks</li>
      </ul>
    </div>
  );
}
