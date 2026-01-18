import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Card } from '@dlocal/ui';

/**
 * Dynamic import wrapper that only loads on client side.
 * Module Federation remotes are only available in the browser.
 */
function createRemoteComponent(remoteName: string, moduleName: string) {
  // Return a component that lazy loads on the client
  return lazy(() => {
    // Dynamic import using template literal to prevent webpack static analysis
    return import(/* webpackIgnore: true */ `${remoteName}/${moduleName}`);
  });
}

// Create remote components - these will only be loaded on the client
const PaymentsRemote = createRemoteComponent('payments', 'RemoteEntry');
const RiskRemote = createRemoteComponent('risk', 'RemoteEntry');
const MerchantPortalRemote = createRemoteComponent('merchantPortal', 'RemoteEntry');
const ReportingRemote = createRemoteComponent('reporting', 'RemoteEntry');

export function MfeWorkspace() {
  // Track if we're on the client side
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Don't render remote components during SSR
  if (!isClient) {
    return (
      <section className="mfe-grid">
        <Card className="mfe-card"><MfeSkeleton title="Payments" /></Card>
        <Card className="mfe-card"><MfeSkeleton title="Risk" /></Card>
        <Card className="mfe-card"><MfeSkeleton title="Merchant Portal" /></Card>
        <Card className="mfe-card"><MfeSkeleton title="Reporting" /></Card>
      </section>
    );
  }

  return (
    <section className="mfe-grid">
      <Card className="mfe-card">
        <MfeErrorBoundary title="Payments">
          <Suspense fallback={<MfeSkeleton title="Payments" />}>
            <PaymentsRemote />
          </Suspense>
        </MfeErrorBoundary>
      </Card>
      <Card className="mfe-card">
        <MfeErrorBoundary title="Risk">
          <Suspense fallback={<MfeSkeleton title="Risk" />}>
            <RiskRemote />
          </Suspense>
        </MfeErrorBoundary>
      </Card>
      <Card className="mfe-card">
        <MfeErrorBoundary title="Merchant Portal">
          <Suspense fallback={<MfeSkeleton title="Merchant Portal" />}>
            <MerchantPortalRemote />
          </Suspense>
        </MfeErrorBoundary>
      </Card>
      <Card className="mfe-card">
        <MfeErrorBoundary title="Reporting">
          <Suspense fallback={<MfeSkeleton title="Reporting" />}>
            <ReportingRemote />
          </Suspense>
        </MfeErrorBoundary>
      </Card>
    </section>
  );
}

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
