import React from 'react';
import { Card } from '@dlocal/ui';
import dynamic from 'next/dynamic';

function MfeSkeleton({ title }: { title: string }) {
  return (
    <div className="mfe-skeleton">
      <div className="mfe-skeleton__title">{title}</div>
      <div className="mfe-skeleton__line" />
      <div className="mfe-skeleton__line" />
      <div className="mfe-skeleton__line mfe-skeleton__line--short" />
    </div>
  );
}

/**
 * Remote components loaded via Module Federation.
 * Using next/dynamic with ssr:false ensures they only load on the client
 * where the federation runtime is available.
 */
const PaymentsRemote = dynamic(() => import('payments/RemoteEntry'), {
  ssr: false,
  loading: () => <MfeSkeleton title="Payments" />,
});
const RiskRemote = dynamic(() => import('risk/RemoteEntry'), {
  ssr: false,
  loading: () => <MfeSkeleton title="Risk" />,
});
const MerchantPortalRemote = dynamic(() => import('merchantPortal/RemoteEntry'), {
  ssr: false,
  loading: () => <MfeSkeleton title="Merchant Portal" />,
});
const ReportingRemote = dynamic(() => import('reporting/RemoteEntry'), {
  ssr: false,
  loading: () => <MfeSkeleton title="Reporting" />,
});

export function MfeWorkspace() {
  return (
    <section className="mfe-grid">
      <Card className="mfe-card">
        <MfeErrorBoundary title="Payments">
          <PaymentsRemote />
        </MfeErrorBoundary>
      </Card>
      <Card className="mfe-card">
        <MfeErrorBoundary title="Risk">
          <RiskRemote />
        </MfeErrorBoundary>
      </Card>
      <Card className="mfe-card">
        <MfeErrorBoundary title="Merchant Portal">
          <MerchantPortalRemote />
        </MfeErrorBoundary>
      </Card>
      <Card className="mfe-card">
        <MfeErrorBoundary title="Reporting">
          <ReportingRemote />
        </MfeErrorBoundary>
      </Card>
    </section>
  );
}

class MfeErrorBoundary extends React.Component<
  { title: string; children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { title: string; children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  override render() {
    if (this.state.hasError) {
      return (
        <div className="mfe-error">
          <div className="mfe-skeleton__title">{this.props.title}</div>
          <p>Module offline. Showing cached shell layout.</p>
        </div>
      );
    }

    return this.props.children;
  }
}
