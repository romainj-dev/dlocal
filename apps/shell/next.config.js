const { withNx } = require('@nx/next');
const { NextFederationPlugin } = require('@module-federation/nextjs-mf');
const path = require('path');

const paymentsRemoteUrl =
  process.env.NEXT_PUBLIC_PAYMENTS_REMOTE_URL ?? 'http://localhost:4201';
const riskRemoteUrl = process.env.NEXT_PUBLIC_RISK_REMOTE_URL ?? 'http://localhost:4202';
const merchantPortalRemoteUrl =
  process.env.NEXT_PUBLIC_MERCHANT_PORTAL_REMOTE_URL ?? 'http://localhost:4203';
const reportingRemoteUrl =
  process.env.NEXT_PUBLIC_REPORTING_REMOTE_URL ?? 'http://localhost:4204';

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
    if (options.isServer) {
      // On the server, use resolve.alias to point remote modules to a stub
      // They won't be rendered anyway due to ssr: false in next/dynamic
      const remoteModules = [
        'payments/RemoteEntry',
        'risk/RemoteEntry',
        'merchantPortal/RemoteEntry',
        'reporting/RemoteEntry'
      ];
      
      config.resolve = config.resolve || {};
      config.resolve.alias = config.resolve.alias || {};
      
      // Point all remote module imports to a stub that returns null
      const stubPath = path.resolve(__dirname, 'src/remote-stub.js');
      remoteModules.forEach((mod) => {
        config.resolve.alias[mod] = stubPath;
      });
    } else {
      // Only apply Module Federation on the client side
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
