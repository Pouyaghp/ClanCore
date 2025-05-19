const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Ensure .cjs files are processed correctly
config.resolver.sourceExts = config.resolver.sourceExts || [];
if (!config.resolver.sourceExts.includes('cjs')) {
  config.resolver.sourceExts.push('cjs');
}

// Disable package exports resolution to prevent conflicts
config.resolver.unstable_enablePackageExports = false;

module.exports = config;
