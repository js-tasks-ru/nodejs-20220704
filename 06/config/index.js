const path = require('path');
require('dotenv').config({ path: path.join(__dirname, 'secret.env') });

module.exports = {
  mongodb: {
    uri: process.env.DB_HOST || 'mongodb://localhost:27017/auth',
  },
  jwt: process.env.JWT || 'secret',
  crypto: {
    iterations: (process.env.NODE_ENV === 'test' ? 1 : 12000),
    length: 128,
    digest: 'sha512',
  },
  providers: {
    github: {
      app_id: process.env.GITHUB_APP_ID || 'GITHUB_APP_ID',
      app_secret: process.env.GITHUB_APP_SECRET || 'GITHUB_APP_SECRET',
      callback_uri: 'http://localhost:3000/oauth/github',
      options: {
        scope: ['user:email'],
      },
    },
    facebook: {
      app_id: process.env.FACEBOOK_APP_ID || 'facebook_app_id',
      app_secret: process.env.FACEBOOK_APP_SECRET || 'facebook_app_secret',
      callback_uri: 'http://localhost:3000/oauth/facebook',
      options: {
        scope: ['email'],
      },
    },
    vkontakte: {
      app_id: process.env.VKONTAKTE_APP_ID || 'VKONTAKTE_APP_ID',
      app_secret: process.env.VKONTAKTE_APP_SECRET || 'VKONTAKTE_APP_SECRET',
      callback_uri: 'http://localhost:3000/oauth/vkontakte',
      options: {
        scope: ['email'],
      },
    },
  },
};
