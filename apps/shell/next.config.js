const { withNx } = require('@nx/next');
const { NextFederationPlugin } = require('@module-federation/nextjs-mf');

const paymentsRemoteUrl =
  process.env.NEXT_PUBLIC_PAYMENTS_REMOTE_URL ?? 'http://localhost:3002';
const riskRemoteUrl = process.env.NEXT_PUBLIC_RISK_REMOTE_URL ?? 'http://localhost:3003';
const merchantPortalRemoteUrl =
  process.env.NEXT_PUBLIC_MERCHANT_PORTAL_REMOTE_URL ?? 'http://localhost:3004';
const reportingRemoteUrl =
  process.env.NEXT_PUBLIC_REPORTING_REMOTE_URL ?? 'http://localhost:3005';

const nextConfig = {
  nx: {
    svgr: false
  },
  env: {
    NEXT_PUBLIC_PAYMENTS_REMOTE_URL: paymentsRemoteUrl,
    NEXT_PUBLIC_RISK_REMOTE_URL: riskRemoteUrl,
    NEXT_PUBLIC_MERCHANT_PORTAL_REMOTE_URL: merchantPortalRemoteUrl,
    NEXT_PUBLIC_REPORTING_REMOTE_URL: reportingRemoteUrl
  },
  webpack(config, options) {
    // Only apply Module Federation on the client side
    // Server-side rendering of remote components requires additional setup
    if (!options.isServer) {
      config.plugins.push(
        new NextFederationPlugin({
          name: 'shell',
          filename: 'static/chunks/remoteEntry.js',
          remotes: {
            payments: `payments@${paymentsRemoteUrl}/_next/static/chunks/remoteEntry.js`,
            risk: `risk@${riskRemoteUrl}/_next/static/chunks/remoteEntry.js`,
            merchantPortal: `merchantPortal@${merchantPortalRemoteUrl}/_next/static/chunks/remoteEntry.js`,
            reporting: `reporting@${reportingRemoteUrl}/_next/static/chunks/remoteEntry.js`
          },
          shared: {
            react: { singleton: true, requiredVersion: false },
            'react-dom': { singleton: true, requiredVersion: false },
            next: { singleton: true, requiredVersion: false }
          }
        })
      );
    }

    return config;
  }
};

module.exports = withNx(nextConfig);
