module.exports = function(config) {
    var karmaConfig = {
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
        customLaunchers: {
            Chrome_travis_ci: {
                base: 'Chrome',
                flags: ['--no-sandbox']
            }
        },
        singleRun: false,
        concurrency: 2
    };

    if(process.env.TRAVIS){
        karmaConfig.browsers = ['Chrome_travis_ci'];
    }

    config.set(karmaConfig);
};