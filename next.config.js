const withFonts = require("next-fonts");
const withPWA = require("next-pwa");

const nextConfig = withFonts({
  enableSvg: true,
  webpack(config, options) {
    return config;
  },
});
const pwa = withPWA({
  pwa: {
    dest: "public",
    register: true,
    skipWaiting: true,
  },
});

module.exports = {
  ...nextConfig,
  ...pwa,
};
