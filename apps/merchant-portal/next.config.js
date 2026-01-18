const { withNx } = require('@nx/next');
const { NextFederationPlugin } = require('@module-federation/nextjs-mf');

const nextConfig = {
  nx: {
    svgr: false
  },
  webpack(config, options) {
    // Only apply Module Federation on the client side for remotes/MFEs
    // Server-side would cause React hook errors due to multiple React instances
    if (!options.isServer) {
      config.plugins.push(
        new NextFederationPlugin({
          name: 'merchantPortal',
          filename: 'static/chunks/remoteEntry.js',
          exposes: {
            './RemoteEntry': './src/components/RemoteEntry'
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
