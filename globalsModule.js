﻿
var minimist = require('minimist');

var fs = require("fs-extra");

function createDir(path) {
    fs.mkdirsSync(path, function (err) {
        if (err) {
            console.error(err);
        }
    });
}

var globals = {
    
    // this will overwrite the default polling interval (currently 500ms) for waitFor commands
    // and expect assertions that use retry
    waitForConditionPollInterval : 300,
    
    // default timeout value in milliseconds for waitFor commands and implicit waitFor value for
    // expect assertions
    waitForConditionTimeout: 10000,

    // default timeout value in milliseconds for global beforeEach and afterEach methods.
    asyncHookTimeout: 90000,
    
    
    'default' : {
        myGlobal : function () {
            return 'I\'m a method';
        }
    },
    
    'test_env' : {
        myGlobal: 'test_global',
        beforeEach : function () {

        }
    },
    
    
    beforeEach : function (browser, cb) {
        console.log("In globals beforeEach");
        cb();
    },
    
    
    afterEach: function (browser, cb) {

        var slashIndex = (browser.currentTest.module.lastIndexOf("\/") > browser.currentTest.module.lastIndexOf("\\")) ? browser.currentTest.module.lastIndexOf("\/") : browser.currentTest.module.lastIndexOf("\\");
        var folderName = browser.currentTest.module.substring(0, slashIndex) + "/seleniumAndBrowserLogs";
        var seleniumAndBrowserLogPath = "TestResults" + "\/" + folderName;
        createDir(seleniumAndBrowserLogPath);

        var executingTestCaseName = browser.currentTest.module.substring(slashIndex, browser.currentTest.module.length);
        
        var seleniumLogPath = executingTestCaseName + "-selenium-driver.log";
        var browserLogPath = executingTestCaseName + "-browser.log";
        
        var log4js = require("log4js");
        log4js.configure({
            appenders: [
                { type: 'file', filename: seleniumLogPath, category: 'seleniumLogger', absolute: true, "layout": { "type": "messagePassThrough" } },
                { type: 'file', filename: browserLogPath, category: 'browserLogger', absolute: true, "layout": { "type": "messagePassThrough" } }
            ]
        });
        
        // Only write logs if there was a error / failure / skipped. 
        if ((browser.currentTest.results.errors > 0) || (browser.currentTest.results.failed > 0) || (browser.currentTest.results.skipped > 0)) {
            var seleniumLogger = log4js.getLogger("seleniumLogger");
            browser.getLog('driver', function(logEntriesArray) {
                console.log("LogEntriesArray: " + logEntriesArray);
                logEntriesArray.forEach(function(log) {
                    seleniumLogger.info(new Date(log.timestamp).toISOString() + '[' + log.level + '] ' + ' : ' + log.message);
                });
            });

            var browserLogger = log4js.getLogger("browserLogger");
            browser.getLog('browser', function(logEntriesArray) {
                console.log("LogEntriesArray: " + logEntriesArray);
                logEntriesArray.forEach(function(log) {
                    browserLogger.info(new Date(log.timestamp).toISOString() + '[' + log.level + '] ' + ' : ' + log.message);
                });
            });
        }

        browser.end();
        console.log("In globals afterEach");
        cb();
    }
};

module.exports = globals;