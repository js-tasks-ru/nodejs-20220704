const { KoaPassport } = require('koa-passport');
const passport = new KoaPassport();

const localStrategy = require('./strategies/local');
const githubStrategy = require('./strategies/github');
// const facebookStrategy = require('./strategies/facebook');

passport.use(localStrategy);
passport.use(githubStrategy);
// passport.use(githubStrategy);
// passport.use(facebookStrategy);

module.exports = passport;
