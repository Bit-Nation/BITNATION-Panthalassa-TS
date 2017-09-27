module.exports = function (config) {
    config.set({
      basePath: '',
      frameworks: ['mocha', 'chai'],
      files: [
        'test/**/*.ts'
      ],
      reporters: ['progress'],
      colors: true,
      logLevel: config.LOG_INFO,
      autoWatch: true,
      singleRun: true,
      concurrency: Infinity
    })
  }