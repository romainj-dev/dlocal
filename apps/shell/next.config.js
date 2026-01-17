const { withNx } = require('@nx/next');

const nextConfig = {
  nx: {
    svgr: false
  },
  experimental: {
    turbo: {}
  }
};

module.exports = withNx(nextConfig);
