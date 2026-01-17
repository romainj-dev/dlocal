import { Card, SectionHeading } from '@dlocal/ui';

const modules = [
  {
    name: 'Payments',
    description: 'Route transactions, settle payouts, and monitor latency across regions.'
  },
  {
    name: 'Risk',
    description: 'Review fraud signals, alerts, and model performance across markets.'
  },
  {
    name: 'Merchant Portal',
    description: 'Manage onboarding workflows, KYC status, and account configurations.'
  },
  {
    name: 'Reporting',
    description: 'Track revenue, reconciliation, and compliance reporting dashboards.'
  }
];

export default function HomePage() {
  return (
    <div className="shell__grid">
      <SectionHeading
        title="Welcome back"
        subtitle="Select a workspace below to jump into your micro-frontend suite."
      />
      <div className="shell__cards">
        {modules.map((module) => (
          <Card key={module.name}>
            <h3>{module.name}</h3>
            <p>{module.description}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
