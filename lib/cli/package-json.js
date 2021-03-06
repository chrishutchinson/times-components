module.exports = variables => ({
  name: `@times-components/${variables.packageName}`,
  version: variables.version || "0.0.1",
  description: variables.packageDescription,
  main: `dist/${variables.packageName}`,
  dev: `src/${variables.packageName}`,
  scripts: {
    fmt: "eslint . --fix && prettier --write '**/*.*'",
    "prettier:diff": "prettier --list-different '**/*.*'",
    lint: "eslint . && yarn prettier:diff && depcheck && jest-lint",
    "test:android": "jest --config='./__tests__/android/jest.config.js'",
    "test:ios": "jest --config='./__tests__/ios/jest.config.js'",
    "test:web": "jest --config='./__tests__/web/jest.config.js'",
    "test:all":
      "yarn test:android --coverage && yarn test:ios --coverage && yarn test:web --coverage",
    prepublishOnly: "yarn transpile && yarn bundle",
    "cleanup-dist": "rm -rf dist",
    transpile: "yarn cleanup-dist && babel src -d dist",
    bundle: "NODE_ENV=production webpack -p"
  },
  repository: {
    type: "git",
    url: "git+https://github.com/newsuk/times-components.git"
  },
  keywords: [
    "react-native-web",
    "react",
    "native",
    "web",
    variables.packageName,
    "component"
  ],
  license: "BSD-3-Clause",
  bugs: {
    url: "https://github.com/newsuk/times-components/issues"
  },
  homepage: "https://github.com/newsuk/times-components#readme",
  devDependencies: {
    "@thetimes/jest-lint": "*",
    "@times-components/eslint-config-thetimes": "*",
    "@times-components/jest-configurator": "*",
    "@times-components/storybook": "*",
    "@times-components/webpack-configurator": "*",
    "babel-cli": "6.26.0",
    eslint: "4.9.0",
    jest: "23.3.0",
    prettier: "1.8.2",
    react: "16.4.1",
    "react-dom": "16.3.1",
    "react-native": "0.55.4",
    "react-test-renderer": "16.3.1",
    webpack: "4.6.0",
    "webpack-cli": "2.1.4"
  },
  dependencies: {
    "prop-types": "15.6.0"
  },
  peerDependencies: {
    react: ">=16.2",
    "react-dom": ">=16.2",
    "react-native": ">=0.54",
    "react-native-web": ">=0.3"
  },
  publishConfig: {
    access: "public"
  }
});
