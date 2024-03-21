module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' } }],
    '@babel/preset-typescript',
  ],
  plugins: [
    ['module-resolver', {
      alias: {
        "@entities": "./src/api/entities",
        "@repositories": "./src/api/repositories",
        "@providers": "./src/api/providers",
        "@controllers": "./src/api/controllers",
        "@config": "./src/api/config",
        "@services": "./src/api/services",
        "@utils": "./src/api/utils",
      }
    }],
    'babel-plugin-transform-typescript-metadata',
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    ['@babel/plugin-proposal-class-properties', { loose: true }],
  ],
};
