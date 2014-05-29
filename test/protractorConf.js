exports.config = {
  seleniumServerJar: null,
  seleniumPort: null,
  chromeDriver: null,
  chromeOnly: false,

  allScriptsTimeout: 11000,

  specs: [
    'unit/*Test.js',
    'integration/*Test.js',
  ],

  suites: {
    unit: 'unit/*Test.js',
    integration: 'integration/*Test.js',
    full: './**/*Test.js'
  },

  capabilities: {
    'browserName': 'firefox',
    'cssSelectorsEnabled': true,
    'handlesAlerts': true,
    'nativeEvents': true,
    'javascriptEnabled': true,
    'databaseEnabled': false
  },

  baseUrl: 'http://localhost:' + (process.env.HTTP_PORT || '8000'),

  // A callback function called once protractor is ready and available, and
  // before the specs are executed
  // You can specify a file containing code to run by setting onPrepare to
  // the filename string.
  onPrepare: function() {
    // At this point, global 'protractor' object will be set up, and jasmine
    // will be available. For example, you can add a Jasmine reporter with:
    //     jasmine.getEnv().addReporter(new jasmine.JUnitXmlReporter(
    //         'outputdir/', true, true));
  },

  framework: 'mocha',

  mochaOpts: {
    ui: 'bdd',
    reporter: 'spec'
  },

  onCleanUp: function() {}
};
