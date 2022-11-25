module.exports = {
      staticFileGlobs: [
        'css/*.css',
        '*.html',
        '/images/**.*',
        '/img/**.*',
        '/js/*.js'
      ],
      stripPrefix: 'app/',
      runtimeCaching: [{
        urlPattern: /this\\.is\\.a\\.regex/,
        handler: 'networkFirst'
      }]
    };