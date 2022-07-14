module.exports = {
  mongodb: {
    uri: (process.env.NODE_ENV === 'test')
      ? 'mongodb://localhost/07-test'
      : 'mongodb://localhost/07',
  },
  crypto: {
    iterations: (process.env.NODE_ENV === 'test' ? 1 : 12000),
    length: 128,
    digest: 'sha512',
  },
  providers: {
    github: {
      app_id: process.env.GITHUB_APP_ID || 'GITHUB_APP_ID',
      app_secret: process.env.GITHUB_APP_SECRET || 'GITHUB_APP_SECRET',
      callback_uri: process.env.GITHUB_CALLBACK_URI || 'http://localhost:3000/oauth/github',
      options: {
        scope: ['user:email'],
      },
    },
    facebook: {
      app_id: process.env.FACEBOOK_APP_ID || 'FACEBOOK_APP_ID',
      app_secret: process.env.FACEBOOK_APP_SECRET || 'FACEBOOK_APP_SECRET',
      callback_uri: process.env.FACEBOOK_CALLBACK_URI || 'http://localhost:3000/oauth/facebook',
      options: {
        scope: ['email'],
      },
    },
    vkontakte: {
      app_id: process.env.VKONTAKTE_APP_ID || 'VKONTAKTE_APP_ID',
      app_secret: process.env.VKONTAKTE_APP_SECRET || 'VKONTAKTE_APP_SECRET',
      callback_uri: process.env.VKONTAKTE_CALLBACK_URI || 'http://localhost:3000/oauth/vkontakte',
      options: {
        scope: ['email'],
      },
      test: {
        login: process.env.VKONTAKTE_USER_TEST,
        password: process.env.VKONTAKTE_PASSWORD_TEST,
      }
    },
  },
  
};
