const { Strategy } = require('passport-github');
const config = require('../../config');

module.exports = new Strategy(
  {
    clientID: 'Iv1.e082b079e7f21a03',
    clientSecret: '55192130e8770028c38fa50ab68068ba5888d8ee',
    callbackURL: 'http://localhost:3000/oauth/github',
  },
  (accessToken, refreshToken, profile, done) => {
    console.log(accessToken, refreshToken, profile);
    
    done(null, null, 'Стратегия github еще не настроена');
  }
);
