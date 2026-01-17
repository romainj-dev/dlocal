const { withNx } = require('@nx/next');
const { NextFederationPlugin } = require('@module-federation/nextjs-mf');

const nextConfig = {
  nx: {
    svgr: false
  },
  experimental: {
    turbo: {}
  },
  webpack(config, options) {
    if (!options.isServer) {
      config.plugins.push(
        new NextFederationPlugin({
          name: 'risk',
          filename: 'static/chunks/remoteEntry.js',
          exposes: {
            './RemoteEntry': './src/app/RemoteEntry'
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
