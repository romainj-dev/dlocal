import { SectionHeading } from '@dlocal/ui';

export default function RemoteEntry() {
  return (
    <div>
      <SectionHeading
        title="Risk"
        subtitle="Fraud signals, alerts, and decision coverage in one place."
      />
      <ul>
        <li>High-risk corridor monitoring</li>
        <li>Chargeback dispute queue</li>
        <li>Model drift checkpoints</li>
      </ul>
    </div>
  );
}
