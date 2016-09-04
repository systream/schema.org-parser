// Karma configuration
// Generated on Thu Jun 16 2016 16:08:42 GMT+0200 (CEST)

module.exports = function(config) {
    config.set({
        basePath: '',
        frameworks: ['jasmine'],
        files: [
            'dist/*.js',
            'tests/*.test.js'
        ],
        exclude: [
        ],

        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {

        },

        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['progress', 'coverage'],

        coverageReporter: {
            type: 'text'
        },

        // web server port
        port: 9878,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['Chrome'],
        singleRun: false,
        concurrency: 2
    })
};