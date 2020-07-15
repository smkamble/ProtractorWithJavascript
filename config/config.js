
exports.config = {
    directConnect: true,

    // Framework to use. Jasmine is recommended.
    framework: 'jasmine2',
    allScriptsTimeout: 40000,

    specs: ['./specs/*.js'],

    //To use async await 
    SELENIUM_PROMISE_MANAGER: false,

    // Capabilities to be passed to the webdriver instance.
    capabilities: {
        'shardTestFiles': true,
        'maxInstances': 1,
    },


    // verboseMultiSessions: true, 
    // Options to be passed to Jasmine.
    jasmineNodeOpts: {
        onComplete: null,
        includeStackTrace: true,    // If true, include stack traces in failures.
        isVerbose: true,            // If true, display spec names.
        showColors: true,           // Use colors in the command line report.  
        defaultTimeoutInterval: 240000   // Default time to wait in ms before a test fails.
    },

    onPrepare: () => {
        let globals = require('protractor');
        let browser = globals.browser;
        browser.manage().window().maximize();
    },

    beforeAll: function () {

    },

    afterAll: function () {
        // Clearing browser data after each test
        browser.manage().deleteAllCookies();
        browser.executeScript('window.sessionStorage.clear(); window.localStorage.clear();')
    },
    afterLaunch: function () {
    }
};