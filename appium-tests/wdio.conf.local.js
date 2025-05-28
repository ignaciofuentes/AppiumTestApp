exports.config = {
  runner: 'local',
  port: 4723,
  specs: ['./test/specs/**/*.js'],
  exclude: [],
  capabilities: [
    {
      platformName: 'iOS',
      'appium:automationName': 'XCUITest',
    },
  ],

  logLevel: 'info',
  bail: 0,
  waitforTimeout: 10000,
  connectionRetryTimeout: 120000,
  //
  // Default request retries count
  connectionRetryCount: 3,
  framework: 'mocha',
  reporters: ['spec'],
  mochaOpts: {
    ui: 'bdd',
    timeout: 60000,
  },
};
//'/Users/ignf/Desktop/AppiumTestApp/ios/build/Build/Products/Debug-iphonesimulator/AppiumTestApp.app'
